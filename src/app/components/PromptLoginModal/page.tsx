import React from "react";
import Link from "next/link";

const PromptLoginModal = () => {

    return (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"
        >
          <div
            className="bg-white w-1/3 h-auto rounded-lg p-8 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold mb-4">Willkommen!</h2>
            <p>Bitte erstellen Sie ein Konto, um unseren Service nutzen zu können.</p>
            <div className="flex justify-between items-center mt-4">
              <Link href="/">
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"              >
                Zur Hauptseite
              </button>
              </Link>
            </div>
          </div>
        </div>
      );
    };

export default PromptLoginModal;
