'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Setup() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950 p-4">
      <div className="container mx-auto max-w-4xl pt-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-purple-600 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Get Started with MusicAI</h1>
        
        <div className="grid gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Choose Your Plan</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 hover:border-purple-600 cursor-pointer transition-colors">
                <h3 className="font-semibold mb-2">Free Trial</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Perfect for trying out our AI features</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> 3 AI transformations
                    </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Basic editing tools
                  </li>
                </ul>
                <Button className="w-full">Start Free Trial</Button>
              </div>
              
              <div className="border rounded-lg p-4 hover:border-purple-600 cursor-pointer transition-colors">
                <h3 className="font-semibold mb-2">Pro Plan</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">For serious music creators</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Unlimited transformations
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Advanced editing tools
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Priority support
                  </li>
                </ul>
                <Button className="w-full">Choose Pro</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
} 