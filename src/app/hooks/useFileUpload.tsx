import { useState } from "react";

type responseType = {
  extractedText: string;
  totalPrice: number;
};

export function useFileUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [showConfirmScreen, setShowConfirmScreen] = useState(false);

  const handleUpload = async (selectedFile: File | null) => {
    if (!selectedFile) return;
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("pdf", selectedFile);

      const response = await fetch(
        "https://easypdfserver-4bf2d2c1026c.herokuapp.com/api/extract",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        // Log the response status and status text for more context on the error
        console.error(
          "Server response error:",
          response.status,
          response.statusText
        );
        // Attempt to read and log the response body for further details if available
        const errorResponseText = await response.text();
        console.error("Error response body:", errorResponseText);
        throw new Error(
          `Server responded with an error: ${response.statusText}`
        );
      }

      const data: responseType = await response.json();

      setExtractedText(data.extractedText);
      setTotalPrice(data.totalPrice);
      setShowConfirmScreen(true);
    } catch (error) {
      console.error("Error during file upload:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleUpload,
    isLoading,
    extractedText,
    totalPrice,
    showConfirmScreen,
    setShowConfirmScreen,
  };
}
