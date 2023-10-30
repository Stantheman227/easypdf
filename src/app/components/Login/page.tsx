import React, { useState } from "react";
import supabase from "../../supabaseClient/page";
import LoginModal from "../LoginModal/page";
import SignUpModal from "../SignUpModal/page";

const LoginButton = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);

  const handleSignUp = async () => {
    try {
      setIsLoadingSignUp(true); // Ladezustand aktivieren
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      let authError = null;

      // Benutzer existiert, ist aber "Fake"
      if (
        data &&
        data.user &&
        data.user.identities &&
        data.user.identities.length === 0
      ) {
        authError = {
          name: "AuthApiError",
          message: "User already exists",
        };
      } else if (error) {
        authError = {
          name: error.name,
          message: error.message,
        };
      }

      if (authError) {
        console.error("Fehler bei der Registrierung:", authError);

        // Benutzerfreundliche Fehlermeldung setzen
        let userFriendlyMessage =
          "Ein unbekannter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";

        if (authError.message === "User already exists") {
          userFriendlyMessage = "Diese E-Mail-Adresse ist bereits registriert.";
        } else if (
          authError.message.includes("Signup requires a valid password")
        ) {
          userFriendlyMessage =
            "Die Registrierung erfordert ein gültiges Passwort. Bitte überprüfen Sie Ihre Eingabe.";
        } else if (
          authError.message.includes(
            "Unable to validate email address: invalid format"
          )
        ) {
          userFriendlyMessage =
            "Die E-Mail-Adresse hat ein ungültiges Format. Bitte überprüfen Sie Ihre Eingabe.";
        } else if (
          authError.message.includes("Password should be at least 8 characters")
        ) {
          userFriendlyMessage =
            "Das Passwort muss mindestens 8 Zeichen lang sein.";
        }

        // Weitere benutzerfreundliche Fehlermeldungen können hier hinzugefügt werden

        setSignUpError(userFriendlyMessage); // Setze die benutzerfreundliche Fehlermeldung
      } else {
        console.log("Erfolgreich registriert:", data);
        closeSignUpModal(); // Schließe das Registrierungs-Modal
        setSignUpError(""); // Leere die Fehlermeldung
      }
    } finally {
      setIsLoadingSignUp(false); // Ladezustand deaktivieren, unabhängig vom Erfolg oder Fehler
    }
  };

  async function handleLogin() {
    try {
      setIsLoadingLogin(true); // Ladezustand aktivieren
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        console.error("Fehler beim Anmelden:", error);

        // Benutzerfreundliche Fehlermeldung setzen
        let userFriendlyMessage =
          "Ein unbekannter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";

        if (error.message.includes("Invalid login credentials")) {
          userFriendlyMessage =
            "Ungültige Anmeldedaten. Bitte überprüfen Sie Ihren Benutzernamen und Ihr Passwort.";
        }

        if (error.message.includes("Email not confirmed")) {
          userFriendlyMessage =
            "E-Mail-Adresse nicht bestätigt. Bitte bestätigen Sie Ihre E-Mail-Adresse, um fortzufahren.";
        }

        // Weitere benutzerfreundliche Fehlermeldungen können hier hinzugefügt werden

        setLoginError(userFriendlyMessage); // Setze die benutzerfreundliche Fehlermeldung
      } else {
        console.log("Erfolgreich angemeldet:", data);
        closeLoginModal(); // Schließe das Login-Modal
        setLoginError(""); // Leere die Fehlermeldung
      }
    } finally {
      setIsLoadingLogin(false); // Ladezustand deaktivieren, unabhängig vom Erfolg oder Fehler
    }
  }

  // Funktion zum Schließen des Login-Modals
  const closeLoginModal = () => {
    setShowLoginModal(false);
    setEmail(""); // E-Mail-Feld zurücksetzen
    setPassword(""); // Passwort-Feld zurücksetzen
    setLoginError(""); // Fehlermeldung zurücksetzen
  };

  // Funktion zum Schließen des Registrierungs-Modals
  const closeSignUpModal = () => {
    setShowSignUpModal(false);
    setEmail(""); // E-Mail-Feld zurücksetzen
    setPassword(""); // Passwort-Feld zurücksetzen
    setSignUpError(""); // Fehlermeldung zurücksetzen
  };

  return (
    <div className="flex">
      <button
        className="hover:opacity-50"
        onClick={() => setShowLoginModal(true)}
      >
        Log In / SignUp
      </button>
      {showLoginModal && !showSignUpModal && (
        <LoginModal
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          closeLoginModal={closeLoginModal}
          setShowLoginModal={setShowLoginModal}
          setShowSignUpModal={setShowSignUpModal}
          errorMessage={loginError}
          isLoading={isLoadingLogin} // Übergebe die Fehlermeldung als Prop
        />
      )}
      {showSignUpModal && (
        <SignUpModal
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSignUp={handleSignUp}
          closeSignUpModal={closeSignUpModal}
          setShowLoginModal={setShowLoginModal}
          setShowSignUpModal={setShowSignUpModal}
          errorMessage={signUpError}
          isLoading={isLoadingSignUp} // Übergebe die Fehlermeldung als Prop
        />
      )}
    </div>
  );
};

export default LoginButton;
