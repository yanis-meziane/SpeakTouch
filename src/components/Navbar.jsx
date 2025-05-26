import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, MessageSquare, Settings } from "lucide-react"; // ← Ajoutez Settings

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <MessageSquare className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                SpeakTouch
              </span>
            </Link>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition"
            >
              Accueil
            </Link>
            <Link
              to="/communication"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition"
            >
              Communication
            </Link>
            <Link
              to="/kids"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition"
            >
              Enfants
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition"
            >
              À propos
            </Link>
            {/* ← AJOUTEZ CE LIEN */}
            <Link
              to="/setting"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition flex items-center"
            >
              <Settings className="h-4 w-4 mr-1" />
              Paramètres
            </Link>
            <Link
              to="/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Connexion
            </Link>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:text-indigo-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 block px-3 py-2 text-base font-medium transition"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/communication"
              className="text-gray-700 hover:text-indigo-600 block px-3 py-2 text-base font-medium transition"
              onClick={() => setIsOpen(false)}
            >
              Communication
            </Link>
            <Link
              to="/kids"
              className="text-gray-700 hover:text-indigo-600 block px-3 py-2 text-base font-medium transition"
              onClick={() => setIsOpen(false)}
            >
              Enfants
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-indigo-600 block px-3 py-2 text-base font-medium transition"
              onClick={() => setIsOpen(false)}
            >
              À propos
            </Link>
            {/* ← AJOUTEZ CE LIEN MOBILE */}
            <Link
              to="/setting"
              className="text-gray-700 hover:text-indigo-600 block px-3 py-2 text-base font-medium transition flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </Link>
            <Link
              to="/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white block px-3 py-2 rounded-lg text-base font-medium transition mx-3 mt-4"
              onClick={() => setIsOpen(false)}
            >
              Connexion
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}