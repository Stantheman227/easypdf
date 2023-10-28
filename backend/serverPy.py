from flask import Flask, request, jsonify
from flask_cors import cross_origin
from flask_cors import CORS

from werkzeug.utils import secure_filename
import PyPDF2
import os
import openai
import tiktoken
import logging
import requests
from dotenv import load_dotenv

load_dotenv()


logging.basicConfig(level=logging.DEBUG)
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = '../uploads/'
CORS(app, origins="http://localhost:3000")

MAX_TOKENS = 4097  # Die maximale Anzahl der Tokens, die an GPT-3.5 gesendet werden können

def num_tokens_from_string(string: str, encoding_name: str) -> int:
    """Returns the number of tokens in a text string."""
    encoding = tiktoken.get_encoding(encoding_name)
    total_tokens = len(encoding.encode(string))
    print("Total Tokens: ", total_tokens)

    return total_tokens


def chunk_text(text, max_tokens):
    # Teile den Text in Chunks von max_token Größe
    chunks = []
    tokens = text.split()  # einfaches Tokenisieren durch Leerzeichen
    current_chunk = []
    current_length = 0

    for token in tokens:
        if current_length + len(token) <= max_tokens:
            current_length += len(token) + 1  # +1 für das Leerzeichen
            current_chunk.append(token)
        else:
            chunks.append(' '.join(current_chunk))
            current_chunk = [token]
            current_length = len(token)

    chunks.append(' '.join(current_chunk))  # Füge den letzten Chunk hinzu
    return chunks


@app.route('/api/create-paypal-transaction', methods=['POST'])
@cross_origin(origin='localhost', port=3000)
def create_paypal_transaction():
    total_price = request.json['totalPrice']
    access_token = os.getenv('PAYPAL_API_KEY')
    url = "https://api.sandbox.paypal.com/v2/checkout/orders"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}",
        'PayPal-Request-Id': paypal_request_id,

    }
    body = {
        "intent": "CAPTURE",
        "purchase_units": [{
        "amount": {
            "currency_code": "EUR",
            "value": str(total_price)
        }
    }]
    }

    logging.debug(f'Request URL: {url}')
    logging.debug(f'Headers: {headers}')
    logging.debug(f'Body: {body}')

    response = requests.post(url, headers=headers, json=body)

    logging.debug(f'Response Status Code: {response.status_code}')
    logging.debug(f'Response Text: {response.text}')
    if response.status_code == 201:
        order_id = response.json()['id']
        return jsonify(orderId=order_id), 200
    else: return jsonify(error=response.text), response.status_code
    

@app.route('/api/finalize-paypal-transaction', methods=['POST'])
@cross_origin(origin='localhost', port=3000)
def finalize_paypal_transaction():
    # Logik zum Finalisieren einer PayPal-Transaktion
    pass


@app.route('/api/extract', methods=['POST'])
@cross_origin(origin='localhost', port=3000)
# Hier nur Text extrahieren und Preis berechnen, JSON-Antwort zurücksenden
def extract_text():
    
    
    total_tokens = 0
    total_price = 0
    if 'pdf' not in request.files:
        return jsonify(message="No file received"), 400

    file = request.files['pdf']
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    try:
        with open(filepath, 'rb') as pdf_file:
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            print(len(pdf_reader.pages))
            extracted_text = ""
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                extracted_text += page.extract_text()

        total_tokens += num_tokens_from_string(extracted_text, "cl100k_base")
        total_price += total_tokens/1000 * 0.002
        print("Total Price: ", total_price)

    except Exception as e:
        return jsonify(message="Error extracting text", error=str(e)), 500
    
    finally:
        if os.path.exists(filepath):
            os.remove(filepath)
    # Ähnliche Logik wie bisher, um Text zu extrahieren und Token/Preis zu berechnen
    return jsonify(extractedText=extracted_text, totalTokens=total_tokens, totalPrice=total_price), 200

@app.route('/api/summarize', methods=['POST'])
@cross_origin(origin='localhost', port=3000)

def summarize_text():
    extracted_text = request.json['extractedText']
    content = request.json.get('content', '') 
    
    openai.api_key = os.getenv('OPENAI_API_KEY')
    chunks = chunk_text(extracted_text, MAX_TOKENS - 200)  # -200, um Raum für zusätzliche Tokens für den Prompt zu lassen
    summaries = []

    for chunk in chunks:
            
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "user", "content": f"{content}\n\n{chunk}\n\n"}
                ]
            )
            summary = response['choices'][0]['message']['content']
            summaries.append(summary)

    final_summary = ' '.join(summaries)
    
    return jsonify(summary=final_summary), 200

    


if __name__ == '__main__':
    app.debug = True
    port = int(os.environ.get('PORT', 3001))
    app.run(port=port)
