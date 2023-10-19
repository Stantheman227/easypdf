import { useProceed } from "@/app/hooks/useProceed";

type ConfirmScreenProps = {
  totalPrice: number;
  extractedText: string | null;
  closeConfirmScreen: () => void;
};

export default function ConfirmScreen({
  totalPrice,
  extractedText,
  closeConfirmScreen,
}: ConfirmScreenProps) {
  const { handleProceed, isLoading: isProceedLoading } = useProceed();

  const handleProceedAndClose = async (text: string) => {
    await handleProceed(text);
    closeConfirmScreen();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md flex flex-col items-center space-y-5">
        <p>
          Der Preis für die Zusammenfassung beträgt {totalPrice}€. Möchten Sie
          fortfahren?
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
      </div>
    </div>
  );
}