"use client";
import React, { useState } from "react";
import Navbar from "./components/Navbar/page";

function faqpreis() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    { 
      question: "Ist easyPDF kostenlos?", 
      answer: "Ja, easyPDF ist kostenlos. Sie können bis zu drei Anfragen pro Tag ohne Kosten nutzen. Derzeit bieten wir kein bezahltes Modell an. Wenn Sie Interesse an weiteren Dienstleistungen haben, senden Sie uns bitte eine E-Mail." 
    },
    { 
      question: "Kann ich auch Screenshots (pngs, jpegs usw.) hochladen?", 
      answer: "Nein, derzeit unterstützt easyPDF nur die Textextraktion aus PDF-Dateien. Wenn Sie Text aus einem Screenshot extrahieren möchten, müssen Sie den Screenshot zunächst in ein PDF umwandeln und sicherstellen, dass der Text mit einer Texterkennungssoftware (OCR) bearbeitbar gemacht wird, bevor Sie ihn hochladen." 
    },
    { 
      question: "Meine Anfrage hat eine sehr lange Ladezeit.", 
      answer: "Längere Ladezeiten können durch verschiedene Faktoren beeinflusst werden, einschließlich der Länge des Prompts, der Größe des extrahierten Textes aus der PDF und der Komplexität des Outputs. Umfangreiche Dokumente oder sehr detaillierte Prompts können die Bearbeitungszeit erhöhen. Wenn Sie feststellen, dass die Ladezeit besonders lang ist, könnten Sie versuchen, Ihre Anfrage zu teilen oder den Text vor der Verarbeitung zu kürzen. Überprüfen Sie auch Ihre Internetverbindung oder versuchen Sie es später noch einmal, wenn die Ladezeit ungewöhnlich lang erscheint." 
    },
    { 
      question: "Werden meine Daten gespeichert?", 
      answer: "Wir speichern den von Ihnen verarbeiteten Text in der Cloud, damit Sie jederzeit darauf zugreifen können. Die ursprüngliche PDF-Datei oder deren Inhalt wird jedoch nicht gespeichert." 
    },
    { 
      question: "Wie sicher ist easyPDF bei der Verarbeitung meiner Dokumente?", 
      answer: "Sicherheit ist für uns von größter Bedeutung. Wir verwenden moderne Verschlüsselungstechniken, um die Übertragung Ihrer Dokumente zu schützen. Während der Verarbeitung wird Ihr Text sicher in der Cloud gespeichert und nur für Ihren persönlichen Zugriff bereitgestellt. Bitte beachten Sie, dass wir die ursprünglichen PDF-Dateien nicht speichern und keine Inhalte an Dritte weitergeben." 
    },
    ];
  

  return (
    <main className="flex flex-col h-full w-full ">
      <div className="flex w-full">
        <Navbar />
      </div>

      <div className="w-full h-[30vh] absolute top-0 bg-easy-blue flex items-center justify-center">
        <div className="w-full flex items-center justify-center flex-col mt-16 md:mt-0">
          <p className="text-white text-center text-3xl font-bold">
            Mach mehr aus deinen PDFs - mit nur einem Klick.
          </p>
          <p className="text-white text-center">
            Dein PDF-Assistent - für effizienteres Lesen und Lernen.
          </p>
        </div>
      </div>

      <div className="flex flex-col space-y-5 md:flex-row md:space-x-5 md:space-y-0 items-center justify-center mt-40 z-10">
        {/* Grid Item 1 */}

        <div className="flex flex-col space-y-5 2xl:flex-row 2xl:space-x-5 2xl:space-y-0">
          <div className="bg-white border border-gray-200 w-full max-w-[400px] h-[400px] flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out hover:scale-105">
            <div className="flex flex-col justify-center items-center p-4">
              <h2 className="text-lg font-bold">Schritt 1</h2>
              <p>PDF auswählen & hochladen.</p>
              <span></span>
            </div>
          </div>

          {/* Grid Item 2 */}
          <div className="bg-white border border-gray-200 w-full max-w-[400px] h-[400px] flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out hover:scale-105">
            <div className="flex flex-col justify-center items-center p-4 space-y-5">
              <h2 className="text-lg font-bold">Schritt 2</h2>
              <p className="text-center ">
                Vereinfachen, Zusammenfassen, Übersetzten oder selbst bestimmen,
                was mit der PDF passieren soll.
              </p>
              <span className="text-center text-xs">
                3 kostenlose API Anfragen am Tag sind aktuell möglich.
              </span>
            </div>
          </div>
        </div>

        {/* Grid Item 3 */}
        <div className="flex flex-col space-y-5 2xl:flex-row 2xl:space-x-5 2xl:space-y-0">
          <div className="bg-white border border-gray-200 w-full max-w-[400px] h-[400px] flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out hover:scale-105">
            <div className="flex flex-col justify-center items-center p-4 space-y-5">
              <h2 className="text-lg font-bold">Schritt 3</h2>
              <p>Abwarten bis die API den Text verarbeitet hat.</p>
              <span className="text-center text-xs">
                Dieser Schritt dauert länger je mehr Text verarbeitet oder
                zurückgegeben werden soll.
              </span>
            </div>
          </div>

          {/* Grid Item 4 */}
          <div className="bg-white border border-gray-200 w-full max-w-[400px] h-[400px] flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out hover:scale-105">
            <div className="flex flex-col justify-center items-center p-4">
              <h2 className="text-lg font-bold">Schritt 4</h2>
              <p>Zusammenfassung usw. genießen :D</p>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-12 flex flex-col justify-center items-center p-5">
      <h2 className="text-3xl font-bold mb-6">
        FAQ
      </h2>
      <div className="w-full max-w-[800px] flex flex-col space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg bg-white" // Hintergrundfarbe weiß
          >
            <button
              className="flex justify-between items-center w-full p-4 text-left"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-semibold">{faq.question}</span>
              <svg
                className={`w-4 h-4 transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`transition-max-height overflow-hidden ${activeIndex === index ? 'max-h-96 p-4' : 'max-h-0'}`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

<div className="w-full">
    <div className="mt-12 h-[300px] bg-easy-blue-200 flex items-center justify-center flex-col space-y-5">
          <h3 className="text-3xl font-thin"> Noch Fragen offen?</h3>
          <p className="text-center text-lg"> Schreibe uns eine Email und wir melden uns so schnellw wie möglich.</p>
          <button className="w-[150px] h-[50px] bg-easy-blue flex items-center justify-center rounded-lg hover:opacity-90 cursor-pointer">
            <p className="text-white">Contact Us</p>
          </button>
    </div>
    </div>
    </main>
  );
}

export default faqpreis;
