import { calculateRiskScore } from "./scoring";
import type { SignalKey } from "./signals";
import type { RiskLevel } from "@/types/analysis";

export function getRiskLevel(score: number): RiskLevel {
  if (score >= 80) return "CRITICAL";
  if (score >= 60) return "HIGH";
  if (score >= 30) return "MODERATE";

  return "LOW";
}

export function evaluateRisk(signals: SignalKey[]) {
  const score = calculateRiskScore(signals);
  const level = getRiskLevel(score);

  return {
    score,
    level,
  };
}
