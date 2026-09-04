"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Check,
  FileSearch,
  Link2,
  Radar,
  ScanSearch,
} from "lucide-react";

type Props = {
  aiFinished: boolean;
  hasUrl: boolean;
  onComplete: () => void;
};

const stages = [
  {
    title: "Message ingested",
    detail: "Parsing submitted evidence",
    icon: FileSearch,
  },
  {
    title: "URL inspected",
    detail: "Extracting domain and protocol signals",
    icon: Link2,
  },
  {
    title: "Threat signals detected",
    detail: "Scanning for scam indicators",
    icon: Radar,
  },
  {
    title: "AI intelligence",
    detail: "Correlating contextual evidence",
    icon: BrainCircuit,
  },
  {
    title: "Verdict synthesis",
    detail: "Waiting for final investigation result",
    icon: ScanSearch,
  },
];

export default function InvestigationLoader({
  aiFinished,
  hasUrl,
  onComplete,
}: Props) {
  const [currentStage, setCurrentStage] = useState(0);

  // Progress through preliminary stages, but NEVER fake 100%.
  useEffect(() => {
    if (aiFinished) return;

    if (currentStage >= 4) return;

    const timer = setTimeout(() => {
      setCurrentStage((previous) => Math.min(previous + 1, 4));
    }, 850);

    return () => clearTimeout(timer);
  }, [currentStage, aiFinished]);

  // Only complete when the real API/AI work has finished.
  useEffect(() => {
    if (!aiFinished) return;

    setCurrentStage(5);

    const timer = setTimeout(() => {
      onComplete();
    }, 600);

    return () => clearTimeout(timer);
  }, [aiFinished, onComplete]);

  const progress = aiFinished
    ? 100
    : [15, 35, 55, 75, 90][Math.min(currentStage, 4)];

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-black/20 md:p-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />

      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-300/5 blur-3xl" />

      <div className="relative">
        <div className="flex flex-col gap-4 border-b border-white/8 pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.24em] text-cyan-300">
              CHAKSH INVESTIGATION
            </p>

            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              {aiFinished
                ? "Investigation complete"
                : "Evidence correlation in progress"}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              CHAKSH is combining message analysis, URL forensics,
              AI intelligence, and deterministic risk signals.
            </p>
          </div>

          <div
            className={`w-fit rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider ${
              aiFinished
                ? "border-emerald-400/20 bg-emerald-400/5 text-emerald-300"
                : "border-cyan-300/15 bg-cyan-300/5 text-cyan-300"
            }`}
          >
            {aiFinished ? "VERDICT READY" : "PROCESSING"}
          </div>
        </div>

        <div className="mt-7">
          <div className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-wider text-slate-600">
            <span>ANALYSIS PROGRESS</span>
            <span>{progress}%</span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`h-full rounded-full ${
                aiFinished ? "bg-emerald-300" : "bg-cyan-300"
              }`}
            />
          </div>
        </div>

        <div className="mt-7 space-y-3">
          {stages.map((stage, index) => {
            const Icon = stage.icon;

            const completed =
              aiFinished || index < currentStage;

            const active =
              !aiFinished && index === currentStage;

            return (
              <div
                key={stage.title}
                className={`flex items-center gap-4 rounded-2xl border p-4 ${
                  active
                    ? "border-cyan-300/20 bg-cyan-300/[0.035]"
                    : completed
                    ? "border-emerald-400/10 bg-emerald-400/[0.02]"
                    : "border-white/5 bg-white/[0.015]"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                    completed
                      ? "border-emerald-400/15 bg-emerald-400/5"
                      : active
                      ? "border-cyan-300/20 bg-cyan-300/5"
                      : "border-white/5 bg-black/20"
                  }`}
                >
                  {completed ? (
                    <Check className="h-4 w-4 text-emerald-300" />
                  ) : (
                    <Icon
                      className={`h-4 w-4 ${
                        active
                          ? "text-cyan-300"
                          : "text-slate-700"
                      }`}
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-medium ${
                      completed
                        ? "text-emerald-200"
                        : active
                        ? "text-white"
                        : "text-slate-600"
                    }`}
                  >
                    {stage.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    {stage.detail}
                  </p>
                </div>

                <div className="w-20 text-right">
                  {completed ? (
                    <span className="font-mono text-[10px] tracking-wider text-emerald-400">
                      COMPLETE
                    </span>
                  ) : active ? (
                    <motion.span
                      animate={{ opacity: [0.35, 1, 0.35] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                      }}
                      className="font-mono text-[10px] tracking-wider text-cyan-300"
                    >
                      ● ACTIVE
                    </motion.span>
                  ) : (
                    <span className="font-mono text-[10px] tracking-wider text-slate-700">
                      QUEUED
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {!aiFinished && currentStage >= 4 && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.025] p-4">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <BrainCircuit className="h-4 w-4 text-cyan-300" />
            </motion.div>

            <div>
              <p className="text-xs font-medium text-slate-300">
                Awaiting AI verdict
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Contextual analysis is still running. Results will
                appear automatically.
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
