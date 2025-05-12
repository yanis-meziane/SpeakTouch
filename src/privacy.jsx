import React from "react";
import Navbar from "./components/Navbar";
import { ShieldCheck, FileText, Lock } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Navbar />

      <header className="px-4 md:px-6 py-20 text-center">
        <div className="container mx-auto max-w-3xl mb-6 mt-16">
          <div className="flex justify-center mb-4">
            <span className="bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-medium flex items-center">
              <ShieldCheck className="h-4 w-4 mr-1" />
              Your Privacy Matters
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            We value your trust. Learn how SpeakTouch collects, uses, and
            protects your data.
          </p>
        </div>
      </header>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
              <Lock className="h-5 w-5 mr-2 text-indigo-600" />
              What We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed">
              SpeakTouch collects minimal data necessary to deliver our
              services. This may include:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Basic device information (for offline support)</li>
              <li>Gesture usage patterns (for improving UX)</li>
              <li>
                No personal identifiers, unless you explicitly provide them
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-indigo-600" />
              How We Use Data
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use collected data solely to improve app performance and user
              experience. Your data is:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Never sold or shared with third parties</li>
              <li>Stored locally on your device whenever possible</li>
              <li>Used to improve voice feedback accuracy</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-indigo-600" />
              Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You have full control over your data. You can:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Delete your app data anytime</li>
              <li>Disable usage tracking in settings</li>
              <li>Contact us for data inquiries</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 bg-indigo-600 text-white">
        <div className="container mx-auto text-center px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
          <p className="text-indigo-100 mb-6">
            Reach out to us and we'll be happy to help you understand how we
            handle your information.
          </p>
          <a
            href="mailto:support@speaktouch.app"
            className="bg-white text-indigo-600 hover:bg-indigo-100 font-medium py-3 px-8 rounded-full transition"
          >
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}
