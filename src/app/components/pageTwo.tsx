"use client";
import React from "react";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useState } from "react";
import {
  AcademicCapIcon,
  ArrowPathRoundedSquareIcon,
  ArrowsPointingInIcon,
  XMarkIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import ConfirmScreen from "./confirmScreen";

interface PageTwoProps {
  deletePDF: () => void;
  file: File | null;
}

export default function PageTwo({ deletePDF, file }: PageTwoProps) {
  const [selectedContent, setSelectedContent] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const {
    handleUpload,
    isLoading: isUploadLoading,
    showConfirmScreen,
    setShowConfirmScreen,
    totalPrice,
    extractedText,
  } = useFileUpload();

  function closeConfirmScreen(): void {
    setShowConfirmScreen(false);
  }

  function zusammenfassen() {
    setSelectedContent(
      "Fasse den Text verständlich zusammen und erstelle sinvolle Abästze für die Zusammenfassung. Die Zusammenfassung soll maximal 250 Wörter lang sein."
    );
    handleUpload(file);
  }

  function vereinfachen() {
    setSelectedContent(
      "Vereinfache den Text, sodass jemand ohne Vorkenntnisse ihn verstehen kann und erstelle ein kleines Inhaltsverzeichnis am Anfang."
    );
    handleUpload(file);
  }

  function übersetzten() {
    setSelectedContent("Übersetze den Text ins deutsche.");
    handleUpload(file);
  }

  function eigenerBefehl() {
    setSelectedContent(inputValue);
    handleUpload(file);
  }

  return (
    <div className="w-full p-5 flex flex-col rounded-lg space-y-4 items-center bg-easy-blue-200">
      <h1 className="font-bold">PDF Menu</h1>

      <button onClick={() => file && zusammenfassen()}>
        <div className="h-[40px] w-[250px] rounded-lg bg-easy-blue text-white flex flex-row justify-between p-2 hover:opacity-80">
          <p>Zusammenfassen</p>
          <ArrowsPointingInIcon />
        </div>
      </button>

      <button onClick={() => file && übersetzten()}>
        <div className="h-[40px] w-[250px] rounded-lg bg-easy-blue text-white flex flex-row justify-between p-2 hover:opacity-80">
          <p>Übersetzen</p>
          <ArrowPathRoundedSquareIcon />
        </div>
      </button>

      <button onClick={() => file && vereinfachen()}>
        <div className="h-[40px] w-[250px] rounded-lg bg-easy-blue text-white flex flex-row justify-between p-2 hover:opacity-80">
          <p>Vereinfachen</p>
          <AcademicCapIcon />
        </div>
      </button>

      <button onClick={deletePDF}>
        <div className="h-[40px] w-[250px] rounded-lg bg-easy-gray text-white flex flex-row justify-between p-2 hover:opacity-80">
          <p className="items-center justify-center flex text-white">
            PDF Löschen <span className="text-3xl"></span>
          </p>
          <XMarkIcon />
        </div>
      </button>

      <div className="">
        <div className="">
          {showConfirmScreen && (
            <ConfirmScreen
              totalPrice={totalPrice}
              closeConfirmScreen={closeConfirmScreen}
              selectedContent={selectedContent}
              extractedText={extractedText}
            />
          )}
        </div>
      </div>

      <div className="flex items-center flex-col">
        <div className="h-[85px] w-[250px] rounded-lg">
          <textarea
            placeholder="Mach aus meiner PDF Datei eine Feengeschichte"
            className="h-full w-full rounded-lg resize-none focus:outline-none p-1 border border-black"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          ></textarea>
        </div>

        <div>
          <button
            className="h-full w-full flex flex-row justify-between p-2 items-center space-x-5"
            onClick={() => file && eigenerBefehl()}
          >
            <div className="h-[40px] w-[250px] rounded-lg bg-easy-blue text-white flex flex-row justify-between p-2 hover:opacity-80">
              <p className="">Weiter mit eigenem Befehl</p>
              <ChatBubbleLeftEllipsisIcon />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
