import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "../Context/AuthContext.jsx";
import { EmpProvider } from "../Context/EmpContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <EmpProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </EmpProvider>
  </BrowserRouter>
);
