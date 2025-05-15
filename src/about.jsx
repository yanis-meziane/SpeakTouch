import React from "react";
import {
  MessageSquare,
  Award,
  Heart,
  BarChart2,
  Zap,
  ArrowRight,
  Github,
} from "lucide-react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white scroll-smooth">
      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <header className="min-h-[40vh] px-4 md:px-6 text-center flex items-center">
        <div className="container mx-auto max-w-4xl mt-10">
          <div className="flex justify-center mb-6">
            <span className="bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-medium flex items-center">
              <Zap className="h-4 w-4 mr-1" />
              Our Project
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            About <span className="text-indigo-600">SpeakTouch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            A touch-based communication tool for those who need an alternative
            way to communicate
          </p>
        </div>
      </header>

      {/* Mission Section */}
      <section className="py-12 bg-gradient-to-b from-white to-indigo-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 overflow-hidden">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/2">
                  <div className="flex items-center mb-6">
                    <Heart className="text-red-500 mr-4" size={28} />
                    <h2 className="text-3xl font-bold text-gray-900">
                      Our Mission
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-6">
                    To empower individuals who are blind, nonverbal, or have
                    communication difficulties by providing a simple and
                    intuitive way to express essential needs and feelings
                    through touch-based technology.
                  </p>
                </div>
                <div className="w-full md:w-1/2 relative">
                  <div className="bg-indigo-600 rounded-2xl p-5 text-white shadow-lg transform rotate-1">
                    <h3 className="font-bold mb-3 text-lg flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Our Core Values
                    </h3>
                    <div className="space-y-3">
                      {[
                        "Accessibility for All",
                        "Human-Centered Design",
                        "Innovative Solutions",
                        "Empathy in Technology",
                      ].map((value, index) => (
                        <div
                          key={index}
                          className="bg-indigo-700 rounded-lg p-3 flex justify-between items-center"
                        >
                          <span>{value}</span>
                          <ArrowRight className="h-4 w-4 opacity-70" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <div className="flex justify-center items-center mb-4">
              <MessageSquare className="text-indigo-600 mr-2" size={28} />
              <h2 className="text-3xl font-bold text-gray-900">Our Solution</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A touch-based communication tool designed for accessibility
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-4 text-gray-600">
              Our prototype features:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Simple tactile inputs translated into vibration patterns",
                "Optional audio cues to reinforce the message",
                "Quick way to communicate essential phrases",
                "Local server installation via GitHub",
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3">
                    <span className="text-sm">✓</span>
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-lg mb-4 text-gray-600">Express phrases like:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                "Help",
                "Yes",
                "No",
                "I'm hungry",
                "Thank you",
                "I need rest",
                "I'm cold",
                "Water please",
              ].map((phrase, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow p-4 text-center text-gray-800 font-medium"
                >
                  {phrase}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's Next Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <div className="flex justify-center items-center mb-4">
              <BarChart2 className="text-green-500 mr-2" size={28} />
              <h2 className="text-3xl font-bold text-gray-900">
                Development Plan
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              {
                title: "Customization",
                description: "More customizable phrases and interface options",
              },
              {
                title: "Wearable Tech",
                description: "Integration with wearable devices",
              },
              {
                title: "Multilingual",
                description: "Multiple languages and icon-based interfaces",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                  <ArrowRight className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Section */}
      <section className="py-12 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex justify-center items-center mb-4">
            <Github className="text-white mr-2" size={28} />
            <h2 className="text-3xl font-bold">Get the Code</h2>
          </div>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto mb-8">
            This project is open source and available via GitHub. Clone the
            repository to run it locally.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/yanis-meziane/SpeakTouch"
              target="_blank"
              className="bg-white text-indigo-600 hover:bg-indigo-50 font-medium py-3 px-8 rounded-full transition flex items-center justify-center"
            >
              Clone Repository
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
