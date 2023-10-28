import { useState } from 'react';

type responseType = {
  extractedText: string;
  totalPrice: number;
};

export function useFileUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showConfirmScreen, setShowConfirmScreen] = useState(false);


  const handleUpload = async (selectedFile: File | null) => {
    if (!selectedFile) return;
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("pdf", selectedFile);

      const response = await fetch("http://localhost:3001/api/extract", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Server responded with an error");
      }

      const data: responseType = await response.json(); 

      setExtractedText(data.extractedText);
      setTotalPrice(data.totalPrice);
      setShowConfirmScreen(true);

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    } 
  };

  return { handleUpload, isLoading, extractedText, totalPrice, showConfirmScreen, setShowConfirmScreen};
}
