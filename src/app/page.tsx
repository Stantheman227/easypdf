"use client";
import Navbar from "./components/navbar/page";
import PageOne from "./components/PageOne/page"; // import PageOne
import PageTwo from "./components/PageTwo/page"; // import PageTwo
import PageThree from "./components/PageThree/page"; // import PageThree
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFileSelected = (file) => {
    setFile(file);
    // Handle the selected file here
    console.log("Selected file:", file);
  };

  const deletePDF = () => {
    setFile(null);
    setCurrentPage(1);
  };


  return (
    <main className="flex flex-col h-screen w-full">
      <div className="flex-shrink-0">
        <Navbar />
      </div>
      <div className="flex h-full justify-between space-x-1">
        <PageOne handleFileSelected={handleFileSelected} file={file} currentPage={currentPage} />
        <PageTwo file={file} deletePDF={deletePDF}/>
        <PageThree/>
      </div>
    </main>
  );
}