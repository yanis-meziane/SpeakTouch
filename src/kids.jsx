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
  Edit,
  Save,
  Move,
  X,
  Plus,
} from "lucide-react";

export default function SpeakTouchKidsApp() {
  // Define numColumns to use in move functionality
  const numColumns = 4; // For md:grid-cols-4

  const [communicationOptions, setCommunicationOptions] = useState(() => {
    const savedOptions = localStorage.getItem("communicationOptions");
    return savedOptions
      ? JSON.parse(savedOptions)
      : [
          {
            key: "play",
            icon: "Play",
            name: "I want to play",
            action: "I want to play",
            color: "bg-green-500",
            description: "Express your desire to play",
          },
          {
            key: "hungry",
            icon: "Coffee",
            name: "I'm Hungry",
            action: "I am hungry",
            color: "bg-orange-500",
            description: "Tell others you're hungry",
          },
          {
            key: "help",
            icon: "HelpCircle",
            name: "I need help",
            action: "I need help",
            color: "bg-blue-500",
            description: "Ask for assistance",
          },
          {
            key: "tired",
            icon: "Bed",
            name: "I'm Tired",
            action: "I am tired",
            color: "bg-purple-500",
            description: "Communicate your tiredness",
          },
          {
            key: "love",
            icon: "Heart",
            name: "I Love You",
            action: "I love you",
            color: "bg-pink-500",
            description: "Express your love",
          },
          {
            key: "drink",
            icon: "Smile",
            name: "I'm Thirsty",
            action: "I am thirsty",
            color: "bg-teal-500",
            description: "Request something to drink",
          },
          {
            key: "morning",
            icon: "Sun",
            name: "Good Morning",
            action: "Good morning",
            color: "bg-yellow-500",
            description: "Say good morning",
          },
          {
            key: "night",
            icon: "Moon",
            name: "Good Night",
            action: "Good night",
            color: "bg-indigo-500",
            description: "Say good night",
          },
        ];
  });

  const [activeGesture, setActiveGesture] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [editingOption, setEditingOption] = useState(null);
  const speechSynthesisRef = useRef(window.speechSynthesis);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Available icons for selection
  const iconOptions = {
    Play: <Play className="h-6 w-6" />,
    Coffee: <Coffee className="h-6 w-6" />,
    HelpCircle: <HelpCircle className="h-6 w-6" />,
    Bed: <Bed className="h-6 w-6" />,
    Heart: <Heart className="h-6 w-6" />,
    Smile: <Smile className="h-6 w-6" />,
    Sun: <Sun className="h-6 w-6" />,
    Moon: <Moon className="h-6 w-6" />,
    User: <User className="h-6 w-6" />,
    MessageSquare: <MessageSquare className="h-6 w-6" />,
    Hand: <Hand className="h-6 w-6" />,
  };

  // Available colors for selection
  const colorOptions = [
    { name: "Green", value: "bg-green-500" },
    { name: "Orange", value: "bg-orange-500" },
    { name: "Blue", value: "bg-blue-500" },
    { name: "Purple", value: "bg-purple-500" },
    { name: "Pink", value: "bg-pink-500" },
    { name: "Teal", value: "bg-teal-500" },
    { name: "Yellow", value: "bg-yellow-500" },
    { name: "Indigo", value: "bg-indigo-500" },
    { name: "Red", value: "bg-red-500" },
  ];

  // Save updated options to localStorage
  useEffect(() => {
    localStorage.setItem(
      "communicationOptions",
      JSON.stringify(communicationOptions)
    );
  }, [communicationOptions]);

  const speakGesture = (gesture) => {
    if (isEditing || isMoving) return;

    if (speechSynthesisRef.current.speaking) {
      speechSynthesisRef.current.cancel();
    }

    setActiveGesture(gesture.key);
    setIsSpeaking(true);

    // Check if speech synthesis is available
    if (!speechSynthesisRef.current) {
      console.error("Speech synthesis not available");
      // Reset the UI state after a delay
      setTimeout(() => {
        setActiveGesture(null);
        setIsSpeaking(false);
      }, 500);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(gesture.action);
    utterance.lang = "en-US";

    utterance.onend = () => {
      setTimeout(() => {
        setActiveGesture(null);
        setIsSpeaking(false);
      }, 500);
    };

    // Error handling for speech synthesis
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setActiveGesture(null);
      setIsSpeaking(false);
    };

    if (navigator.vibrate) {
      navigator.vibrate(100);
    }

    speechSynthesisRef.current.speak(utterance);

    // Fallback in case onend doesn't fire
    setTimeout(() => {
      if (isSpeaking && activeGesture === gesture.key) {
        setActiveGesture(null);
        setIsSpeaking(false);
      }
    }, 5000);
  };

  const handleMoveOption = (index, direction) => {
    const newOptions = [...communicationOptions];

    if (direction === "up" && index >= numColumns) {
      // Move up = swap with element numColumns positions before
      const targetIndex = index - numColumns;
      [newOptions[index], newOptions[targetIndex]] = [
        newOptions[targetIndex],
        newOptions[index],
      ];
    } else if (direction === "down" && index + numColumns < newOptions.length) {
      // Move down = swap with element numColumns positions after
      const targetIndex = index + numColumns;
      [newOptions[index], newOptions[targetIndex]] = [
        newOptions[targetIndex],
        newOptions[index],
      ];
    } else if (direction === "left" && index % numColumns !== 0) {
      // Move left = swap with previous element (if not first in row)
      const targetIndex = index - 1;
      [newOptions[index], newOptions[targetIndex]] = [
        newOptions[targetIndex],
        newOptions[index],
      ];
    } else if (
      direction === "right" &&
      (index + 1) % numColumns !== 0 &&
      index < newOptions.length - 1
    ) {
      // Move right = swap with next element (if not last in row and not last element)
      const targetIndex = index + 1;
      [newOptions[index], newOptions[targetIndex]] = [
        newOptions[targetIndex],
        newOptions[index],
      ];
    }

    setCommunicationOptions(newOptions);
  };

  const handleEditOption = () => {
    if (!editingOption) return;

    // If this is a new option, add it to the list
    if (
      !communicationOptions.some((option) => option.key === editingOption.key)
    ) {
      setCommunicationOptions([...communicationOptions, editingOption]);
    } else {
      // Otherwise update the existing option
      const updatedOptions = communicationOptions.map((option) =>
        option.key === editingOption.key ? editingOption : option
      );
      setCommunicationOptions(updatedOptions);
    }

    setEditingOption(null);
  };

  const handleDeleteOption = (key) => {
    setCommunicationOptions(
      communicationOptions.filter((option) => option.key !== key)
    );
  };

  const handleAddOption = () => {
    const newKey = `option_${Date.now()}`;
    const newOption = {
      key: newKey,
      icon: "MessageSquare",
      name: "New Button",
      action: "New Button", // Automatically use the same text as the name
      color: "bg-blue-500",
      description: "Description here",
    };

    setEditingOption(newOption); // Immediately open the edit modal for the new button
  };

  const renderIcon = (iconName) => {
    return iconOptions[iconName] || <MessageSquare className="h-6 w-6" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 transition-colors duration-300">
      <header className="bg-white shadow-sm py-4 px-4 md:px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-medium flex items-center">
              <Zap className="h-4 w-4 mr-1" />
              SpeakTouch Kids
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setIsEditing(!isEditing);
                setIsMoving(false);
                setEditingOption(null);
              }}
              className={`px-3 py-2 rounded-md text-sm flex items-center ${
                isEditing
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? "Exit Edit" : "Edit Buttons"}
            </button>

            <button
              onClick={() => {
                setIsMoving(!isMoving);
                setIsEditing(false);
                setEditingOption(null);
              }}
              className={`px-3 py-2 rounded-md text-sm flex items-center ${
                isMoving
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              <Move className="h-4 w-4 mr-2" />
              {isMoving ? "Exit Move" : "Move Buttons"}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8">
        <header className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Understand Your Children{" "}
            <span className="text-indigo-600">Clearly</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            An intuitive communication app designed to help children express
            their needs and feelings with ease.
          </p>
        </header>

        {editingOption && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Edit Button</h3>
                <button
                  onClick={() => setEditingOption(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Button Name (also used for speech)
                  </label>
                  <input
                    type="text"
                    value={editingOption.name}
                    onChange={(e) =>
                      setEditingOption({
                        ...editingOption,
                        name: e.target.value,
                        action: e.target.value, // Automatically update action to match name
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (Optional) Description
                  </label>
                  <input
                    type="text"
                    value={editingOption.description}
                    onChange={(e) =>
                      setEditingOption({
                        ...editingOption,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Short description (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {Object.keys(iconOptions).map((icon) => (
                      <div
                        key={icon}
                        onClick={() =>
                          setEditingOption({ ...editingOption, icon: icon })
                        }
                        className={`p-2 flex flex-col items-center justify-center border rounded-md cursor-pointer ${
                          editingOption.icon === icon
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-gray-300"
                        }`}
                      >
                        <div className="text-gray-700">{renderIcon(icon)}</div>
                        <span className="text-xs mt-1 text-center">{icon}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {colorOptions.map((color) => (
                      <div
                        key={color.value}
                        onClick={() =>
                          setEditingOption({
                            ...editingOption,
                            color: color.value,
                          })
                        }
                        className={`p-2 flex items-center justify-center border rounded-md cursor-pointer ${
                          editingOption.color === color.value
                            ? "border-indigo-600"
                            : "border-gray-300"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full ${color.value} mr-2`}
                        ></div>
                        <span className="text-sm">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    onClick={() => setEditingOption(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditOption}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {communicationOptions.map((gesture, index) => (
            <div
              key={gesture.key}
              onClick={() => {
                if (isEditing) {
                  setEditingOption({ ...gesture });
                } else if (!isMoving) {
                  speakGesture(gesture);
                }
              }}
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
                ${
                  !isEditing && !isMoving
                    ? "hover:scale-105 hover:shadow-xl cursor-pointer"
                    : ""
                }
                ${activeGesture === gesture.key ? "scale-105 shadow-xl" : ""}
              `}
            >
              <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
                {renderIcon(gesture.icon)}
              </div>

              <h3 className="text-lg font-semibold text-center">
                {gesture.name}
              </h3>

              <p className="text-xs text-white/70 text-center">
                {gesture.description}
              </p>

              {isMoving && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="grid grid-cols-3 grid-rows-3 gap-1">
                    <div className="col-start-1 row-start-1"></div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveOption(index, "up");
                      }}
                      className="col-start-2 row-start-1 bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </button>
                    <div className="col-start-3 row-start-1"></div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveOption(index, "left");
                      }}
                      className="col-start-1 row-start-2 bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <div className="col-start-2 row-start-2"></div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveOption(index, "right");
                      }}
                      className="col-start-3 row-start-2 bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>

                    <div className="col-start-1 row-start-3"></div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveOption(index, "down");
                      }}
                      className="col-start-2 row-start-3 bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div className="col-start-3 row-start-3"></div>
                  </div>
                </div>
              )}

              {isEditing && (
                <div className="absolute top-2 right-2 flex">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteOption(gesture.key);
                    }}
                    className="bg-red-500 text-white p-1 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {activeGesture === gesture.key && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Volume2 className="h-8 w-8 animate-pulse" />
                </div>
              )}
            </div>
          ))}

          {isEditing && (
            <div
              onClick={handleAddOption}
              className="bg-gray-200 text-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 cursor-pointer hover:bg-gray-300"
            >
              <div className="h-12 w-12 bg-white/50 rounded-full flex items-center justify-center">
                <Plus className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-center">Add Button</h3>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white py-6 px-4 md:px-6 mt-8">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} SpeakTouch Kids App</p>
        </div>
      </footer>
    </div>
  );
}
