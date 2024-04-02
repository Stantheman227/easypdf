import { useState } from "react";
import supabase from "@/Services/supaBaseClinet";
import canUpload from "./useCanUpload";
type SummaryResponseType = {
  summary: string;
};

export function useProceed() {
  const [isLoading, setIsLoading] = useState(false);
  const [summaryState, setSummaryState] = useState<String | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleProceed = async (extractedText: string, content: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    // Holen Sie den aktuellen Benutzer aus der Supabase-Sitzung
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      console.error("Kein Benutzer angemeldet.");
      setErrorMessage(
        "Sie müssen angemeldet sein, um diese Funktion nutzen zu können."
      );
      setIsLoading(false);
      return false;
    }

    // Überprüfen, ob der Benutzer PDFs hochladen darf
    const allowed = await canUpload(user.id);
    if (!allowed) {
      console.error("Sie dürfen heute keine weiteren PDFs mehr hochladen.");
      setErrorMessage(
        "Sie haben das Limit von drei kostenlosen PDFs erreicht."
      );
      setIsLoading(false);
      return false;
    }

    try {
      const summarizeResponse = await fetch(
        "https://easypdfserver-4bf2d2c1026c.herokuapp.com/api/summarize",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ extractedText, content }),
        }
      );

      if (!summarizeResponse.ok) {
        throw new Error("Server responded with an error");
      }

      const { summary }: SummaryResponseType = await summarizeResponse.json();
      setSummaryState(summary);
      console.log("Summary:", summary);

      // Fire the custom event after updating the state
      document.dispatchEvent(
        new CustomEvent("updateSummary", { detail: summary })
      );
      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleProceed, isLoading, summaryState, errorMessage };
}
