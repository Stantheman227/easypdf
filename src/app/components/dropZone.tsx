import React from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

interface FileDropzoneProps {
  onFileSelected: (file: File | null) => void;
  selectedFile: File | null;
  currentPage: number;
}

function FileDropzone({
  onFileSelected,
  selectedFile,
  currentPage,
}: FileDropzoneProps) {
  // Handler für Dateiauswahl
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileSelected(files[0]);
    } else {
      onFileSelected(null);
    }
  };

  return (
    <div className="w-full h-full">
      {selectedFile ? (
        <iframe
          src={`${URL.createObjectURL(
            selectedFile
          )}#page=${currentPage}&view=FitH&toolbar=0&navpanes=0`}
          width="100%"
          height="100%"
        ></iframe>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center rounded-lg bg-easy-blue-200 p-4">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ display: "none" }} // Verstecke das Standard-File-Input
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center justify-center">
              <p className="text-center text-2xl font-bold">PDF hochladen</p>
              <ArrowUpTrayIcon className="w-12 h-12" />
            </div>
          </label>
        </div>
      )}
    </div>
  );
}

export default FileDropzone;
