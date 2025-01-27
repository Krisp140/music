import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const predictionId = req.nextUrl.searchParams.get('id');
  
  if (!predictionId) {
    return NextResponse.json({ error: "Prediction ID is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.replicate.com/v1/predictions/${predictionId}`,
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        },
      }
    );

    const prediction = await response.json();
    return NextResponse.json(prediction);
  } catch (error) {
    return NextResponse.json({ error: "Failed to check prediction status" }, { status: 500 });
  }
} 