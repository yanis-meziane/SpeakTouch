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
  AlertTriangle,
  X,
} from "lucide-react";

import Navbar from "./components/Navbar.jsx";

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
  const [sentencesData, setSentencesData] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [aiSuggestionsPageIndex, setAiSuggestionsPageIndex] = useState(0);
  const [aiSuggestionsTotalPages, setAiSuggestionsTotalPages] = useState(0);
  const [lastGestureDebug, setLastGestureDebug] = useState(null);

  const sentencesPerPage = 4;
  const audioRefs = useRef({});

  const isTouchDevice = useRef(false);

  useEffect(() => {
    fetch("/sentences.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Phrases chargées:", data.slice(0, 4));
        const directions = data.map((item) => item.direction);
        const uniqueDirections = [...new Set(directions)];
        console.log("Directions disponibles:", uniqueDirections);

        setSentencesData(data);
        setTotalPages(Math.ceil(data.length / sentencesPerPage));
        updateActiveSentences(0, data);
      })
      .catch((error) => console.error("Error loading sentences:", error));
  }, []);

  useEffect(() => {
    isTouchDevice.current =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    };
  }, []);

  useEffect(() => {
    if (isOfflineMode && sentencesData.length > 0) {
      updateActiveSentences(currentPageIndex, sentencesData);
      preloadAudioForPage(currentPageIndex, sentencesData);
    } else if (aiSuggestions) {
      const totalSuggestions = aiSuggestions.organizedSuggestions
        ? aiSuggestions.organizedSuggestions.length
        : aiSuggestions.length;

      setAiSuggestionsTotalPages(
        Math.ceil(totalSuggestions / sentencesPerPage)
      );

      setAiSuggestionsPageIndex(0);

      updateActiveAiSuggestions(0);
    }
  }, [currentPageIndex, isOfflineMode, aiSuggestions, sentencesData]);

  useEffect(() => {
    if (!isOfflineMode && aiSuggestions) {
      updateActiveAiSuggestions(aiSuggestionsPageIndex);
    }
  }, [aiSuggestionsPageIndex]);

  useEffect(() => {
    if (apiError && !isOfflineMode) {
      const timer = setTimeout(() => {
        setIsOfflineMode(true);
        setApiError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [apiError, isOfflineMode]);

  useEffect(() => {
    console.log("Active sentences updated:", activeSentences);

    const hasLeftDirection = activeSentences.some(
      (s) => s.direction === "left"
    );
    console.log("Has 'left' direction:", hasLeftDirection);

    if (!hasLeftDirection && activeSentences.length > 0) {
      console.warn("No sentence with 'left' direction in active sentences!");
    }
  }, [activeSentences]);

  const updateActiveSentences = (pageIndex, data = sentencesData) => {
    if (!data || data.length === 0) return;

    const startIdx = pageIndex * sentencesPerPage;
    const endIdx = startIdx + sentencesPerPage;
    const pageSentences = data.slice(startIdx, endIdx);

    console.log(
      `Setting active sentences for page ${pageIndex + 1}:`,
      pageSentences.map((s) => ({ message: s.message, direction: s.direction }))
    );

    setActiveSentences(pageSentences);
  };

  const updateActiveAiSuggestions = (pageIndex) => {
    if (!aiSuggestions || !aiSuggestions.organizedSuggestions) return;

    const startIdx = pageIndex * sentencesPerPage;
    const endIdx = startIdx + sentencesPerPage;

    if (startIdx >= aiSuggestions.organizedSuggestions.length) {
      console.warn("Page index out of bounds, resetting to first page");
      setAiSuggestionsPageIndex(0);
      return;
    }

    const pageSentences = aiSuggestions.organizedSuggestions.slice(
      startIdx,
      endIdx
    );

    console.log(
      `Setting active AI sentences for page ${pageIndex + 1}:`,
      pageSentences
    );

    setActiveSentences(pageSentences);
    preloadAudioForAiSuggestions(pageSentences);
  };

  const preloadAudioForPage = (pageIndex, data = sentencesData) => {
    if (!data || data.length === 0) return;

    const startIdx = pageIndex * sentencesPerPage;
    const endIdx = startIdx + sentencesPerPage;

    data.slice(startIdx, endIdx).forEach((sentence) => {
      if (!audioRefs.current[sentence.id]) {
        audioRefs.current[sentence.id] = new Audio(
          `/sounds/${sentence.id}.mp3`
        );

        audioRefs.current[sentence.id].load();
      }
    });
  };

  const preloadAudioForAiSuggestions = (suggestions) => {
    if (!suggestions) return;

    suggestions.forEach((sentence) => {
      if (!audioRefs.current[sentence.id]) {
        audioRefs.current[sentence.id] = new Audio(
          `/sounds/${sentence.id}.mp3`
        );
        audioRefs.current[sentence.id].load();
      }
    });
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

    const threshold = 50;

    console.log(`Movement: dx=${dx}, dy=${dy}`);

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > threshold) {
        console.log("RIGHT gesture detected");
        setLastGestureDebug("right");

        const rightSentence = activeSentences.find(
          (s) => s.direction === "right"
        );

        if (rightSentence) {
          console.log("Found RIGHT sentence:", rightSentence);
          playSound(rightSentence);
        } else {
          console.warn("No sentence found for RIGHT gesture");
        }
      } else if (dx < -threshold) {
        console.log("LEFT gesture detected");
        setLastGestureDebug("left");

        console.log(
          "Active sentences when LEFT detected:",
          activeSentences.map((s) => ({
            id: s.id,
            message: s.message,
            direction: s.direction,
          }))
        );

        const leftSentence = activeSentences.find(
          (s) => s.direction && s.direction.toLowerCase() === "left"
        );

        if (leftSentence) {
          console.log("Found LEFT sentence:", leftSentence);
          playSound(leftSentence);
        } else {
          console.warn("No sentence found for LEFT gesture");

          if (activeSentences.length > 0) {
            console.log("Using fallback for LEFT gesture");

            const fallbackSentence = {
              ...activeSentences[0],
              direction: "left",
            };
            playSound(fallbackSentence);
          }
        }
      }
    } else {
      if (dy > threshold) {
        console.log("DOWN gesture detected");
        setLastGestureDebug("down");

        const downSentence = activeSentences.find(
          (s) => s.direction === "down"
        );

        if (downSentence) {
          console.log("Found DOWN sentence:", downSentence);
          playSound(downSentence);
        } else {
          console.warn("No sentence found for DOWN gesture");
        }
      } else if (dy < -threshold) {
        console.log("UP gesture detected");
        setLastGestureDebug("up");

        const upSentence = activeSentences.find((s) => s.direction === "up");

        if (upSentence) {
          console.log("Found UP sentence:", upSentence);
          playSound(upSentence);
        } else {
          console.warn("No sentence found for UP gesture");
        }
      }
    }

    setIsGesturing(false);
  };

  const playSound = (sentence) => {
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    if (audioRefs.current[sentence.id]) {
      audioRefs.current[sentence.id]
        .play()
        .catch((e) => console.error("Error playing audio:", e));
    }

    setCurrentGesture(sentence.direction);
    setFeedback(sentence.message);
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }

    setTimeout(() => {
      setFeedback("");
      setCurrentGesture(null);
    }, 2000);
  };

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

  const goToNextAiPage = () => {
    if (aiSuggestionsPageIndex < aiSuggestionsTotalPages - 1) {
      setAiSuggestionsPageIndex(aiSuggestionsPageIndex + 1);
    }
  };

  const goToPrevAiPage = () => {
    if (aiSuggestionsPageIndex > 0) {
      setAiSuggestionsPageIndex(aiSuggestionsPageIndex - 1);
    }
  };

  const toggleMode = () => {
    setIsOfflineMode(!isOfflineMode);
    setApiError(null);

    if (isOfflineMode) {
      setAiSuggestions(null);
      setAiSuggestionsPageIndex(0);
    } else {
      setCurrentPageIndex(0);
      updateActiveSentences(0, sentencesData);
    }
  };

  const dismissError = () => {
    setApiError(null);
    setIsOfflineMode(true);
  };

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: aiPrompt }),
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`API a répondu avec un statut ${response.status}`);
      }

      const data = await response.json();
      console.log("Réponse de l'API:", data);

      if (data.success) {
        createExactlyTwoPages(data.sentences);
      } else {
        console.error("Error from GPT API:", data.error);
        setApiError(
          "Le service IA a renvoyé une erreur. Veuillez réessayer plus tard."
        );

        if (sentencesData.length > 0) {
          createFallbackSuggestions();
        }
      }
    } catch (error) {
      console.error("Failed to fetch AI suggestions:", error);

      if (error.name === "AbortError") {
        setApiError(
          "La requête a pris trop de temps. L'IA n'est pas accessible pour le moment."
        );
      } else if (error.message.includes("status")) {
        setApiError(
          "Le service IA a renvoyé une erreur. Veuillez réessayer plus tard."
        );
      } else {
        setApiError(
          "L'IA n'est pas accessible. Veuillez utiliser le mode hors ligne."
        );
      }

      if (sentencesData.length > 0) {
        createFallbackSuggestions();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const createExactlyTwoPages = (sentences) => {
    const directions = ["up", "down", "left", "right"];

    const validatedSentences = sentences.map((sentence, index) => {
      const validSentence = { ...sentence };

      if (validSentence.direction) {
        validSentence.direction = validSentence.direction.toLowerCase();
      } else {
        validSentence.direction = directions[index % directions.length];
      }

      if (!validSentence.id) {
        validSentence.id = `ai-${index}`;
      }

      return validSentence;
    });

    const organizedSuggestions = [];

    directions.forEach((direction) => {
      const matchingPhrase = validatedSentences.find(
        (s) =>
          s.direction === direction &&
          !organizedSuggestions.some((o) => o.id === s.id)
      );

      if (matchingPhrase) {
        organizedSuggestions.push({ ...matchingPhrase });
      } else {
        const template = validatedSentences[0] || {
          message: `Swipe ${direction} message`,
          id: `default-${direction}`,
        };

        organizedSuggestions.push({
          ...template,
          direction: direction,
          id: `page1-${direction}`,
        });
      }
    });

    directions.forEach((direction) => {
      const remainingSentences = validatedSentences.filter(
        (s) => !organizedSuggestions.some((o) => o.id === s.id)
      );

      const matchingPhrase = remainingSentences.find(
        (s) => s.direction === direction
      );

      if (matchingPhrase) {
        organizedSuggestions.push({ ...matchingPhrase });
      } else {
        const template = remainingSentences[0] ||
          validatedSentences[0] || {
            message: `Alternative ${direction} message`,
            id: `default-alt-${direction}`,
          };

        organizedSuggestions.push({
          ...template,
          direction: direction,
          id: `page2-${direction}`,
        });
      }
    });

    console.log(
      `Created exactly ${organizedSuggestions.length} organized suggestions`
    );
    console.log(`Page 1:`, organizedSuggestions.slice(0, 4));
    console.log(`Page 2:`, organizedSuggestions.slice(4, 8));

    setAiSuggestions({
      organizedSuggestions: organizedSuggestions,
    });
    setAiSuggestionsTotalPages(2);

    setAiSuggestionsPageIndex(0);
  };
  const createFallbackSuggestions = () => {
    const directions = ["up", "down", "left", "right"];
    const organizedMock = [];
    const randomSentences = sentencesData
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(8, sentencesData.length));
    directions.forEach((direction, index) => {
      const matchingPhrase = randomSentences.find(
        (s) =>
          s.direction.toLowerCase() === direction &&
          !organizedMock.some((o) => o.id === s.id)
      );

      if (matchingPhrase) {
        organizedMock.push({ ...matchingPhrase });
      } else {
        const template = randomSentences[index % randomSentences.length];
        organizedMock.push({
          ...template,
          direction: direction,
          id: `fallback1-${direction}`,
        });
      }
    });

    directions.forEach((direction) => {
      const remainingSentences = randomSentences.filter(
        (s) => !organizedMock.some((o) => o.id === s.id)
      );

      const matchingPhrase = remainingSentences.find(
        (s) => s.direction.toLowerCase() === direction
      );

      if (matchingPhrase) {
        organizedMock.push({ ...matchingPhrase });
      } else {
        const template = remainingSentences[0] || randomSentences[0];
        organizedMock.push({
          ...template,
          direction: direction,
          id: `fallback2-${direction}`,
        });
      }
    });

    console.log(`Created exactly ${organizedMock.length} fallback suggestions`);

    setAiSuggestions({
      organizedSuggestions: organizedMock,
    });
    setAiSuggestionsTotalPages(2);

    setAiSuggestionsPageIndex(0);
  };
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
          {/* API Error Message */}
          {apiError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <div className="flex-grow">
                <p className="text-red-700 font-medium">{apiError}</p>
                <p className="text-red-600 text-sm mt-1">
                  Le mode hors ligne va être activé automatiquement.
                </p>
              </div>
              <button
                onClick={dismissError}
                className="ml-3 bg-red-100 p-1 rounded-full hover:bg-red-200 transition-colors"
              >
                <X className="h-4 w-4 text-red-500" />
              </button>
            </div>
          )}

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

                    <div className="mb-4 flex justify-between items-center">
                      <button
                        onClick={() => setAiSuggestions(null)}
                        className="text-sm text-red-500 hover:text-red-700 flex items-center"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reset
                      </button>

                      <div className="text-sm text-indigo-600">
                        <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
                          Swipe to Use Selected Phrases
                        </span>
                      </div>
                    </div>

                    {/* New Pagination Controls for AI Suggestions */}
                    <div className="flex justify-between items-center mb-8">
                      <button
                        onClick={goToPrevAiPage}
                        disabled={aiSuggestionsPageIndex === 0}
                        className={`p-2 rounded-full ${
                          aiSuggestionsPageIndex === 0
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-indigo-600 hover:bg-indigo-50"
                        }`}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>

                      <span className="text-sm text-gray-500">
                        Page {aiSuggestionsPageIndex + 1} of{" "}
                        {aiSuggestionsTotalPages}
                      </span>

                      <button
                        onClick={goToNextAiPage}
                        disabled={
                          aiSuggestionsPageIndex === aiSuggestionsTotalPages - 1
                        }
                        className={`p-2 rounded-full ${
                          aiSuggestionsPageIndex === aiSuggestionsTotalPages - 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-indigo-600 hover:bg-indigo-50"
                        }`}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-x-10 justify-items-center">
                      {activeSentences.map((item) => {
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
