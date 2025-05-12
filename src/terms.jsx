import React from "react";
import Navbar from "./components/Navbar";
import { ShieldCheck, FileText, Gavel } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Navbar />

      <header className="px-4 md:px-6 py-20 text-center">
        <div className="container mx-auto max-w-3xl mb-6 mt-16">
          <div className="flex justify-center mb-4">
            <span className="bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-medium flex items-center">
              <Gavel className="h-4 w-4 mr-1" />
              Terms of Use
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-gray-600">
            By using SpeakTouch, you agree to the following terms and
            conditions.
          </p>
        </div>
      </header>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-indigo-600" />
              Use of the App
            </h2>
            <p className="text-gray-700 leading-relaxed">
              SpeakTouch is intended to help users communicate through gestures
              and speech synthesis. You agree to use the app only for lawful and
              respectful purposes.
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Do not misuse or reverse-engineer the app</li>
              <li>
                Respect others while using SpeakTouch in public or shared spaces
              </li>
              <li>Do not use SpeakTouch to harass or harm others</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-indigo-600" />
              Intellectual Property
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All content and code in SpeakTouch is protected by copyright and
              intellectual property laws.
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>You may not copy or distribute the app without permission</li>
              <li>SpeakTouch’s brand and name are trademarks of Axionis</li>
              <li>
                Custom gestures or features you create remain your property
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-indigo-600" />
              Liability & Updates
            </h2>
            <p className="text-gray-700 leading-relaxed">
              SpeakTouch is provided “as is.” While we strive for a smooth
              experience, we are not liable for:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Any issues caused by misuse or unsupported devices</li>
              <li>Loss of data due to app updates or errors</li>
              <li>Third-party software conflicts</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We may update these terms at any time. Continued use of the app
              implies acceptance of future updates.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-indigo-600 text-white">
        <div className="container mx-auto text-center px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-4">Need Clarification?</h2>
          <p className="text-indigo-100 mb-6">
            If you have any questions about these terms, feel free to reach out
            to us.
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
