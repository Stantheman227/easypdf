// PageThree.js
"use client";
import React, { useEffect, useState } from "react";

export default function PageThree() {
  const [summaryState, setSummaryState] = useState<string>("");

  useEffect(() => {
    // Function to handle the event with specific typing for the event parameter
    const handleSummaryUpdate = (event: CustomEvent<string>) => {
      setSummaryState(event.detail);
    };

    // Add event listener
    document.addEventListener(
      "updateSummary",
      handleSummaryUpdate as EventListener
    );

    // Clean up
    return () => {
      document.removeEventListener(
        "updateSummary",
        handleSummaryUpdate as EventListener
      );
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-full p-5">
      <div className="h-full w-full lg:max-w-[750px] min-h-[650px] bg-white md:min-w-[550px] rounded-lg p-3 max-h-[90vh]">
        {summaryState ? (
          <p className="">{summaryState}</p>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-center font-bold text-gray-400">
              Laden Sie eine PDF hoch und klicken Sie auf Zusammenfassen!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
