import { NextResponse } from "next/server";
import { callFeatherless } from "@/lib/ai/featherless";
import {
  SCAM_ANALYSIS_SYSTEM_PROMPT,
  buildScamAnalysisPrompt,
} from "@/lib/ai/prompt";
import { parseAIResponse } from "@/lib/ai/parser";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { message, url } = body;

    if (!message) {
      return NextResponse.json(
        {
          error: "Message is required",
        },
        {
          status: 400,
        }
      );
    }

    const userPrompt = buildScamAnalysisPrompt(
      message,
      url
    );

    const rawAIResponse = await callFeatherless(
      SCAM_ANALYSIS_SYSTEM_PROMPT,
      userPrompt
    );

    const analysis = parseAIResponse(rawAIResponse);

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error("CHAKSH analysis error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "AI analysis failed",
      },
      {
        status: 500,
      }
    );
  }
}
