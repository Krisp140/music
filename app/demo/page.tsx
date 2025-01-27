'use client';

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, UploadCloud, Music, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CldUploadWidget } from 'next-cloudinary';
import { voiceReferences } from '@/lib/voice-config';

interface UploadedFile {
  url: string;
  filename: string;
  secure_url: string;
}

export default function DemoPage() {
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [artist, setArtist] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [processingStatus, setProcessingStatus] = useState<string>("");


  const handleUpload = () => {
    return (
      <CldUploadWidget
        uploadPreset="ml_default"
        onSuccess={(result: any) => {
          if (result.info) {
            setFile({
              url: result.info.secure_url,
              filename: result.info.original_filename,
              secure_url: result.info.secure_url
            });
          }
        }}
      >
        {({ open }) => (
          <Button 
            onClick={() => open()}
            className="w-full flex items-center justify-center gap-2"
            variant="outline"
          >
            <UploadCloud className="h-6 w-6 text-purple-600" />
            {file ? file.filename : 'Choose a file'}
          </Button>
        )}
      </CldUploadWidget>
    );
  };

  const handleSubmit = async () => {
    if (!file || !artist || !lyrics) {
      alert("Please upload a file, select an artist, and enter lyrics.");
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post("/api/process-music", {
        file: file.url,
        artist: artist,
        lyrics: lyrics,
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      const predictionId = response.data.predictionId;
      
      // Poll for the result
      while (true) {
        const statusResponse = await axios.get(`/api/check-prediction?id=${predictionId}`);
        const prediction = statusResponse.data;

        if (prediction.status === "succeeded") {
          setResultUrl(prediction.output);
          break;
        } else if (prediction.status === "failed") {
          throw new Error(prediction.error || "Prediction failed");
        }

        setProcessingStatus(`Processing... (${prediction.status})`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

    } catch (error) {
      console.error("Error details:", error);
      setAudioError(
        error instanceof Error 
          ? error.message 
          : "Failed to process music. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAudioLoadStart = () => {
    setIsAudioLoading(true);
    setAudioError(null);
  };

  const handleAudioLoaded = () => {
    setIsAudioLoading(false);
  };

  const handleAudioError = () => {
    setIsAudioLoading(false);
    setAudioError("Failed to load audio. Please check the URL and try again.");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 px-4">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
      <Link href="/" className="inline-flex items-center text-gray-600 hover:text-purple-600 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
        🎶 AI Music Transformer 🎶
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Upload a song, choose an artist, and enter lyrics to transform your music.
        </p>

        {/* File Upload */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Upload Audio File</label>
          {handleUpload()}
        </div>

        {/* Artist Dropdown */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Select an Artist</label>
          <select
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>Select an artist</option>
            <option value={voiceReferences.ye}>Ye</option>
            <option value={voiceReferences.taylor}>Taylor Swift</option>
            <option value={voiceReferences.freddie}>Freddie Mercury</option>
          </select>
        </div>

        {/* Lyrics Input */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Enter Lyrics</label>
          <Textarea
            placeholder="Type lyrics here..."
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            className="w-full border rounded-lg p-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit} 
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <span className="animate-spin">⭕</span>
              {processingStatus || "Processing..."}
            </div>
          ) : (
            "Generate Music"
          )}
        </Button>

        {/* Display Result */}
        {resultUrl && (
          <div className="mt-6 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300">Your AI-generated song is ready!</p>
            {isAudioLoading && (
              <div className="flex justify-center items-center mt-4">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                <p className="ml-2">Loading audio...</p>
              </div>
            )}
            {audioError && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                {audioError}
              </div>
            )}
            <audio
              controls
              className="mt-4 w-full"
              onLoadStart={handleAudioLoadStart}
              onLoadedData={handleAudioLoaded}
              onError={handleAudioError}
            >
              <source src={resultUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </main>
  );
}