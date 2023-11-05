import React, { useEffect, useState } from "react";
import supabase from "../../supabaseClient/page";
import LoginButton from "../Login/page";
import LogoutButton from "../Logout/page";
import {ChevronDownIcon} from "@heroicons/react/24/outline";

export default function UserMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const balance = 12.34; // Mock-Daten

  const getEmailPrefix = (email) => {
    return email?.split('@')[0];
  }

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
          <div className="flex flex-row border items-center space-x-5 border-easy-blue shadow-lg text-black hover:bg-easy-blue transition-all duration-300 ease-in-out rounded-lg p-3">
            <p className="font-thin text-lg">{getEmailPrefix(currentUser?.email)}</p>
            <ChevronDownIcon className="w-4 h-4"/>
            <div className="dropdown font-thin text-black">
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
