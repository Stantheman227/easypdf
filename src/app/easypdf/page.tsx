"use client";
import Navbar from "../components/Navbar/page";
import PageOne from "../components/PageOne/page"; // import PageOne
import PageTwo from "../components/PageTwo/page"; // import PageTwo
import PageThree from "../components/PageThree/page"; // import PageThree
import QueryInfo from "../components/QueryInfo/page";
import RecentQueries from "../components/RecentQueries/page";
import PromptLoginModal from "../components/PromptLoginModal/page";
import supabase from "../supabaseClient/page";
import { useState, useEffect } from "react";

export default function easypdf() {
  const [file, setFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Zustandsvariable für den Anmeldestatus

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
    <main className="flex flex-col w-full h-full">
      {!isLoggedIn && <PromptLoginModal />}
      <div className="flex w-full bg-easy-blue">
        <Navbar />
      </div>

      <div className="flex flex-col lg:flex-row bg-easy-blue-200">

        <div className="flex basis-3/4 flex-col lg:flex-row w-full">
          
          <div className="flex h-full">
            <RecentQueries
              queries={[
                "Krankenkassenbescheid",
                "Antrag",
                "Bestätigung",
                "Antrag2",
                "Handyvertrag",
                "Bankkonto",
                "Abbuchungsbestätigung",
                "Krankenkassenbescheid",
                "Antrag",
                "Bestätigung",
                "Antrag2",
                "Handyvertrag",
                "Bankkonto",
                "Abbuchungsbestätigung",
                "Krankenkassenbescheid",
                "Antrag",
                "Bestätigung",
                "Antrag2",
                "Handyvertrag",
                "Bankkonto",
                "Abbuchungsbestätigung",
                "Krankenkassenbescheid",
                "Antrag",
                "Bestätigung",
                "Antrag2",
                "Handyvertrag",
                "Bankkonto",
                "Abbuchungsbestätigung",
                
                
              ]}
            />
          </div>

          <div className="flex w-full h-full">
            <PageThree />
          </div>
          
        </div>

        <div className="flex basis-1/4 flex-col h-full w-full items-center bg-easy-blue-200 p-5">
          <div className="bg-white w-full h-full rounded-lg flex flex-col items-center p-5 space-y-5">
            <PageOne
              handleFileSelected={handleFileSelected}
              file={file}
              currentPage={currentPage}
            />
            <QueryInfo />
            <PageTwo file={file} deletePDF={deletePDF} />
          </div>
        </div>
      </div>
    </main>
  );
}
