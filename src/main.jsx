import react from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./index.css";
import { PrivyProvider } from "@privy-io/react-auth";
import { StateContextProvider } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PrivyProvider
    appId="cm8k5trum00o31197kmxj17jn"
    config={{
      appearance: {
        loginMethods: ["email", "wallet"],
        theme: "dark",
      },
    }}
  >
    <BrowserRouter>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </BrowserRouter>
  </PrivyProvider>,
);
