import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="hover:opacity-50">
  <button className="" onClick={() => loginWithRedirect()}>Log In</button>
  </div>
  )
};

export default LoginButton;