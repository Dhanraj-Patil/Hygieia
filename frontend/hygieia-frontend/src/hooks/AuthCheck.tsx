import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function ({ children }) {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return children;
  } else {
    return loginWithRedirect();
  }
}
