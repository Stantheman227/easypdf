"use client";
import React from "react";
import { useProceed } from "@/hooks/useProceed";

interface ConfirmScreenProps {
  totalPrice: number;
  extractedText?: string;
  closeConfirmScreen: () => void;
  selectedContent: string;
}

export default function ConfirmScreen({
  totalPrice,
  extractedText, // Destructure extractedTextProps to get extractedText
  closeConfirmScreen,
  selectedContent,
}: ConfirmScreenProps) {
  const {
    handleProceed,
    isLoading: isProceedLoading,
    errorMessage,
  } = useProceed();

  const roundedTotalPrice = totalPrice.toFixed(4);

  // Update the function to expect a string directly.
  // This function now correctly handles extractedText as a string.
  const handleProceedAndClose = async (text: string) => {
    const success = await handleProceed(text, selectedContent);
    if (success) {
      closeConfirmScreen();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-md flex flex-col items-center space-y-5 ml-10 mr-10 lg:ml-0 lg:mr-0">
        <p>
          Der Preis für die Zusammenfassung beträgt {roundedTotalPrice}€.
          Möchten Sie fortfahren?
        </p>

        {isProceedLoading ? (
          <div>
            <div className="loader bg-easy-blue"></div>
          </div>
        ) : (
          <div className="mt-4 flex justify-center space-x-6">
            <button
              // Ensure extractedText is a string, even if it means defaulting to an empty string.
              onClick={() =>
                extractedText && handleProceedAndClose(extractedText)
              }
              className="bg-easy-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Ja
            </button>
            <button
              onClick={closeConfirmScreen}
              className="bg-easy-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Nein
            </button>
          </div>
        )}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
}
