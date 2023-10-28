import React from "react";
import { useDropzone } from "react-dropzone";

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
          className="w-full h-full flex items-center justify-center bg-white"
          {...getRootProps()}
        >
          <input className="w-full h-full" {...getInputProps()} />
          {isDragActive ? (
            <p className="text-center text-3xl font-bold">PDF HIER REIN</p>
          ) : (
            <div>
              <p className="text-center text-3xl font-bold">Hier klicken </p>
              <p className="text-center text-3xl font-bold">oder PDF rüber ziehen</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FileDropzone;
