"use client";

import {
  AlertTriangle,
  BadgeDollarSign,
  KeyRound,
  Link2,
  UserRoundCheck,
  Timer,
  ShieldAlert,
} from "lucide-react";

import type { RiskSignal } from "@/types/analysis";

type Props = {
  signal: RiskSignal;
};

function normalizeConfidence(value: number) {
  if (!Number.isFinite(value)) return 0;

  const normalized = value <= 1 ? value * 100 : value;

  return Math.min(100, Math.max(0, Math.round(normalized)));
}

function getIcon(signal: RiskSignal) {
  const text =
    `${signal.category} ${signal.title}`.toLowerCase();

  if (text.includes("payment")) return BadgeDollarSign;
  if (text.includes("credential")) return KeyRound;
  if (text.includes("urgency")) return Timer;
  if (text.includes("domain") || text.includes("url")) return Link2;
  if (text.includes("impersonation")) return UserRoundCheck;

  return ShieldAlert;
}

const severityStyles = {
  LOW: {
    border: "border-emerald-400/15",
    bg: "bg-emerald-400/[0.025]",
    text: "text-emerald-300",
    bar: "bg-emerald-300",
  },
  MEDIUM: {
    border: "border-yellow-400/15",
    bg: "bg-yellow-400/[0.025]",
    text: "text-yellow-300",
    bar: "bg-yellow-300",
  },
  HIGH: {
    border: "border-orange-400/15",
    bg: "bg-orange-400/[0.025]",
    text: "text-orange-300",
    bar: "bg-orange-300",
  },
  CRITICAL: {
    border: "border-red-400/15",
    bg: "bg-red-400/[0.025]",
    text: "text-red-300",
    bar: "bg-red-300",
  },
};

export default function SignalCard({ signal }: Props) {
  const confidence = normalizeConfidence(signal.confidence);
  const style = severityStyles[signal.severity];
  const Icon = getIcon(signal);

  return (
    <article
      className={`relative overflow-hidden rounded-2xl border ${style.border} ${style.bg} p-4 md:p-5`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${style.border} bg-black/20`}
          >
            <Icon className={`h-4 w-4 ${style.text}`} />
          </div>

          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-slate-600">
              {signal.category}
            </p>

            <h4 className="mt-1 text-sm font-semibold text-white">
              {signal.title}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`rounded-full border px-3 py-1 font-mono text-[10px] font-semibold tracking-wider ${style.border} ${style.text}`}
          >
            {signal.severity}
          </div>

          <div className="text-right">
            <p className="font-mono text-sm font-semibold text-cyan-300">
              {confidence}%
            </p>

            <p className="text-[9px] uppercase tracking-wider text-slate-600">
              confidence
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-1 overflow-hidden rounded-full bg-white/5">
          <div
            className={`h-full rounded-full ${style.bar}`}
            style={{
              width: `${confidence}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-white/5 bg-black/20 p-4">
        <div className="flex items-start gap-2">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-600" />

          <div>
            <p className="text-[10px] font-semibold tracking-[0.16em] text-slate-600">
              EVIDENCE
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-200">
              “{signal.evidence}”
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-white/5 pt-4">
        <p className="text-[10px] font-semibold tracking-[0.16em] text-slate-600">
          WHY THIS MATTERS
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          {signal.explanation}
        </p>
      </div>
    </article>
  );
}
