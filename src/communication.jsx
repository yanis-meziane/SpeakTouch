import React, { useState, useEffect, useRef } from "react";
import {
  Zap,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Send,
  Wifi,
  WifiOff,
} from "lucide-react";
import Navbar from "./components/Navbar.jsx";
import sentencesData from "../public/sentences.json";

export default function CommunicationPage() {
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [currentGesture, setCurrentGesture] = useState(null);
  const [isGesturing, setIsGesturing] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isOfflineMode, setIsOfflineMode] = useState(true);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSentences, setActiveSentences] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const sentencesPerPage = 4;
  const audioRefs = useRef({});

  // Detect if device is touch-capable
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // Calculate total pages
    setTotalPages(Math.ceil(sentencesData.length / sentencesPerPage));

    // Initialize with the first page of sentences
    updateActiveSentences(0);

    // Preload audio files for the first page
    preloadAudioForPage(0);

    return () => {
      // Cleanup audio resources
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    };
  }, []);

  // Update active sentences when page changes or AI suggestions arrive
  useEffect(() => {
    if (isOfflineMode) {
      updateActiveSentences(currentPageIndex);
      preloadAudioForPage(currentPageIndex);
    } else if (aiSuggestions) {
      setActiveSentences(aiSuggestions.slice(0, 4));
      preloadAudioForAiSuggestions();
    }
  }, [currentPageIndex, isOfflineMode, aiSuggestions]);

  // Update which sentences are active based on the current page
  const updateActiveSentences = (pageIndex) => {
    const startIdx = pageIndex * sentencesPerPage;
    const endIdx = startIdx + sentencesPerPage;
    setActiveSentences(sentencesData.slice(startIdx, endIdx));
  };

  // Preload audio for the current page
  const preloadAudioForPage = (pageIndex) => {
    const startIdx = pageIndex * sentencesPerPage;
    const endIdx = startIdx + sentencesPerPage;

    sentencesData.slice(startIdx, endIdx).forEach((sentence) => {
      if (!audioRefs.current[sentence.id]) {
        audioRefs.current[sentence.id] = new Audio(
          `/sounds/${sentence.id}.mp3`
        );
      }
    });
  };

  // Preload audio for AI suggestions
  const preloadAudioForAiSuggestions = () => {
    if (aiSuggestions) {
      aiSuggestions.forEach((sentence) => {
        if (!audioRefs.current[sentence.id]) {
          audioRefs.current[sentence.id] = new Audio(
            `/sounds/${sentence.id}.mp3`
          );
        }
      });
    }
  };

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
        const rightSentence = activeSentences.find(
          (s) => s.direction === "right"
        );
        if (rightSentence) {
          playSound(rightSentence);
        }
      } else if (dx < -50) {
        const leftSentence = activeSentences.find(
          (s) => s.direction === "left"
        );
        if (leftSentence) {
          playSound(leftSentence);
        }
      }
    } else {
      // Vertical movement
      if (dy > 50) {
        const downSentence = activeSentences.find(
          (s) => s.direction === "down"
        );
        if (downSentence) {
          playSound(downSentence);
        }
      } else if (dy < -50) {
        const upSentence = activeSentences.find((s) => s.direction === "up");
        if (upSentence) {
          playSound(upSentence);
        }
      }
    }

    setIsGesturing(false);
  };

  const playSound = (sentence) => {
    // Stop any currently playing sounds
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    // Play the appropriate sound
    if (audioRefs.current[sentence.id]) {
      audioRefs.current[sentence.id]
        .play()
        .catch((e) => console.error("Error playing audio:", e));
    }

    setCurrentGesture(sentence.direction);
    setFeedback(sentence.message);

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

  // Navigation controls
  const goToNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  // Toggle between offline and online mode
  const toggleMode = () => {
    setIsOfflineMode(!isOfflineMode);
    if (isOfflineMode) {
      // Reset AI suggestions when switching to online mode
      setAiSuggestions(null);
    } else {
      // Reset to first page when switching to offline mode
      setCurrentPageIndex(0);
      updateActiveSentences(0);
    }
  };

  // Handle AI form submission
  const handleAiSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate AI processing - in a real app, this would call the ChatGPT API
    setTimeout(() => {
      // Select 8 "recommended" sentences based on the prompt
      // In a real implementation, this would come from ChatGPT
      const mockAiResponse = sentencesData
        .sort(() => 0.5 - Math.random()) // Shuffle array
        .slice(0, 8); // Get first 8 items

      setAiSuggestions(mockAiResponse);
      setIsLoading(false);
    }, 1500); // Simulate network delay
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
    const icons = {
      up: <ArrowUp className="h-6 w-6" />,
      down: <ArrowDown className="h-6 w-6" />,
      left: <ArrowLeft className="h-6 w-6" />,
      right: <ArrowRight className="h-6 w-6" />,
    };

    return currentGesture ? icons[currentGesture] : null;
  };

  return (
    <div
      className="min-h-screen overflow-y-hidden bg-gradient-to-b from-white to-indigo-50 flex flex-col"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <Navbar />

      {/* Mode Toggle Button */}
      <div className="fixed top-20 right-4 z-10">
        <button
          onClick={toggleMode}
          className="flex items-center gap-2 bg-white shadow-md rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
        >
          {isOfflineMode ? (
            <>
              <WifiOff className="h-4 w-4 text-gray-600" />
              <span>Offline Mode</span>
            </>
          ) : (
            <>
              <Wifi className="h-4 w-4 text-indigo-600" />
              <span>Online Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 overflow-scroll">
        <div className="container mx-auto max-w-4xl">
          {/* Gesture Response Area */}
          <div className="mb-12 text-center mt-16">
            {feedback ? (
              <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg mx-auto transform transition-all duration-300 scale-105">
                <h2 className="flex flex-wrap items-center justify-center text-2xl font-bold text-gray-900 mb-2">
                  {getGestureIcon()} &nbsp; {feedback}
                </h2>
                <div className="mb-4 h-26 flex items-center justify-center">
                  <Volume2 size={54} className="text-indigo-600" />
                </div>
                <p className="text-gray-600">Swipe gesture detected</p>
              </div>
            ) : isOfflineMode ? (
              <div className="bg-white shadow-md rounded-2xl p-8 mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 select-none">
                  Make a gesture to communicate
                </h2>
                <p className="text-gray-600 mb-6 select-none">
                  Swipe in any direction to express yourself
                </p>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mb-8">
                  <button
                    onClick={goToPrevPage}
                    disabled={currentPageIndex === 0}
                    className={`p-2 rounded-full ${
                      currentPageIndex === 0
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  <span className="text-sm text-gray-500">
                    Page {currentPageIndex + 1} of {totalPages}
                  </span>

                  <button
                    onClick={goToNextPage}
                    disabled={currentPageIndex === totalPages - 1}
                    className={`p-2 rounded-full ${
                      currentPageIndex === totalPages - 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-x-10 justify-items-center">
                  {activeSentences.map((item) => {
                    // Map direction string to the corresponding icon component
                    let IconComponent;
                    switch (item.direction) {
                      case "up":
                        IconComponent = ArrowUp;
                        break;
                      case "down":
                        IconComponent = ArrowDown;
                        break;
                      case "left":
                        IconComponent = ArrowLeft;
                        break;
                      case "right":
                        IconComponent = ArrowRight;
                        break;
                      default:
                        IconComponent = Zap;
                    }

                    return (
                      <div
                        key={item.id}
                        className="bg-gray-50 p-4 rounded-xl flex flex-col items-center w-48 shadow-sm hover:shadow-md transition select-none text-center"
                      >
                        <div className="p-3 bg-indigo-100 rounded-full mb-3">
                          <IconComponent className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">
                            Swipe {item.direction}
                          </div>
                          <div className="font-semibold text-gray-800">
                            {item.message}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              // Online mode interface
              <div className="bg-white shadow-md rounded-2xl p-8 mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 select-none">
                  AI-Assisted Communication
                </h2>

                {!aiSuggestions ? (
                  <div className="max-w-md mx-auto">
                    <p className="text-gray-600 mb-6 select-none">
                      Describe the person's needs to get personalized sentence
                      suggestions
                    </p>

                    <form onSubmit={handleAiSubmit} className="space-y-4">
                      <textarea
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="Describe the person's condition, situation, or specific needs..."
                        className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />

                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-white font-medium ${
                          isLoading
                            ? "bg-indigo-400"
                            : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                      >
                        {isLoading ? (
                          <>
                            <span className="animate-pulse">Processing</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            <span>Generate Suggestions</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 mb-6 select-none">
                      Personalized sentences based on your description
                    </p>

                    <div className="mb-4 flex justify-end">
                      <button
                        onClick={() => setAiSuggestions(null)}
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        Reset
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-x-10 justify-items-center">
                      {aiSuggestions.slice(0, 4).map((item) => {
                        // Map direction string to the corresponding icon component
                        let IconComponent;
                        switch (item.direction) {
                          case "up":
                            IconComponent = ArrowUp;
                            break;
                          case "down":
                            IconComponent = ArrowDown;
                            break;
                          case "left":
                            IconComponent = ArrowLeft;
                            break;
                          case "right":
                            IconComponent = ArrowRight;
                            break;
                          default:
                            IconComponent = Zap;
                        }

                        return (
                          <div
                            key={item.id}
                            className="bg-gray-50 p-4 rounded-xl flex flex-col items-center w-48 shadow-sm hover:shadow-md transition select-none text-center"
                          >
                            <div className="p-3 bg-indigo-100 rounded-full mb-3">
                              <IconComponent className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 mb-1">
                                Swipe {item.direction}
                              </div>
                              <div className="font-semibold text-gray-800">
                                {item.message}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Show additional AI suggestions if available */}
                    {aiSuggestions.length > 4 && (
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          Additional Suggestions
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-x-10 justify-items-center">
                          {aiSuggestions.slice(4, 8).map((item) => {
                            let IconComponent;
                            switch (item.direction) {
                              case "up":
                                IconComponent = ArrowUp;
                                break;
                              case "down":
                                IconComponent = ArrowDown;
                                break;
                              case "left":
                                IconComponent = ArrowLeft;
                                break;
                              case "right":
                                IconComponent = ArrowRight;
                                break;
                              default:
                                IconComponent = Zap;
                            }

                            return (
                              <div
                                key={item.id}
                                className="bg-gray-50 p-4 rounded-xl flex flex-col items-center w-48 shadow-sm hover:shadow-md transition select-none text-center"
                              >
                                <div className="p-3 bg-indigo-100 rounded-full mb-3">
                                  <IconComponent className="h-6 w-6 text-indigo-600" />
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500 mb-1">
                                    Not Assigned
                                  </div>
                                  <div className="font-semibold text-gray-800">
                                    {item.message}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                )}
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
    </div>
  );
}
