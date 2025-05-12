import { Zap, Settings, Bookmark, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-indigo-600 mb-6 md:mb-0">
            <Zap className="h-6 w-6" />
            <span className="text-lg font-bold">SpeakTouch</span>
          </div>

          <div className="flex space-x-6 text-gray-500 mb-6 md:mb-0">
            <a href="/privacy" className="hover:text-indigo-600 transition">
              Privacy
            </a>
            <a href="/terms" className="hover:text-indigo-600 transition">
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
  );
}
