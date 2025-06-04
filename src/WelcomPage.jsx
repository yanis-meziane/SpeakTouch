import React, { useState } from "react";
import { Heart, MessageSquare, X } from "lucide-react";

export default function WelcomePage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedInterface, setSelectedInterface] = useState(null);

  const handleInterfaceSelect = (interfaceType) => {
    setSelectedInterface(interfaceType);
    setShowModal(true);
  };

  const confirmSelection = () => {
    if (selectedInterface === "kids") {
      window.location.href = "/kids";
    } else if (selectedInterface === "adult") {
      window.location.href = "/communication";
    }
    setShowModal(false);
  };

  const cancelSelection = () => {
    setShowModal(false);
    setSelectedInterface(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col">
      {/* Header */}
      <header className="w-full bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-indigo-600 text-center">
            SpeakTouch
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Choose Your Interface
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the appropriate interface based on your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kids Interface Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-40 bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                <Heart className="h-20 w-20 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Kids Interface
                </h3>
                <p className="text-gray-600 mb-6">
                  Simple, colorful interface with large buttons for children to
                  express basic needs.
                </p>
                <button
                  onClick={() => handleInterfaceSelect("kids")}
                  className="w-full py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Select Kids Interface
                </button>
              </div>
            </div>

            {/* Adult Interface Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                <MessageSquare className="h-20 w-20 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Adult Interface
                </h3>
                <p className="text-gray-600 mb-6">
                  Advanced interface with gesture controls and AI-assisted
                  communication options.
                </p>
                <button
                  onClick={() => handleInterfaceSelect("adult")}
                  className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Select Adult Interface
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>&copy; 2025 SpeakTouch. All rights reserved.</p>
        </div>
      </footer>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative">
            <button
              onClick={cancelSelection}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Confirm Selection
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to access the{" "}
                <span className="font-semibold">
                  {selectedInterface === "kids" ? "Kids" : "Adult"}
                </span>{" "}
                interface?
              </p>

              <div className="flex gap-4">
                <button
                  onClick={cancelSelection}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSelection}
                  className={`flex-1 py-2 text-white rounded-lg ${
                    selectedInterface === "kids"
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
