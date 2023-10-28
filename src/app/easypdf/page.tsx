"use client";
import Navbar from "../components/Navbar/page";
import PageOne from "../components/PageOne/page"; // import PageOne
import PageTwo from "../components/PageTwo/page"; // import PageTwo
import PageThree from "../components/PageThree/page"; // import PageThree
import PromptLoginModal from "../components/PromptLoginModal/page";
import supabase from "../supabaseClient/page";
import { useState, useEffect } from "react";


export default function easypdf() {
  const [file, setFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Zustandsvariable für den Anmeldestatus


  useEffect(() => {
    // Define an async function
    const fetchUserSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (data.session) {
          setIsLoggedIn(true);
          console.log("Session data:", data);
        } else {
          setIsLoggedIn(false);
          console.log("No active session");
        }

        if (error) {
          setIsLoggedIn(false);
          console.error("Error fetching session:", error);
        }
      } catch (err) {
        setIsLoggedIn(false);
        console.error("An error occurred:", err);
      }
    };

    fetchUserSession();
  }, []);

  useEffect(() => {
    // Handle auth state changes
    supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state Mount: " + event, session);
      if (event === "SIGNED_IN") {
        setIsLoggedIn(true);
        console.log("User AuthStateChange to SignedIn:", session);
      } else if (event === "SIGNED_OUT") {
        setIsLoggedIn(false);
        console.log("User AuthStateChange to SignedOut");
      }
    });
  }, []);

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
      <main className="flex flex-col h-full lg:h-screen w-screen lg:w-full">
        {!isLoggedIn && <PromptLoginModal />}
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
      </main>  );
}
