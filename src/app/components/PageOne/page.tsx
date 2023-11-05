import FileDropzone from "../Dropzone/page";


export default function PageOne({ handleFileSelected, file, currentPage }) {
  return (
    <div className="w-full h-[180px] rounded-lg">
      <div className=" w-full h-full border-x-3 border-y-3 rounded-lg justify-between flex flex-col hover:opacity-60">
        <FileDropzone
          onFileSelected={handleFileSelected}
          selectedFile={file}
          currentPage={currentPage}
        />
      </div>
    </div>
  );  
}
