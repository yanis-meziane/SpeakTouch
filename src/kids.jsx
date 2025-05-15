import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Hand,
  Zap,
  Heart,
  Award,
  Moon,
  Sun,
  Play,
  Volume2,
  Smile,
  Bed,
  Coffee,
  HelpCircle,
  User,
} from "lucide-react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function SpeakTouchKids() {
  const [activeGesture, setActiveGesture] = useState(null);
  const [setScrolled] = useState(false);
  const speechSynthesisRef = useRef(window.speechSynthesis);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const speakGesture = (gesture) => {
    if (speechSynthesisRef.current.speaking) {
      speechSynthesisRef.current.cancel();
    }

    setActiveGesture(gesture.key);
    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(gesture.action);
    utterance.lang = "en-US";

    utterance.onend = () => {
      setTimeout(() => {
        setActiveGesture(null);
        setIsSpeaking(false);
      }, 500);
    };

    if (navigator.vibrate) {
      navigator.vibrate(100);
    }

    speechSynthesisRef.current.speak(utterance);

    // Fallback in case onend doesn't fire
    setTimeout(() => {
      if (isSpeaking) {
        setActiveGesture(null);
        setIsSpeaking(false);
      }
    }, 5000);
  };

  const communicationOptions = [
    {
      key: "play",
      icon: <Play className="h-6 w-6" />,
      name: "Play Time",
      action: "I want to play",
      color: "bg-green-500",
      description: "Express your desire to play",
    },
    {
      key: "hungry",
      icon: <Coffee className="h-6 w-6" />,
      name: "I'm Hungry",
      action: "I am hungry",
      color: "bg-orange-500",
      description: "Tell others you're hungry",
    },
    {
      key: "help",
      icon: <HelpCircle className="h-6 w-6" />,
      name: "Need Help",
      action: "I need help",
      color: "bg-blue-500",
      description: "Ask for assistance",
    },
    {
      key: "tired",
      icon: <Bed className="h-6 w-6" />,
      name: "I'm Tired",
      action: "I am tired",
      color: "bg-purple-500",
      description: "Communicate your tiredness",
    },
    {
      key: "love",
      icon: <Heart className="h-6 w-6" />,
      name: "I Love You",
      action: "I love you",
      color: "bg-pink-500",
      description: "Express your love",
    },
    {
      key: "drink",
      icon: <Smile className="h-6 w-6" />,
      name: "I'm Thirsty",
      action: "I want a drink",
      color: "bg-teal-500",
      description: "Request something to drink",
    },
    {
      key: "morning",
      icon: <Sun className="h-6 w-6" />,
      name: "Good Morning",
      action: "Good morning",
      color: "bg-yellow-500",
      description: "Say good morning",
    },
    {
      key: "night",
      icon: <Moon className="h-6 w-6" />,
      name: "Good Night",
      action: "Good night",
      color: "bg-indigo-500",
      description: "Say good night",
    },
  ];

  return (
    <div className="h-screen lg:overflow-hidden overflow-auto bg-gradient-to-b transition-colors duration-300">
      <Navbar />

      <main className="container mx-auto px-4 md:px-6 pt-24 pb-12">
        <header className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <span className="bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-medium flex items-center">
              <Zap className="h-4 w-4 mr-1" />
              SpeakTouch Kids
            </span>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Understand Your Children{" "}
            <span className="text-indigo-600">Clearly</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            An intuitive communication app designed to help children express
            their needs and feelings with ease.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {communicationOptions.map((gesture) => (
            <div
              key={gesture.key}
              onClick={() => speakGesture(gesture)}
              className={`
                relative group
                ${gesture.color}
                text-white 
                rounded-2xl 
                p-6 
                flex 
                flex-col 
                items-center 
                justify-center 
                space-y-4 
                transform 
                transition-all 
                duration-300 
                hover:scale-105 
                hover:shadow-xl
                cursor-pointer
                ${activeGesture === gesture.key ? "scale-105 shadow-xl" : ""}
              `}
            >
              <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
                {gesture.icon}
              </div>

              <h3 className="text-lg font-semibold text-center">
                {gesture.name}
              </h3>

              <p className="text-xs text-white/70 text-center">
                {gesture.description}
              </p>

              {activeGesture === gesture.key && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Volume2 className="h-8 w-8 animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}


