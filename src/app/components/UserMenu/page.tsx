import React, { useEffect, useState } from "react";
import supabase from "../../supabaseClient/page";
import LoginButton from "../Login/page";
import LogoutButton from "../Logout/page";
import Image from "next/image";

export default function UserMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const balance = 12.34; // Mock-Daten

  useEffect(() => {
    // Define an async function
    const fetchUserSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        console.log("Data from supabase.auth.getSession():", data);
  
        const sessionData = data?.session;
  
        if (sessionData && sessionData.user) {
          // Check if user still exists in your database or `auth.users` table
          const { data: user, error: userError } = await supabase
            .from("profiles") // Replace this with your user table if you have a custom one
            .select("id")
            .eq("id", sessionData.user.id)
            .single();
  
          if (user) {
            setIsLoggedIn(true);
            console.log("Session data:", sessionData);
            setCurrentUser(sessionData.user); // New state
          } else {
            // User doesn't exist, so sign out
            await supabase.auth.signOut();
            setIsLoggedIn(false);
            console.log("User does not exist. Signing out.");
          }
        } else {
          setIsLoggedIn(false);
          console.log("No active session or user is undefined");
          await supabase.auth.signOut();
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
        console.log("User AuthStateChange to SignedOut", event, session);
      }
    });
  }, []);

  return (
    <div className="user-menu">
      <div className="">
        {isLoggedIn ? (
          <div className="menu-button mt-4">
            <Image
              height={60}
              width={60}
              alt="User Avatar"
              src="/dog_profile.png"
            />
            <div className="dropdown">
              <LogoutButton />
              <br />
              <p>User Info:</p>
              <div>Balance: {balance}€</div>
              <p>{currentUser?.email}</p>
            </div>
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
}
