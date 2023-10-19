// PageOne/PageOne.js

import FileDropzone from "../Dropzone/page";


export default function PageOne({ handleFileSelected, file, currentPage }) {
  return (
    <div className="w-2/5 h-full p-2">
      <div className="bg-white w-full h-full border border-dashed shadow-lg border-x-3 border-y-3 border-black rounded-lg justify-between flex flex-col">
        <FileDropzone
          onFileSelected={handleFileSelected}
          selectedFile={file}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
