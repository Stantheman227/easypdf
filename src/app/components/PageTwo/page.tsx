import React from "react";
import { useFileUpload } from "@/app/hooks/useFileUpload";
import ConfirmScreen from "../ConfirmScreen/page";

export default function PageTwo({ deletePDF, file }) {
  const {
    handleUpload, isLoading: isUploadLoading, showConfirmScreen, setShowConfirmScreen, totalPrice, extractedText} = useFileUpload();

    function closeConfirmScreen(): void {

      setShowConfirmScreen(false);
    };
    
  const rightSidebarButtons = [
    "PDF Zusammenfassen",
    "PDF Übersetzten",
    "PDF Vereinfachen",
  ];

  return (
    <div className="w-full lg:w-1/5 h-full flex flex-col rounded-b-lg justify-between items-center">
      <div className="space-y-5 rounded-lg flex-col p-4 w-3/4 h-full">
        {rightSidebarButtons.map((label, idx) => (
          <button
            key={idx}
            className="h-12 w-full rounded-lg bg-easy-blue text-white"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-row space-x-5 mb-10 items-center">
        <div className=" flex justify-center items-center border border-lg rounded-lg bg-easy-blue hover:opacity-80 active:opacity-100 text-center h-12 w-36">
          <button onClick={deletePDF}>
            <p className="items-center justify-center flex text-white">
              Delete PDF <span className="text-3xl"></span> 
            </p>
          </button>
        </div>

        <div className="">
          <div className="justify-center items-center flex h-12 w-36 bg-easy-blue hover:opacity-80 active:opacity-100 rounded-lg">

          <button disabled={isUploadLoading} onClick={() => file && handleUpload(file)}>
            <p className="flex items-center justify-center text-white">
              Simplify PDF <span className="text-3xl">→</span>
            </p>
          </button>
          </div>

          {showConfirmScreen && (
            <ConfirmScreen totalPrice={totalPrice} closeConfirmScreen={closeConfirmScreen} extractedText={extractedText}  />
        )}

        </div>
      </div>
    </div>
  );
}
