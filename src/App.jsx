import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Hand,
  Zap,
  Settings,
  Award,
  Heart,
  ArrowRight,
  Volume2,
  Moon,
  Bookmark,
  Clock,
  Wifi,
  User,
  GripHorizontal,
} from "lucide-react";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeGesture, setActiveGesture] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showGesture = (id) => {
    setActiveGesture(id);
    setTimeout(() => setActiveGesture(null), 2000);
  };

  const features = [
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Instant Response",
      description: "No delays. Immediate audio feedback.",
    },
    {
      icon: <Wifi className="h-5 w-5" />,
      title: "Offline Support",
      description: "Works anywhere, even without internet.",
    },
    {
      icon: <User className="h-5 w-5" />,
      title: "Customizable",
      description: "Adapt the interface to your preferences.",
    },
    {
      icon: <Volume2 className="h-5 w-5" />,
      title: "Clear Audio",
      description: "Natural-sounding Text-to-Speech voices.",
    },
  ];

  const gestures = [
    {
      id: "swipe-right",
      name: "Swipe Right",
      action: "I'm hungry",
      color: "bg-amber-500",
    },
    {
      id: "swipe-left",
      name: "Swipe Left",
      action: "Bathroom",
      color: "bg-blue-500",
    },
    {
      id: "double-tap",
      name: "Double Tap",
      action: "Thank you",
      color: "bg-green-500",
    },
    {
      id: "two-finger",
      name: "Two-finger Hold",
      action: "I need help",
      color: "bg-red-500",
    },
  ];

  const testimonials = [
    {
      quote:
        "This app has given my autistic son a voice. The simple gestures make communication so much easier for him.",
      author: "Maria K.",
      role: "Parent",
    },
    {
      quote:
        "After my stroke, I couldn't speak clearly. Tap to Talk helped me communicate basic needs to my caregivers.",
      author: "Robert J.",
      role: "User",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Navbar */}
      <nav
        className={`fixed w-full z-10 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-indigo-600">
            <Hand className="h-7 w-7" />
            <span className="text-xl font-bold">Tap to Talk</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-gray-600">
            <a href="#features" className="hover:text-indigo-600 transition">
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-indigo-600 transition"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="hover:text-indigo-600 transition"
            >
              Testimonials
            </a>
            <a
              href="#cta"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-5 rounded-full transition flex items-center space-x-1"
            >
              <span>Try Now</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <button className="md:hidden text-gray-600">
            <GripHorizontal className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="min-h-screen px-4 md:px-6 text-center flex items-center">
        <div className="container mx-auto max-w-4xl mt-10">
          <div className="flex justify-center mb-6">
            <span className="bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-medium flex items-center">
              <Zap className="h-4 w-4 mr-1" />
              Communication Simplified
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Express Yourself{" "}
            <span className="text-indigo-600">Without Words</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            A gesture-based communication app for nonverbal users — simple,
            fast, and accessible for everyone who needs an alternative way to
            communicate.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#cta"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-full transition flex items-center justify-center"
            >
              Get a demo
            </a>
            <a
              href="#how-it-works"
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-8 rounded-full transition flex items-center justify-center"
            >
              Learn More
            </a>
          </div>
        </div>
      </header>

      {/* App Preview Section */}
      <section className="py-16 bg-gradient-to-b from-white to-indigo-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 overflow-hidden">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/2">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Communication Made Simple
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Tap to Talk helps users express their needs and thoughts
                    through intuitive gestures, eliminating communication
                    barriers for:
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Elderly individuals with speech loss",
                      "Autistic children",
                      "Post-operative patients",
                      "Anyone with verbal communication challenges",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3">
                          <span className="text-sm">✓</span>
                        </span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full md:w-1/2 relative">
                  <div className="bg-indigo-600 rounded-2xl p-5 text-white shadow-lg transform rotate-1">
                    <h3 className="font-bold mb-3 text-lg flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Most Used Phrases
                    </h3>
                    <div className="space-y-3">
                      {[
                        "I'm thirsty",
                        "I need to rest",
                        "I'm feeling cold",
                        "Can you help me?",
                      ].map((phrase, index) => (
                        <div
                          key={index}
                          className="bg-indigo-700 rounded-lg p-3 flex justify-between items-center"
                        >
                          <span>{phrase}</span>
                          <Volume2 className="h-4 w-4 opacity-70" />
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

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Tap to Talk?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Designed with simplicity and accessibility at its core, our app
              offers powerful features while remaining easy to use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Communicating with Tap to Talk is intuitive and straightforward.
              Simple gestures trigger voice responses instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {gestures.map((gesture, index) => (
              <div
                key={index}
                className={`rounded-xl p-6 transition-all cursor-pointer ${
                  activeGesture === gesture.id
                    ? `${gesture.color} text-white transform scale-105`
                    : "bg-white border border-gray-200 hover:border-indigo-200"
                }`}
                onClick={() => showGesture(gesture.id)}
              >
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    activeGesture === gesture.id
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                >
                  {gesture.name}
                </h3>
                <div
                  className={`flex items-center text-sm font-medium ${
                    activeGesture === gesture.id
                      ? "text-white"
                      : "text-indigo-600"
                  }`}
                >
                  <ArrowRight className="h-4 w-4 mr-1" />
                  <span>"{gesture.action}"</span>
                </div>
                <div className="mt-4 text-sm">
                  {activeGesture === gesture.id ? (
                    <span className="animate-pulse">Playing audio...</span>
                  ) : (
                    <span
                      className={
                        activeGesture === gesture.id
                          ? "text-white"
                          : "text-gray-500"
                      }
                    >
                      Tap to demo
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="#features"
              className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition"
            >
              <span>See all available gestures</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our app has already made a difference in many lives. Here's what
              our users have to share.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 shadow-sm border border-indigo-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="h-5 w-5 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Try Tap to Talk?</h2>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-10">
            Join thousands of users who have found a new way to express
            themselves. Start communicating more effectively today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#"
              className="bg-white text-indigo-600 hover:bg-indigo-50 font-medium py-3 px-8 rounded-full transition flex items-center justify-center"
            >
              Get Started Now
            </a>
            <a
              href="#features"
              className="bg-transparent border border-white hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-full transition flex items-center justify-center"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-indigo-600 mb-6 md:mb-0">
              <Hand className="h-6 w-6" />
              <span className="text-lg font-bold">Tap to Talk</span>
            </div>

            <div className="flex space-x-6 text-gray-500 mb-6 md:mb-0">
              <a href="#" className="hover:text-indigo-600 transition">
                Privacy
              </a>
              <a href="#" className="hover:text-indigo-600 transition">
                Terms
              </a>
              <a href="#" className="hover:text-indigo-600 transition">
                Support
              </a>
            </div>

            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-600 transition"
              >
                <Settings className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-600 transition"
              >
                <Moon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-600 transition"
              >
                <Bookmark className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p className="flex items-center justify-center">
              Built with <Heart className="h-4 w-4 text-red-500 mx-1" /> for
              inclusive communication
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
