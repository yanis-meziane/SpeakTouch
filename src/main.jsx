import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CommunicationPage from "./CommunicationPage"; // à créer

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/communication" element={<CommunicationPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
