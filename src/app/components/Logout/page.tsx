import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <div className="hover:opacity-50">
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
        </button>
        </div>
    );
};

export default LogoutButton;