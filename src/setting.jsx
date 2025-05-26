import React, { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  Volume2,
  VolumeX,
  Globe,
  Save,
  RotateCcw,
  Check,
  ChevronDown,
  User,
  Palette,
  Moon,
  Sun,
} from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Settings() {
  // États pour les paramètres
  const [settings, setSettings] = useState({
    language: "en",
    volume: 80,
    voiceRate: 1,
    voicePitch: 1,
    theme: "light",
    autoSave: true,
  });

  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [testSpeaking, setTestSpeaking] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);

  // Langues disponibles
  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
  ];

  // Messages de test par langue
  const testMessages = {
    en: "Hello, this is a test of the speech synthesis.",
    fr: "Bonjour, ceci est un test de la synthèse vocale.",
    es: "Hola, esta es una prueba de la síntesis de voz.",
    de: "Hallo, das ist ein Test der Sprachsynthese.",
    it: "Ciao, questo è un test della sintesi vocale.",
  };

  // Charger les paramètres depuis le stockage local au montage
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("speakTouchSettings") || "{}");
    setSettings(prevSettings => ({ ...prevSettings, ...savedSettings }));
  }, []);

  // Fonction pour sauvegarder les paramètres
  const saveSettings = () => {
    localStorage.setItem("speakTouchSettings", JSON.stringify(settings));
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  // Fonction pour tester la voix
  const testVoice = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    setTestSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(testMessages[settings.language]);
    utterance.lang = settings.language === "en" ? "en-US" : settings.language;
    utterance.volume = settings.volume / 100;
    utterance.rate = settings.voiceRate;
    utterance.pitch = settings.voicePitch;

    utterance.onend = () => {
      setTestSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Fonction pour réinitialiser les paramètres
  const resetSettings = () => {
    const defaultSettings = {
      language: "en",
      volume: 80,
      voiceRate: 1,
      voicePitch: 1,
      theme: "light",
      autoSave: true,
    };
    setSettings(defaultSettings);
  };

  // Gestion des changements de paramètres
  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    if (settings.autoSave) {
      setTimeout(() => {
        localStorage.setItem("speakTouchSettings", JSON.stringify({ ...settings, [key]: value }));
      }, 500);
    }
  };

  return (
    <div className={`min-h-screen ${settings.theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-b from-indigo-50 to-white'}`}>
      <Navbar />

      <header className="px-4 md:px-6 py-20 text-center">
        <div className="container mx-auto max-w-3xl mb-6 mt-16">
          <div className="flex justify-center mb-4">
            <span className={`${settings.theme === 'dark' ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'} px-4 py-1 rounded-full text-sm font-medium flex items-center`}>
              <SettingsIcon className="h-4 w-4 mr-1" />
              Settings
            </span>
          </div>
          <h1 className={`text-4xl font-extrabold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
            Paramètres SpeakTouch
          </h1>
          <p className={`text-lg ${settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Personnalisez votre expérience de communication
          </p>
        </div>
      </header>

      <main className={`py-16 ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          
          {/* Message de sauvegarde */}
          {savedMessage && (
            <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center">
              <Check className="h-5 w-5 mr-2" />
              Paramètres sauvegardés avec succès !
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Section Langue */}
            <div className={`${settings.theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-xl p-6 shadow-lg border ${settings.theme === 'dark' ? 'border-gray-600' : 'border-gray-100'}`}>
              <h2 className={`text-2xl font-bold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
                <Globe className="h-6 w-6 mr-2 text-indigo-600" />
                Langue
              </h2>
              
              <div className="space-y-4">
                <div className="relative">
                  <label className={`block ${settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
                    Langue de l'interface
                  </label>
                  <button
                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                    className={`w-full ${settings.theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'} border rounded-lg px-4 py-3 flex items-center justify-between hover:border-indigo-300 transition`}
                  >
                    <span className="flex items-center">
                      <span className="mr-2 text-xl">
                        {languages.find(l => l.code === settings.language)?.flag}
                      </span>
                      {languages.find(l => l.code === settings.language)?.name}
                    </span>
                    <ChevronDown className={`h-5 w-5 transform transition ${showLanguageDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showLanguageDropdown && (
                    <div className={`absolute top-full left-0 right-0 mt-1 ${settings.theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-200'} border rounded-lg shadow-lg z-10`}>
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            handleSettingChange('language', lang.code);
                            setShowLanguageDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:${settings.theme === 'dark' ? 'bg-gray-500' : 'bg-indigo-50'} flex items-center ${settings.language === lang.code ? (settings.theme === 'dark' ? 'bg-gray-500' : 'bg-indigo-50') : ''} first:rounded-t-lg last:rounded-b-lg transition`}
                        >
                          <span className="mr-3 text-xl">{lang.flag}</span>
                          <span className={settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}>{lang.name}</span>
                          {settings.language === lang.code && (
                            <Check className="h-4 w-4 ml-auto text-indigo-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={testVoice}
                  disabled={testSpeaking}
                  className={`w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 rounded-lg transition flex items-center justify-center ${testSpeaking ? 'cursor-not-allowed' : ''}`}
                >
                  {testSpeaking ? (
                    <>
                      <Volume2 className="h-5 w-5 mr-2 animate-pulse" />
                      Test en cours...
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-5 w-5 mr-2" />
                      Tester la voix
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Section Audio */}
            <div className={`${settings.theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-xl p-6 shadow-lg border ${settings.theme === 'dark' ? 'border-gray-600' : 'border-gray-100'}`}>
              <h2 className={`text-2xl font-bold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
                <Volume2 className="h-6 w-6 mr-2 text-indigo-600" />
                Audio
              </h2>
              
              <div className="space-y-6">
                {/* Volume */}
                <div>
                  <label className={`block ${settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-2 flex items-center justify-between`}>
                    <span>Volume</span>
                    <span className="text-indigo-600 font-medium">{settings.volume}%</span>
                  </label>
                  <div className="flex items-center space-x-3">
                    <VolumeX className={`h-4 w-4 ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={settings.volume}
                      onChange={(e) => handleSettingChange('volume', parseInt(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <Volume2 className={`h-4 w-4 ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                </div>

                {/* Vitesse de parole */}
                <div>
                  <label className={`block ${settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-2 flex items-center justify-between`}>
                    <span>Vitesse de parole</span>
                    <span className="text-indigo-600 font-medium">{settings.voiceRate}x</span>
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={settings.voiceRate}
                    onChange={(e) => handleSettingChange('voiceRate', parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Tonalité */}
                <div>
                  <label className={`block ${settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-2 flex items-center justify-between`}>
                    <span>Tonalité</span>
                    <span className="text-indigo-600 font-medium">{settings.voicePitch}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={settings.voicePitch}
                    onChange={(e) => handleSettingChange('voicePitch', parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Section Apparence */}
            <div className={`${settings.theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-xl p-6 shadow-lg border ${settings.theme === 'dark' ? 'border-gray-600' : 'border-gray-100'}`}>
              <h2 className={`text-2xl font-bold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
                <Palette className="h-6 w-6 mr-2 text-indigo-600" />
                Apparence
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className={`block ${settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-3`}>
                    Thème
                  </label>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleSettingChange('theme', 'light')}
                      className={`flex-1 p-3 rounded-lg border-2 transition ${
                        settings.theme === 'light' 
                          ? 'border-indigo-600 bg-indigo-50' 
                          : 'border-gray-300 hover:border-indigo-300'
                      } ${settings.theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white'}`}
                    >
                      <Sun className={`h-5 w-5 mx-auto mb-1 ${settings.theme === 'light' ? 'text-indigo-600' : (settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-500')}`} />
                      <span className={`text-sm ${settings.theme === 'light' ? 'text-indigo-600 font-medium' : (settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700')}`}>
                        Clair
                      </span>
                    </button>
                    <button
                      onClick={() => handleSettingChange('theme', 'dark')}
                      className={`flex-1 p-3 rounded-lg border-2 transition ${
                        settings.theme === 'dark' 
                          ? 'border-indigo-600 bg-indigo-900' 
                          : 'border-gray-300 hover:border-indigo-300 bg-white'
                      }`}
                    >
                      <Moon className={`h-5 w-5 mx-auto mb-1 ${settings.theme === 'dark' ? 'text-indigo-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${settings.theme === 'dark' ? 'text-indigo-400 font-medium' : 'text-gray-700'}`}>
                        Sombre
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Préférences */}
            <div className={`${settings.theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-xl p-6 shadow-lg border ${settings.theme === 'dark' ? 'border-gray-600' : 'border-gray-100'}`}>
              <h2 className={`text-2xl font-bold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
                <User className="h-6 w-6 mr-2 text-indigo-600" />
                Préférences
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-medium ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Sauvegarde automatique
                    </h3>
                    <p className={`text-sm ${settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      Sauvegarder automatiquement les paramètres
                    </p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('autoSave', !settings.autoSave)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                      settings.autoSave ? 'bg-indigo-600' : (settings.theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200')
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={saveSettings}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-full transition flex items-center justify-center"
            >
              <Save className="h-5 w-5 mr-2" />
              Sauvegarder les paramètres
            </button>
            
            <button
              onClick={resetSettings}
              className={`${settings.theme === 'dark' ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-white hover:bg-gray-50 text-gray-700'} border ${settings.theme === 'dark' ? 'border-gray-500' : 'border-gray-300'} font-medium py-3 px-8 rounded-full transition flex items-center justify-center`}
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Réinitialiser
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}