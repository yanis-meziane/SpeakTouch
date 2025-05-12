import React, { useState, useEffect, useRef } from "react";
import {
  Zap,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Volume2,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

export default function CommunicationPage() {
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [currentGesture, setCurrentGesture] = useState(null);
  const [isGesturing, setIsGesturing] = useState(false);
  const [feedback, setFeedback] = useState("");
  const audioRefs = {
    up: useRef(null),
    down: useRef(null),
    left: useRef(null),
    right: useRef(null),
  };

  // Detect if device is touch-capable
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // Preload audio files
    audioRefs.up.current = new Audio("/sounds/up.mp3");
    audioRefs.down.current = new Audio("/sounds/down.mp3");
    audioRefs.left.current = new Audio("/sounds/left.mp3");
    audioRefs.right.current = new Audio("/sounds/right.mp3");

    return () => {
      // Cleanup audio resources
      Object.values(audioRefs).forEach((ref) => {
        if (ref.current) {
          ref.current.pause();
          ref.current.currentTime = 0;
        }
      });
    };
  }, []);

  const handleStart = (clientX, clientY) => {
    setStartPosition({ x: clientX, y: clientY });
    setIsGesturing(true);
    setCurrentGesture(null);
  };

  const handleEnd = (clientX, clientY) => {
    if (!isGesturing) return;

    const dx = clientX - startPosition.x;
    const dy = clientY - startPosition.y;

    // Determine if the gesture was mostly horizontal or vertical
    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal movement
      if (dx > 50) {
        playSound("right", "I need help");
      } else if (dx < -50) {
        playSound("left", "Bathroom");
      }
    } else {
      // Vertical movement
      if (dy > 50) {
        playSound("down", "Thank you");
      } else if (dy < -50) {
        playSound("up", "I'm hungry");
      }
    }

    setIsGesturing(false);
  };

  const playSound = (direction, message) => {
    // Stop any currently playing sounds
    Object.values(audioRefs).forEach((ref) => {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
    });

    // Play the appropriate sound
    if (audioRefs[direction].current) {
      audioRefs[direction].current
        .play()
        .catch((e) => console.error("Error playing audio:", e));
    }

    setCurrentGesture(direction);
    setFeedback(message);

    // Provide haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }

    // Reset feedback after 2 seconds
    setTimeout(() => {
      setFeedback("");
      setCurrentGesture(null);
    }, 2000);
  };

  // Mouse event handlers
  const handleMouseDown = (e) => {
    if (!isTouchDevice.current) {
      handleStart(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = (e) => {
    if (!isTouchDevice.current) {
      handleEnd(e.clientX, e.clientY);
    }
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = (e) => {
    if (e.changedTouches.length > 0) {
      const touch = e.changedTouches[0];
      handleEnd(touch.clientX, touch.clientY);
    }
  };

  const getGestureIcon = () => {
    switch (currentGesture) {
      case "up":
        return <ArrowUp size={64} className="text-indigo-600" />;
      case "down":
        return <ArrowDown size={64} className="text-indigo-600" />;
      case "left":
        return <ArrowLeft size={64} className="text-indigo-600" />;
      case "right":
        return <ArrowRight size={64} className="text-indigo-600" />;
      default:
        return null;
    }
  };

  const gestureInstructions = [
    {
      direction: "up",
      message: "I'm hungry",
      icon: <ArrowUp className="h-6 w-6 text-indigo-600" />,
    },
    {
      direction: "down",
      message: "Thank you",
      icon: <ArrowDown className="h-6 w-6 text-indigo-600" />,
    },
    {
      direction: "left",
      message: "Bathroom",
      icon: <ArrowLeft className="h-6 w-6 text-indigo-600" />,
    },
    {
      direction: "right",
      message: "I need help",
      icon: <ArrowRight className="h-6 w-6 text-indigo-600" />,
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-white to-indigo-50 flex flex-col"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <div className="container mx-auto max-w-4xl">
          {/* Gesture Response Area */}
          <div className="mb-12 text-center">
            <div className="mb-4 h-32 flex items-center justify-center">
              {getGestureIcon()}
            </div>

            {feedback ? (
              <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg mx-auto transform transition-all duration-300 scale-105">
                <div className="flex items-center justify-center mb-4">
                  <Volume2 className="h-8 w-8 text-indigo-600 mr-2" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {feedback}
                </h2>
                <p className="text-gray-600">Swipe gesture detected</p>
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-2xl p-8 max-w-lg mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 select-none">
                  Make a gesture to communicate
                </h2>
                <p className="text-gray-600 mb-6 select-none">
                  Swipe in any direction to express yourself
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {gestureInstructions.map((item) => (
                    <div
                      key={item.direction}
                      className="bg-gray-50 p-4 rounded-lg flex items-center"
                    >
                      <div className="p-2 bg-indigo-100 rounded-full mr-3 select-none">
                        {item.icon}
                      </div>
                      <div className="text-left select-none">
                        <div className="text-sm font-medium text-gray-500">
                          Swipe {item.direction}
                        </div>
                        <div className="font-medium select-none">
                          {item.message}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Visual feedback for gesture tracking */}
          <div className="relative bg-indigo-50 h-64 rounded-3xl overflow-hidden mb-12">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-indigo-600 font-medium select-none">
                {isGesturing
                  ? "Tracking gesture..."
                  : "Touch or click anywhere and move"}
              </p>
            </div>

            {/* Visual gesture trails (decorative) */}
            <div className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full bg-indigo-200 opacity-20"></div>
            <div className="absolute top-1/3 left-1/4 w-16 h-16 rounded-full bg-indigo-300 opacity-10"></div>
            <div className="absolute bottom-1/4 right-1/3 w-12 h-12 rounded-full bg-indigo-400 opacity-15"></div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-indigo-600" />
                <span className="font-bold text-gray-900">SpeakTouch</span>
              </div>
              <p className="text-sm text-gray-500">
                Express yourself without words
              </p>
            </div>

            <div className="flex space-x-4">
              <a
                href="#demo"
                className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
              >
                Get Demo
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-gray-900 font-medium text-sm"
              >
                How It Works
              </a>
              <a
                href="#support"
                className="text-gray-700 hover:text-gray-900 font-medium text-sm"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
