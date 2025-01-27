import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { file, artist, lyrics } = body;

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
      throw new Error(`Failed to fetch model: ${JSON.stringify(errorData)}`);
    }

    const modelData = await modelResponse.json();
    const latestVersion = modelData.latest_version.id;

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
      throw new Error(`Replicate API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return NextResponse.json({ predictionId: data.id });
  } catch (error) {
    console.error("Error processing music:", error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Failed to process music",
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
