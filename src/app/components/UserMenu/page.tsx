import React, { useEffect, useState } from "react";
import supabase from "../../supabaseClient/page";
import LoginButton from "../Login/page";
import LogoutButton from "../Logout/page";
import Image from "next/image";

export default function UserMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const balance = 12.34; // Mock-Daten

  useEffect(() => {
    // Define an async function
    const fetchUserSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (data.session) {
          setIsLoggedIn(true);
          console.log("Session data:", data);
        } else {
          setIsLoggedIn(false);
          console.log("No active session");
        }

        if (error) {
          setIsLoggedIn(false);
          console.error("Error fetching session:", error);
        }
      } catch (err) {
        setIsLoggedIn(false);
        console.error("An error occurred:", err);
      }
    };

    fetchUserSession();
  }, []);

  useEffect(() => {
    // Handle auth state changes
    supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state Mount: " + event, session);
      if (event === "SIGNED_IN") {
        setIsLoggedIn(true);
        console.log("User AuthStateChange to SignedIn:", session);
      } else if (event === "SIGNED_OUT") {
        setIsLoggedIn(false);
        console.log("User AuthStateChange to SignedOut");
      }
    });
  }, []);

  return (
    <div className="user-menu">
      <div className="">
        {isLoggedIn ? (
          <div className="menu-button mt-4">
            <Image height={60} width={60} alt="User Avatar" />
            <div className="dropdown">
              <LogoutButton />
              <br />
              <p>User Info:</p>
              <div>Balance: {balance}€</div>
              <h2>User name</h2>
              <p>EMAIL</p>
            </div>
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
}
