import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <Auth0Provider
          domain="hygieia-auth.us.auth0.com"
          clientId="CfyRLuYsAlc5waYapzhHfuPNhVUHtl7o"
          useRefreshTokens={true}
          cacheLocation="localstorage"
          authorizationParams={{
            // redirect_uri: "https://cuddly-loon-heavily.ngrok-free.app/check",
            redirect_uri: "http://localhost:5173/check",
            audience: "https://hygieia-auth-for-backend.com",
          }}
        >
          <App />
        </Auth0Provider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
