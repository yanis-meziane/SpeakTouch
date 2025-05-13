import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Zap, ArrowRight, GripHorizontal } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-10 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">SpeakTouch</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-6 text-gray-600">
          <a href="#features" className="hover:text-indigo-600 transition">
            Features
          </a>
          <a href="/#how-it-works" className="hover:text-indigo-600 transition">
            How It Works
          </a>
          <a href="/kids" className="hover:text-indigo-600 transition">
            SpeakTouch Kids
          </a>
          <a href="#about" className="hover:text-indigo-600 transition">
            About Us
          </a>
          <Link
            to="/signup"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-5 rounded-full transition flex items-center space-x-1"
          >
            <span>Sign up</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <GripHorizontal className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4 text-gray-600 bg-white shadow-md pt-8">
          <a href="#features" className="block hover:text-indigo-600">
            Features
          </a>
          <a href="/#how-it-works" className="block hover:text-indigo-600">
            How It Works
          </a>
          <a href="/kids" className="block hover:text-indigo-600">
            SpeakTouch Kids
          </a>
          <a href="#about" className="block hover:text-indigo-600">
            About Us
          </a>
          <Link
            to="/signup"
            className="inline-block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-full text-center"
          >
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
}
