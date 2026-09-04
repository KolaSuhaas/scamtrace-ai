"use client";

import { motion } from "framer-motion";

type Props = {
  score: number;
};

export default function RiskGauge({ score }: Props) {
  const safeScore = Math.min(100, Math.max(0, score));

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-wider text-slate-600">
        <span>0</span>
        <span>THREAT SCALE</span>
        <span>100</span>
      </div>

      <div className="relative">
        <div className="flex h-2 overflow-hidden rounded-full bg-white/5">
          <div className="w-[30%] bg-emerald-400/70" />
          <div className="w-[30%] bg-yellow-300/70" />
          <div className="w-[20%] bg-orange-300/70" />
          <div className="w-[20%] bg-red-400/70" />
        </div>

        {/* Exact engine thresholds: 30 / 60 / 80 */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[30%] top-[-3px] h-4 w-px bg-white/30" />
          <div className="absolute left-[60%] top-[-3px] h-4 w-px bg-white/30" />
          <div className="absolute left-[80%] top-[-3px] h-4 w-px bg-white/30" />
        </div>

        <motion.div
          initial={{ left: "0%" }}
          animate={{ left: `${safeScore}%` }}
          transition={{
            duration: 1.35,
            ease: "easeOut",
          }}
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#071019] shadow-[0_0_18px_rgba(255,255,255,0.25)]"
        />
      </div>

      <div className="relative mt-3 h-8 font-mono text-[9px] tracking-wider">
        <span className="absolute left-0 text-emerald-300">
          LOW
        </span>

        <span className="absolute left-[30%] -translate-x-1/2 text-yellow-300">
          MODERATE
        </span>

        <span className="absolute left-[60%] -translate-x-1/2 text-orange-300">
          HIGH
        </span>

        <span className="absolute right-0 text-red-300">
          CRITICAL
        </span>
      </div>

      <div className="relative -mt-3 h-4 font-mono text-[8px] text-slate-700">
        <span className="absolute left-[30%] -translate-x-1/2">
          30
        </span>

        <span className="absolute left-[60%] -translate-x-1/2">
          60
        </span>

        <span className="absolute left-[80%] -translate-x-1/2">
          80
        </span>
      </div>
    </div>
  );
}
