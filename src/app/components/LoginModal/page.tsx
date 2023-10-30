// LoginModal.js
import React from "react";

const LoginModal = ({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  closeLoginModal,
  setShowLoginModal,
  setShowSignUpModal,
  errorMessage,
  isLoading,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"
      onClick={() => closeLoginModal()}
    >
      <div
        className="bg-white w-1/3 h-auto rounded-lg p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
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
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? <div className="loader"></div> : "Anmelden"}
          </button>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => {
              closeLoginModal();
              setShowSignUpModal(true);
            }}
          >
            Jetzt registrieren
          </button>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => closeLoginModal()}
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

export default LoginModal;
