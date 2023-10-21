import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Login/page";
import LogoutButton from "../Logout/page";
import Image from "next/image";

export default function UserMenu() {
  const { isAuthenticated, isLoading, user } = useAuth0();

  // Mocking balance info here, replace with your real balance fetching logic
  const balance = 12.34;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-menu">
      <div className="">
        {isAuthenticated ? (
          <div className="menu-button">
            <Image
              height={60}
              width={60}
              src={user?.picture ?? ""}
              alt={user?.name ?? ""}
            />
            <div className="dropdown">
              <LogoutButton />
              <br/>
              <p>User Info:</p>
              <div>Balance: {balance}€</div>
              <h2>{user?.name}</h2>
              <p>{user?.email}</p>
            </div>
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
}
