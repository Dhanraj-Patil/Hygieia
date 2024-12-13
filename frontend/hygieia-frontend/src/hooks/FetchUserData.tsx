import React, { useState } from "react";
import axios from "@/config/axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function FetchUserData() {
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    try {
      const getData = async () => {
        const accessToken = await getAccessTokenSilently();
        const response = await axios.get("http://localhost:3000/check", {
          params: {
            id: user?.email,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log(JSON.stringify(response.data));

        if (response.data.type === "user") {
          navigate("/dashboard");
        } else if (response.data.type === "expert") {
          navigate("/expert-dashboard");
        } else if (response.data.type === "404") {
          navigate("/register");
        }
      };

      if (isAuthenticated) {
        getData();
      } else {
        loginWithRedirect();
      }
    } catch (error) {
      console.log(error);
    }
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  if (isLoading || !userData) {
    return <div>Loading...</div>;
  }

  return null;
}
