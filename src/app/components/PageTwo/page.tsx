import React from "react";
import { useFileUpload } from "@/app/hooks/useFileUpload";
import ConfirmScreen from "../ConfirmScreen/page";
import { PlayIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function PageTwo({ deletePDF, file }) {
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
  };

  function zusammenfassen() {
    setSelectedContent("Fasse den Text verständlich zusammen und erstelle sinvolle Abästze für die Zusammenfassung. Die Zusammenfassung soll maximal 250 Wörter lang sein.");
    handleUpload(file)
  };

  function vereinfachen() {
    setSelectedContent("Vereinfache den Text, sodass jemand ohne Vorkenntnisse ihn verstehen kann und erstelle ein kleines Inhaltsverzeichnis am Anfang.");
    handleUpload(file);
  };

  function übersetzten() {
    setSelectedContent("Übersetze den Text ins deutsche.");
    handleUpload(file);
  };

  function eigenerBefehl() {
    setSelectedContent(inputValue);
    handleUpload(file);
  };

  return (
    <div className="w-full lg:w-1/5 h-full flex flex-col rounded-b-lg justify-between items-center p-1">
      <div className="space-y-5 rounded-lg w-full flex flex-col items-center p-4 h-full bg-gray-200 ">

        <button onClick={() => file && zusammenfassen()}>
          <div className="h-[85px] w-[300px] rounded-lg bg-easy-blue text-white flex flex-row">
            <div className="p-2">
              <p>PDF Zusammenfassen</p>
              <p className="text-xs">
                Erstellt eine Zusammenfassung des gesamten extrahierten Textes.
              </p>
            </div>
            <div className="h-full flex items-center bg-white rounded-lg">
              <PlayIcon className="w-14 h-14 text-easy-blue" />
            </div>
          </div>
        </button>

        <button onClick={() => file && übersetzten()}>
          <div className="h-[85px] w-[300px] rounded-lg bg-easy-blue text-white flex flex-row">
            <div className="p-2">
              <p>PDF Übersetzen</p>
              <p className="text-xs">
                Übersetze den extrahierten Text ins Deutsche.
              </p>
            </div>
            <div className="h-full flex items-center bg-white rounded-lg">
              <PlayIcon className="w-14 h-14 text-easy-blue" />
            </div>
          </div>
        </button>

        <button onClick={() => file && vereinfachen()}>
          <div className="h-[85px] w-[300px] rounded-lg bg-easy-blue text-white flex flex-row">
            <div className="p-2">
              <p>PDF Vereinfachen</p>
              <p className="text-xs">
                Erstellt ein Inhaltsverzeichnis und vereinfacht den extrahierten Text.
              </p>
            </div>
            <div className="h-full flex items-center bg-white rounded-lg">
              <PlayIcon className="w-14 h-14 text-easy-blue" />
            </div>
          </div>
        </button>

      <button>
        <div className="h-[85px] w-[300px] rounded-lg bg-easy-blue text-white flex flex-row">
          <div className="p-2">
            <p>PDF Übersetzten</p>
            <p className="text-xs">
              Erstellt eine übesetzte Version des extrahierten Textes in eine
              gewünschte Sprache.
            </p>
          </div>
          <div className="h-full flex items-center bg-white rounded-lg">
            <PlayIcon className="w-14 h-14 text-easy-blue" />
          </div>
        </div>
        </button>

        <div>
        <div className="h-[85px] w-[300px] rounded-lg">
          <textarea
            placeholder="bitte gebe eigenen Befehl ein..."
            className="h-full w-full rounded-lg resize-none focus:outline-none p-1 border border-black"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          ></textarea>
        </div>

        <div className="h-[42px] w-[300px] bg-easy-blue rounded-lg text-white mt-2">
          <button className="h-full w-full flex flex-row justify-between p-2 items-center space-x-5" onClick={() => file && eigenerBefehl()}>
            <p className="">Weiter mit eigenem Befehl</p>
            <PlayIcon className="w-8 h-8"/>
          </button>
        </div>
      </div>

        <div className="flex flex-row space-x-5 mb-10 items-center">
          <div className=" flex justify-center items-center border border-lg rounded-lg bg-easy-blue hover:opacity-80 active:opacity-100 text-center h-12 w-36">
            <button onClick={deletePDF}>
              <p className="items-center justify-center flex text-white">
                PDF Löschen <span className="text-3xl"></span>
              </p>
            </button>
          </div>

          <div className="">
            <div className="justify-center items-center flex h-12 w-36 bg-easy-blue hover:opacity-80 active:opacity-100 rounded-lg">
              <button
                disabled={isUploadLoading}
                onClick={() => file && handleUpload(file)}
              >
                <p className="flex items-center justify-center text-white">
                  Simplify PDF <span className="text-3xl">→</span>
                </p>
              </button>
            </div>

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
      </div>
    </div>
  );
}
