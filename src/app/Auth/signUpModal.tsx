// SignUpModal.js
import React from "react";

interface SignUpModalProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSignUp: () => void;
  closeSignUpModal: () => void;
  setShowLoginModal: (show: boolean) => void;
  setShowSignUpModal: (show: boolean) => void;
  errorMessage?: string; // Optional
  isLoading: boolean;
}

const SignUpModal = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSignUp,
  closeSignUpModal,
  setShowLoginModal,
  setShowSignUpModal,
  errorMessage,
  isLoading,
}: SignUpModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"
      onClick={() => closeSignUpModal()}
    >
      <div
        className="bg-white w-1/3 h-auto rounded-lg p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-4">Registrierung</h2>
        <div className="mb-4">
          <input
            className="w-full p-2 border rounded focus:border-blue-400 focus:outline-none"
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full p-2 border rounded focus:border-blue-400 focus:outline-none"
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none"
            onClick={handleSignUp}
            disabled={isLoading}
          >
            {isLoading ? <div className="loader"></div> : "Registrieren"}
          </button>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => {
              closeSignUpModal();
              setShowLoginModal(true);
            }}
          >
            Anmelden
          </button>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => closeSignUpModal()}
          >
            Schließen
          </button>
        </div>
        {errorMessage && (
          <div className="text-red-500 mt-2">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default SignUpModal;
