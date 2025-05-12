import React, { useState } from "react";
import { Mail, ArrowRight, Zap, Lock } from "lucide-react";
import Navbar from "./components/Navbar";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailSubmit = () => {
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    // Simulate sending a reset link
    setErrorMessage("");
    alert("Reset link sent (simulation)");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <span className="bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <Zap className="h-4 w-4 mr-1" />
                  Password Recovery
                </span>
              </div>

              <div className="flex justify-center mb-4">
                <Lock className="h-12 w-12 text-indigo-600" />
              </div>

              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                Reset Your Password
              </h2>
              <p className="text-gray-600 max-w-xs mx-auto">
                Enter your email to reset your password
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="you@example.com"
                  />
                </div>
                {errorMessage && (
                  <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
                )}
              </div>
              <button
                onClick={handleEmailSubmit}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 group"
              >
                Send Reset Link
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
