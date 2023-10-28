import { useState } from 'react';

type SummaryResponseType = {
  summary: string;
};

export function useProceed() {
  const [isLoading, setIsLoading] = useState(false);
  const [summaryState, setSummaryState] = useState<String | null>(null);

  const handleProceed = async (extractedText: string, content:string) => {
    setIsLoading(true);
    try {
      const summarizeResponse = await fetch("http://localhost:3001/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ extractedText, content }),
      });

      if (!summarizeResponse.ok) {
        throw new Error("Server responded with an error");
      }

      const { summary }: SummaryResponseType = await summarizeResponse.json();
      setSummaryState(summary);

      
      // Fire the custom event after updating the state
      document.dispatchEvent(new CustomEvent('updateSummary', { detail: summary }));

      
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleProceed, isLoading, summaryState};
}
