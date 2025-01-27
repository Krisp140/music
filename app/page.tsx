'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MicVocal, Sparkles, Image, Wand2, ChevronRight } from "lucide-react";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950 pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 py-4">
            Transform Your Music with AI Magic 🎵
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Create realistic professional remixes in seconds with our advanced AI technology.
              No experience needed.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/setup">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Try For Free <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
             
                <Button size="lg" variant="outline">
                  View Examples
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="container mx-auto px-4 mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-0 shadow-lg">
              <MicVocal className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Professional Results</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get studio-quality tracks with just a few clicks
              </p>
            </Card>
            <Card className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-0 shadow-lg">
              <Sparkles className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Editing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Advanced AI algorithms enhance your songs automatically
              </p>
            </Card>
            <Card className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-0 shadow-lg">
              <Wand2 className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">One-Click Magic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Transform your songs instantly with magical presets
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            See the Magic in Action
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "/artist1.jpg",
              "/artist2.jpg",
              "/freddie2.jpeg"
            ].map((img, index) => (
              <div key={index} className="relative group overflow-hidden rounded-xl">
                <img
                  src={`${img}?auto=format&fit=crop&w=800&q=80`}
                  alt={`Example ${index + 1}`}
                  className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Button variant="secondary" className="w-full">
                      Try This Artist
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Music Taste?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of music enthusiasts who are already creating stunning remixes with our AI technology.
            </p>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Get Started Now <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-950 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <MicVocal className="h-8 w-8 text-purple-600 mr-2" />
              <span className="text-xl font-bold">MusicAI</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-purple-600 dark:text-gray-300">About</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 dark:text-gray-300">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 dark:text-gray-300">Terms</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 dark:text-gray-300">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}