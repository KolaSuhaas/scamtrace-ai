"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

import type { RiskLevel as RiskLevelType } from "@/types/analysis";

type Props = {
  level: RiskLevelType;
};

const styles: Record<
  RiskLevelType,
  {
    border: string;
    background: string;
    text: string;
  }
> = {
  LOW: {
    border: "border-emerald-400/20",
    background: "bg-emerald-400/5",
    text: "text-emerald-300",
  },

  MODERATE: {
    border: "border-yellow-400/20",
    background: "bg-yellow-400/5",
    text: "text-yellow-300",
  },

  HIGH: {
    border: "border-orange-400/20",
    background: "bg-orange-400/5",
    text: "text-orange-300",
  },

  CRITICAL: {
    border: "border-red-400/20",
    background: "bg-red-400/5",
    text: "text-red-300",
  },
};

export default function RiskLevel({
  level,
}: Props) {
  const style = styles[level];

  const Icon =
    level === "LOW"
      ? ShieldCheck
      : level === "CRITICAL"
      ? ShieldAlert
      : AlertTriangle;

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.88,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay: 0.7,
        type: "spring",
        stiffness: 180,
      }}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 ${style.border} ${style.background} ${style.text}`}
    >
      <Icon className="h-4 w-4" />

      <span className="font-mono text-xs font-semibold tracking-[0.14em]">
        {level}
      </span>
    </motion.div>
  );
}
