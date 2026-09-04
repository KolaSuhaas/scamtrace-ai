import {
  SIGNAL_WEIGHTS,
  type SignalKey,
} from "./signals";

export function calculateRiskScore(
  detectedSignals: SignalKey[]
): number {
  const totalScore = detectedSignals.reduce(
    (score, signal) => {
      return score + SIGNAL_WEIGHTS[signal];
    },
    0
  );

  return Math.min(totalScore, 100);
}
