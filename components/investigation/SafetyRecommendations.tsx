"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

type Props = {
  recommendations: string[];
};

export default function SafetyRecommendations({
  recommendations,
}: Props) {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.035] p-5 md:p-6">
      <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-emerald-400/5 blur-3xl" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10">
              <ShieldCheck className="h-5 w-5 text-emerald-300" />
            </div>

            <div>
              <p className="text-[11px] font-semibold tracking-[0.22em] text-emerald-300">
                SAFETY PROTOCOL
              </p>

              <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
                What should you do now?
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Recommended actions based on the investigation.
              </p>
            </div>
          </div>

          <ArrowUpRight className="hidden h-4 w-4 text-slate-600 sm:block" />
        </div>

        <div className="mt-6 space-y-3">
          {recommendations.map((recommendation, index) => (
            <motion.div
              key={`${recommendation}-${index}`}
              initial={{
                opacity: 0,
                x: -10,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.12,
                duration: 0.35,
              }}
              className="group flex gap-4 rounded-xl border border-white/5 bg-black/20 p-4"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-400/15 bg-emerald-400/5 font-mono text-xs text-emerald-300">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="flex flex-1 gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/70" />

                <p className="text-sm leading-6 text-slate-300">
                  {recommendation}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 border-t border-emerald-400/10 pt-4">
          <p className="text-[11px] leading-5 text-slate-600">
            CHAKSH provides risk indicators for decision support.
            Verify important claims independently through official channels.
          </p>
        </div>
      </div>
    </section>
  );
}
