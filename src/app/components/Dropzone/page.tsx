import React from "react";
import { useDropzone } from "react-dropzone";
import {ArrowUpTrayIcon} from "@heroicons/react/24/outline"


function FileDropzone({ onFileSelected, selectedFile, currentPage }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelected(acceptedFiles[0]);
      }
    },
  });

  return (
    <div className="w-full h-full">
      {selectedFile ? (
        <>
          <iframe
            src={`${URL.createObjectURL(
              selectedFile
            )}#page=${currentPage}&view=FitH&toolbar=0&navpanes=0`}
            width="100%"
            height="100%"
          ></iframe>
        </>
      ) : (
        <div
          className="w-full h-full flex items-center justify-center rounded-lg bg-easy-blue-200"
          {...getRootProps()}
        >
          <input className="w-full h-full" {...getInputProps()} />
          {isDragActive ? (
            <p className="text-center text-3xl font-bold">PDF</p>
          ) : (
            <div className="">
              <p className="text-center text-2xl font-bold">PDF</p>
              <ArrowUpTrayIcon/>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FileDropzone;
