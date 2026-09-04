export interface AIAnalysisResponse {
  claimedOrganization: string;
  summary: string;

  signals: {
    category: string;
    title: string;
    evidence: string;
    explanation: string;
    confidence: number;
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  }[];

  attackObjective: string;
  recommendations: string[];
}

export function parseAIResponse(
  rawResponse: string
): AIAnalysisResponse {
  try {
    let cleaned = rawResponse.trim();

    cleaned = cleaned
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/, "")
      .replace(/\s*```$/, "");

    const parsed = JSON.parse(cleaned);

    if (
      typeof parsed.claimedOrganization !== "string" ||
      typeof parsed.summary !== "string" ||
      !Array.isArray(parsed.signals) ||
      typeof parsed.attackObjective !== "string" ||
      !Array.isArray(parsed.recommendations)
    ) {
      throw new Error("AI response has an invalid structure");
    }

    return parsed;
  } catch (error) {
    console.error("Failed to parse AI response:", error);

    throw new Error(
      "CHAKSH could not understand the AI response"
    );
  }
}
