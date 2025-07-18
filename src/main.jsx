import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CommunicationPage from "./communication";
import Privacy from "./Privacy";
import Terms from "./terms";
import Signup from "./signup";
import Login from "./login";
import SpeakTouchKids from "./kids";
import ResetPassword from "./reset";
import AboutUs from "./about";
import "./index.css";
import WelcomePage from "./WelcomPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/communication" element={<CommunicationPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/kids" element={<SpeakTouchKids />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/WelcomPage" element={<WelcomePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
