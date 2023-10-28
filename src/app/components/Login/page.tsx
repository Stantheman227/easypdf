// LoginButton.js
import React, { useState } from 'react';
import supabase from '../../supabaseClient/page'; // Pfad zu Ihrer Supabase Client-Datei
import LoginModal from '../LoginModal/page'; // Importieren des LoginModal
import SignUpModal from '../SignUpModal/page'; // Importieren des SignUpModal

const LoginButton = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false); // Neuer Zustand

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.error('Fehler bei der Registrierung:', error);
    } else {
      console.log('Erfolgreich registriert:', data);
      setShowSignUpModal(false);
    }
  };

  async function handleLogin() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) {
      console.error('Fehler beim Anmelden+:', error);
    } else {
      console.log('Erfolgreich angemeldet:', data);
      setShowModal(false);
    }
  };
  

  return (
    <div className="flex">
      <button className="hover:opacity-50" onClick={() => setShowModal(true)}>
        Log In / SignUp
      </button>
      {showModal && !showSignUpModal && (
        <LoginModal
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          setShowModal={setShowModal}
          setShowSignUpModal={setShowSignUpModal}
        />
      )}
      {showSignUpModal && (
        <SignUpModal
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSignUp={handleSignUp}
          setShowModal={setShowModal}
          setShowSignUpModal={setShowSignUpModal}
        />
      )}
    </div>
  );
};

export default LoginButton;
