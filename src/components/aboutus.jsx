import React from 'react';
import { MessageSquare, Award, Heart, Send, BarChart2, Github, Mail, Globe } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-indigo-600 py-16 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Building touch-based communication technology for everyone
          </p>
        </div>
      </header>

      {/* Who We Are Section */}
      <section className="py-16 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800">Who We Are</h2>
          <p className="text-lg mb-6 text-gray-700">
            We are a passionate team of young innovators dedicated to creating inclusive technology that makes communication more accessible for everyone. Our project, Haptic Language Builder, was born during a 6-week summer innovation program at TalTech University in Estonia, where we combined empathy, creativity, and technology to solve a real-world problem.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 bg-indigo-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Heart className="text-red-500 mr-4" size={36} />
              <h2 className="text-3xl font-bold text-indigo-800">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-700">
              To empower individuals who are blind, nonverbal, or have communication difficulties by providing a simple and intuitive way to express essential needs and feelings through touch-based technology.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800">The Problem</h2>
          <p className="text-lg mb-6 text-gray-700">
            Millions of people around the world face challenges communicating due to conditions such as:
          </p>
          <ul className="list-disc pl-8 mb-6 text-lg text-gray-700 space-y-2">
            <li>Visual impairments</li>
            <li>Speech disabilities</li>
            <li>Autism spectrum disorders</li>
            <li>Age-related loss of speech or motor control</li>
          </ul>
          <p className="text-lg text-gray-700">
            These individuals often rely on caregivers or struggle with communication barriers that can affect their independence and well-being.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <MessageSquare className="text-indigo-600 mr-4" size={36} />
              <h2 className="text-3xl font-bold text-indigo-800">Our Solution</h2>
            </div>
            <p className="text-lg mb-6 text-gray-700">
              Haptic Language Builder is a touch-based communication tool designed to:
            </p>
            <ul className="list-disc pl-8 mb-6 text-lg text-gray-700 space-y-2">
              <li>Translate simple tactile inputs (touches) into distinct vibration patterns.</li>
              <li>Optionally play audio cues to reinforce the message.</li>
              <li>Provide users with a dignified, silent, and quick way to communicate essential phrases.</li>
            </ul>
            <p className="text-lg mb-6 text-gray-700">
              Users can express phrases like:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {["Help", "Yes", "No", "I am hungry"].map((phrase, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4 text-center text-gray-800 font-medium">
                  {phrase}
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-700">
              Our current version is a basic prototype that runs on a local server (installed with git), featuring accessible buttons and swiping motions, each connected to a different haptic pattern and phrase.
            </p>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-16 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800">Why It Matters</h2>
          <p className="text-lg text-gray-700">
            Our project was inspired by a real personal story: a beloved grandmother who lost her ability to speak. That moment drove us to imagine a tool that could restore a voice—not through sound, but through touch. This project represents not only technological creativity, but also deep human connection and care.
          </p>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Award className="text-yellow-500 mr-4" size={36} />
              <h2 className="text-3xl font-bold text-indigo-800">Achievements</h2>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500">
              <p className="text-lg font-medium text-gray-800">
                🏆 Winner at the TalTech Summer Innovation Challenge 2025 — recognized for its social impact, originality, and feasibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Next Section */}
      <section className="py-16 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <BarChart2 className="text-green-500 mr-4" size={36} />
            <h2 className="text-3xl font-bold text-indigo-800">What's Next</h2>
          </div>
          <p className="text-lg mb-6 text-gray-700">
            We're committed to expanding the tool with:
          </p>
          <ul className="list-disc pl-8 mb-6 text-lg text-gray-700 space-y-2">
            <li>More customizable phrases</li>
            <li>Wearable integration</li>
            <li>Multilingual and icon-based UI</li>
            <li>Larger-scale testing with communities in need</li>
            <li>Making it accessible publicly</li>
          </ul>
          <p className="text-lg text-gray-700">
            We're currently seeking partners, testers, and supporters who believe in accessible innovation.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Send className="text-white mr-4" size={36} />
              <h2 className="text-3xl font-bold">Contact Us</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="mr-4" size={24} />
                <p className="text-lg">support@speaktouch.com</p>
              </div>
              <div className="flex items-center">
                <Globe className="mr-4" size={24} />
                <p className="text-lg">speaktouch.com</p>
              </div>
              <div className="flex items-center">
                <Github className="mr-4" size={24} />
                <p className="text-lg">github user</p>
              </div>
            </div>
            <div className="mt-8 text-xl font-medium">
              <p>🤝 Let's build a world where everyone can be heard — in their own way</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}