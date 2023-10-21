"use client";
import { Auth0Provider } from "@auth0/auth0-react";

import Navbar from "./components/Navbar/page";
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
    <Auth0Provider
      domain={"dev-072oa8u8x3a84a4k.us.auth0.com"}
      clientId={"Ll3QSOdci9k0IaxvPVJBX27nMyZazBCQ"}
      authorizationParams={{
        redirect_uri:
          typeof window !== "undefined" ? window.location.origin : "",
      }}
    >
      <main className="flex flex-col h-full lg:h-screen w-screen lg:w-full">
        <div className="flex flex-[10vh]">
          <Navbar />
        </div>
        <div className="flex flex-col lg:flex-row lg:flex-[90vh] h-full justify-between space-x-1">
          <PageOne
            handleFileSelected={handleFileSelected}
            file={file}
            currentPage={currentPage}
          />
          <PageTwo file={file} deletePDF={deletePDF} />
          <PageThree />
        </div>
      </main>
    </Auth0Provider>
  );
}
