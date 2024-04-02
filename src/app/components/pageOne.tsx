import FileDropzone from "@/components/dropZone";

interface PageOneProps {
  handleFileSelected: (file: File | null) => void;
  file: File | null;
  currentPage: number;
}

export default function PageOne({
  handleFileSelected,
  file,
  currentPage,
}: PageOneProps) {
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
