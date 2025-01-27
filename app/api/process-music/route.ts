import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { file, artist, lyrics } = body;
    console.log("Received request with:", { file, artist, lyrics });

    // First, get the model details
    const modelResponse = await fetch(
      "https://api.replicate.com/v1/models/minimax/music-01",
      {
        headers: {
          'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!modelResponse.ok) {
      const errorData = await modelResponse.json();
      console.error("Error fetching model:", errorData);
      throw new Error(`Failed to fetch model: ${JSON.stringify(errorData)}`);
    }

    const modelData = await modelResponse.json();
    //console.log("Model data:", modelData);
    
    // Use the latest version from the model data
    const latestVersion = modelData.latest_version.id;
    console.log("Using version:", latestVersion);

    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: latestVersion,
        input: {
          lyrics: lyrics,
          song_file: file,
          voice_file: artist
        }
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Replicate API error:", errorData);
      throw new Error(`Replicate API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log("Replicate initial response:", data);
    const predictionId = data.id;

    // Poll for the result
    let prediction = await getPredictionResult(predictionId);
    console.log("Initial prediction status:", prediction.status);
    
    let attempts = 0;
    const maxAttempts = 300; // Timeout after 300 seconds

    while (prediction.status !== "succeeded" && prediction.status !== "failed" && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      prediction = await getPredictionResult(predictionId);
      console.log(`Polling attempt ${attempts + 1}, status: ${prediction.status}`);
      attempts++;
    }

    if (attempts >= maxAttempts) {
      throw new Error("Prediction timed out");
    }

    if (prediction.status === "failed") {
      throw new Error(`Prediction failed: ${prediction.error || 'Unknown error'}`);
    }

    console.log("Final prediction result:", prediction);
    return NextResponse.json({ output: prediction.output });
  } catch (error) {
    console.error("Error processing music:", error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Failed to process music",
      details: error
    }, { status: 500 });
  }
}

async function getPredictionResult(predictionId: string) {
  const response = await fetch(
    `https://api.replicate.com/v1/predictions/${predictionId}`,
    {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      },
    }
  );
  return response.json();
}
