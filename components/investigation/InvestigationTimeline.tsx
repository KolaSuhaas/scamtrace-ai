"use client";

import { motion } from "framer-motion";
import {
  MessageSquareText,
  Link2,
  BrainCircuit,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";

const stages = [
  {
    label: "Evidence",
    detail: "Message ingested",
    icon: MessageSquareText,
  },
  {
    label: "URL",
    detail: "Domain inspected",
    icon: Link2,
  },
  {
    label: "AI",
    detail: "Threats interpreted",
    icon: BrainCircuit,
  },
  {
    label: "Correlation",
    detail: "Signals connected",
    icon: ScanSearch,
  },
  {
    label: "Verdict",
    detail: "Risk determined",
    icon: ShieldCheck,
  },
];

export default function InvestigationTimeline() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.22em] text-cyan-300">
            INVESTIGATION TIMELINE
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Evidence processed across five analysis stages.
          </p>
        </div>

        <span className="font-mono text-[10px] tracking-wider text-emerald-400">
          COMPLETE
        </span>
      </div>

      <div className="relative grid grid-cols-1 gap-4 md:grid-cols-5 md:gap-2">
        <div className="absolute left-5 top-5 hidden h-px w-[calc(100%-2.5rem)] bg-white/10 md:block" />

        <motion.div
          className="absolute left-5 top-5 hidden h-px bg-cyan-300 md:block"
          initial={{ width: 0 }}
          animate={{ width: "calc(100% - 2.5rem)" }}
          transition={{
            duration: 1.4,
            ease: "easeInOut",
          }}
        />

        {stages.map((stage, index) => {
          const Icon = stage.icon;

          return (
            <motion.div
              key={stage.label}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.18,
                duration: 0.4,
              }}
              className="relative flex items-center gap-4 md:flex-col md:items-center md:text-center"
            >
              <motion.div
                initial={{
                  scale: 0.6,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  delay: index * 0.18,
                  type: "spring",
                  stiffness: 180,
                }}
                className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-300/30 bg-[#071019] shadow-[0_0_24px_rgba(103,232,249,0.08)]"
              >
                <Icon className="h-4 w-4 text-cyan-300" />
              </motion.div>

              <div>
                <p className="text-sm font-medium text-slate-200">
                  {stage.label}
                </p>

                <p className="mt-1 text-[11px] text-slate-600">
                  {stage.detail}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
