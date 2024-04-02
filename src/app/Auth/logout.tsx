"use client";
import React from "react";
import supabase from "../Services/supaBaseClinet";

const LogoutButton = () => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Fehler beim Abmelden:", error);
      return;
    }
    console.log("Erfolgreich abgemeldet!");
  };

  return (
    <div className="hover:opacity-50 p-2 text-center border-black border rounded-lg w-[150px]">
      <button onClick={() => handleLogout()}>Log Out</button>
    </div>
  );
};

export default LogoutButton;
