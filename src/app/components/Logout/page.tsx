import React from "react";
import supabase from "../../supabaseClient/page";

const LogoutButton = () => {
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Fehler beim Abmelden:", error);
            return;
        }
        console.log("Erfolgreich abgemeldet!")
    };

    return (
        <div className="hover:opacity-50">
        <button onClick={() => handleLogout()}>
            Log Out
        </button>
        </div>
    );
};

export default LogoutButton;