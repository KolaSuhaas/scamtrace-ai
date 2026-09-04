"use client";

import { useEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

type Props = {
  score: number;
};

export default function RiskScore({ score }: Props) {
  const safeScore = Math.min(100, Math.max(0, score));

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    Math.round(latest)
  );

  useEffect(() => {
    const controls = animate(count, safeScore, {
      duration: 1.35,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [count, safeScore]);

  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-500">
        RISK SCORE
      </p>

      <div className="mt-2 flex items-end gap-2">
        <motion.span className="font-mono text-6xl font-semibold tracking-[-0.06em] text-white md:text-7xl">
          {rounded}
        </motion.span>

        <span className="mb-2 font-mono text-lg text-slate-600">
          /100
        </span>
      </div>

      <p className="mt-2 text-xs text-slate-500">
        Composite investigation risk
      </p>
    </div>
  );
}
