import { useProceed } from "@/app/hooks/useProceed";

type ConfirmScreenProps = {
  totalPrice: number;
  extractedText: string | null;
  closeConfirmScreen: () => void;
  selectedContent: string;
};

export default function ConfirmScreen({
  totalPrice,
  extractedText,
  closeConfirmScreen,
  selectedContent,
}: ConfirmScreenProps) {
  const {
    handleProceed,
    isLoading: isProceedLoading,
    errorMessage,
  } = useProceed();

  const roundedTotalPrice = totalPrice.toFixed(4);

  const handleProceedAndClose = async (text: string) => {
    const success = await handleProceed(text, selectedContent); // Änderung hier
    if (success) {
      // Überprüfung hinzugefügt
      closeConfirmScreen();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-md flex flex-col items-center space-y-5 ml-10 mr-10 lg:ml-0 lg:mr-0">
        <p>
          Der Preis für die Zusammenfassung beträgt {roundedTotalPrice}€.
          Möchten Sie fortfahren?
        </p>

        {isProceedLoading ? (
          <div>
            <div className="loader bg-easy-blue"></div>
          </div>
        ) : (
          <div className="mt-4 flex justify-center space-x-6">
            <button
              onClick={() => {
                if (extractedText) {
                  handleProceedAndClose(extractedText);
                }
              }}
              className="bg-easy-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Ja
            </button>

            <button
              onClick={() => closeConfirmScreen()}
              className="bg-easy-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Nein
            </button>
          </div>
        )}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
}
