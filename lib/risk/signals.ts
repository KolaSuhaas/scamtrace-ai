export type SignalKey =
  | "PAYMENT_REQUEST"
  | "CREDENTIAL_REQUEST"
  | "URGENCY"
  | "IMPERSONATION"
  | "DOMAIN_MISMATCH"
  | "SALARY_ANOMALY"
  | "SUSPICIOUS_LANGUAGE";

export const SIGNAL_WEIGHTS: Record<SignalKey, number> = {
  PAYMENT_REQUEST: 30,
  CREDENTIAL_REQUEST: 30,
  URGENCY: 15,
  IMPERSONATION: 15,
  DOMAIN_MISMATCH: 20,
  SALARY_ANOMALY: 10,
  SUSPICIOUS_LANGUAGE: 10,
};

export function detectMessageSignals(message: string): SignalKey[] {
  const signals: SignalKey[] = [];
  const text = message.toLowerCase();

  // Payment request:
  // Require an actual payment phrase, currency symbol,
  // or currency abbreviation with an amount.
  if (
    /\b(pay|payment|registration fee|processing fee|security deposit|deposit)\b/i.test(
      text
    ) ||
    /₹\s?\d[\d,]*/i.test(text) ||
    /\brs\.?\s?\d[\d,]*/i.test(text) ||
    /\binr\s?\d[\d,]*/i.test(text)
  ) {
    signals.push("PAYMENT_REQUEST");
  }

  // Sensitive credential requests
  if (
    /\b(otp|password|pin|cvv|bank details|account number|debit card details|credit card details)\b/i.test(
      text
    )
  ) {
    signals.push("CREDENTIAL_REQUEST");
  }

  // Actual pressure / artificial urgency
  if (
    /\b(urgent|immediately|limited time|act now|today only)\b/i.test(
      text
    ) ||
    /\bwithin\s+\d+\s+(minutes?|hours?)\b/i.test(text)
  ) {
    signals.push("URGENCY");
  }

  // Highly suspicious recruitment claims
  if (
    /\b(guaranteed job|guaranteed internship|selected without interview|100% placement)\b/i.test(
      text
    )
  ) {
    signals.push("SUSPICIOUS_LANGUAGE");
  }

  return signals;
}
