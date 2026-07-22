/*
  main.tsx
  ────────
  This is the ENTRY POINT — the very first file that runs.

  It does two things:
  1. Wraps the app in <BrowserRouter> so we can navigate between pages
  2. Renders the <App /> component into the HTML page

  NOTE: With Zustand, we don't need a provider wrapper — just import useCart anywhere!
*/

import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Find the <div id="root"> in index.html and render our React app inside it
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
