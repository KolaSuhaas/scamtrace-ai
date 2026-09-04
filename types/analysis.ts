export type RiskLevel =
  | "LOW"
  | "MODERATE"
  | "HIGH"
  | "CRITICAL";

export interface RiskSignal {
  category: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  title: string;
  evidence: string;
  explanation: string;
  confidence: number;
}

export interface InvestigationResult {
  claimedOrganization: string;
  score: number;
  level: RiskLevel;
  summary: string;
  signals: RiskSignal[];
  attackObjective: string;
  recommendations: string[];
}
