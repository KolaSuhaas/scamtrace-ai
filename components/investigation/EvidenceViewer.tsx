"use client";

import {
  ScanText,
  AlertTriangle,
} from "lucide-react";

type Props = {
  message: string;
};

const evidencePattern =
  /(pay(?:ment)?|registration fee|₹\s?\d[\d,]*(?:\.\d+)?|within\s+\d+\s+(?:minutes?|hours?)|urgent|immediately|confirm your position|otp|password|account details|bank details)/gi;

function isSuspicious(text: string) {
  return /^(pay(?:ment)?|registration fee|₹\s?\d[\d,]*(?:\.\d+)?|within\s+\d+\s+(?:minutes?|hours?)|urgent|immediately|confirm your position|otp|password|account details|bank details)$/i.test(
    text
  );
}

function getEvidenceType(text: string) {
  const value = text.toLowerCase();

  if (
    value.includes("pay") ||
    value.includes("fee") ||
    value.includes("₹")
  ) {
    return "PAYMENT";
  }

  if (
    value.includes("within") ||
    value.includes("urgent") ||
    value.includes("immediately")
  ) {
    return "URGENCY";
  }

  if (
    value.includes("otp") ||
    value.includes("password") ||
    value.includes("account") ||
    value.includes("bank")
  ) {
    return "CREDENTIAL";
  }

  return "SUSPICIOUS";
}

export default function EvidenceViewer({
  message,
}: Props) {
  const parts = message.split(evidencePattern);

  const detectedCount = parts.filter(
    (part) => part && isSuspicious(part)
  ).length;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/8 bg-black/20">
      <div className="flex flex-col gap-4 border-b border-white/8 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/5">
            <ScanText className="h-4 w-4 text-cyan-300" />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-200">
              Message evidence
            </p>

            <p className="mt-0.5 text-xs text-slate-600">
              Suspicious phrases isolated from the submitted text.
            </p>
          </div>
        </div>

        <div className="w-fit rounded-full border border-amber-400/15 bg-amber-400/5 px-3 py-1 font-mono text-[10px] tracking-wider text-amber-300">
          {detectedCount} TEXT SIGNALS
        </div>
      </div>

      <div className="p-5 md:p-6">
        <div className="relative rounded-xl border border-white/5 bg-[#050b11] p-5">
          <div className="absolute left-0 top-5 h-8 w-[2px] rounded-full bg-cyan-300/60" />

          <p className="whitespace-pre-wrap text-[14px] leading-8 text-slate-400">
            {parts.map((part, index) => {
              if (!part) {
                return null;
              }

              if (!isSuspicious(part)) {
                return (
                  <span key={index}>
                    {part}
                  </span>
                );
              }

              const type = getEvidenceType(part);

              return (
                <span
                  key={index}
                  className="group relative mx-0.5 inline rounded-md border border-amber-300/20 bg-amber-300/10 px-1.5 py-0.5 text-amber-100"
                  title={type}
                >
                  {part}

                  <span className="ml-1 font-mono text-[8px] font-semibold tracking-wider text-amber-400/60">
                    {type}
                  </span>
                </span>
              );
            })}
          </p>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-xl border border-white/5 bg-white/[0.015] p-3">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-600" />

          <p className="text-[11px] leading-5 text-slate-600">
            Highlighted phrases are direct evidence matches from the
            submitted message. Their presence contributes context to the
            wider AI and risk-engine investigation.
          </p>
        </div>
      </div>
    </div>
  );
}
