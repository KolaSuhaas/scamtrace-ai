"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Crosshair,
  FileSearch,
  ShieldCheck,
} from "lucide-react";

import type { InvestigationResult as InvestigationResultType } from "@/types/analysis";

import RiskScore from "@/components/risk/RiskScore";
import RiskLevel from "@/components/risk/RiskLevel";
import RiskGauge from "@/components/risk/RiskGauge";
import SignalCard from "@/components/risk/SignalCard";
import ThreatRadar from "@/components/risk/ThreatRadar";
import UrlForensics from "@/components/url/UrlForensics";

import EvidenceViewer from "./EvidenceViewer";
import InvestigationTimeline from "./InvestigationTimeline";
import SafetyRecommendations from "./SafetyRecommendations";

type Props = {
  result: InvestigationResultType;
  url: string;
  message: string;
};

export default function InvestigationResult({
  result,
  url,
  message,
}: Props) {
  const highRisk =
    result.level === "HIGH" || result.level === "CRITICAL";

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-8 w-full space-y-5"
    >
      {/* Investigation complete banner */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 p-5 md:p-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/5">
              <ShieldCheck className="h-5 w-5 text-cyan-300" />
            </div>

            <div>
              <p className="text-[11px] font-semibold tracking-[0.24em] text-cyan-300">
                INVESTIGATION COMPLETE
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                Threat assessment generated
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                AI intelligence, deterministic signals and URL evidence
                have been correlated.
              </p>
            </div>
          </div>

          <div
            className={`flex w-fit items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs tracking-wider ${
              highRisk
                ? "border-red-400/20 bg-red-400/5 text-red-300"
                : "border-emerald-400/20 bg-emerald-400/5 text-emerald-300"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                highRisk ? "bg-red-400" : "bg-emerald-400"
              }`}
            />
            {result.level} RISK
          </div>
        </div>
      </div>

      {/* Primary verdict */}
      <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-6"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-300/5 blur-3xl" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-500">
                  RISK VERDICT
                </p>

                <h3 className="mt-2 text-lg font-medium text-slate-200">
                  Overall threat level
                </h3>
              </div>

              <AlertTriangle
                className={`h-5 w-5 ${
                  highRisk ? "text-red-400" : "text-emerald-400"
                }`}
              />
            </div>

            <div className="mt-7 flex items-end justify-between gap-4">
              <RiskScore score={result.score} />
              <RiskLevel level={result.level} />
            </div>

            <div className="mt-6">
              <RiskGauge score={result.score} />
            </div>

            <div className="mt-6 border-t border-white/8 pt-5">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                Assessment
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                {result.summary}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          <ThreatRadar signals={result.signals} />
        </motion.div>
      </div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        <InvestigationTimeline />
      </motion.div>

      {/* Attack objective */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-amber-400/15 bg-amber-400/[0.035] p-5 md:p-6"
      >
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/10">
            <Crosshair className="h-5 w-5 text-amber-300" />
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] text-amber-300">
              LIKELY ATTACK OBJECTIVE
            </p>

            <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
              What the attacker appears to want
            </h3>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
              {result.attackObjective}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Evidence */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6"
      >
        <div className="mb-5 flex items-center gap-3">
          <FileSearch className="h-5 w-5 text-cyan-300" />

          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] text-cyan-300">
              EVIDENCE ANALYSIS
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Suspicious language and supporting forensic indicators.
            </p>
          </div>
        </div>

        <EvidenceViewer message={message} />
      </motion.div>

      {/* URL + detected signals */}
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
        >
          {url.trim() && (
          <UrlForensics
            url={url}
            claimedOrganization={result.claimedOrganization}
          />
        )}
        </motion.div>

        <motion.section
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.22em] text-cyan-300">
                DETECTED SIGNALS
              </p>

              <h3 className="mt-2 text-xl font-semibold text-white">
                Threat indicators
              </h3>
            </div>

            <span className="font-mono text-xs text-slate-500">
              {result.signals.length} FOUND
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {result.signals.map((signal, index) => (
              <motion.div
                key={`${signal.title}-${index}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.75 + index * 0.08,
                }}
              >
                <SignalCard signal={signal} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <SafetyRecommendations
          recommendations={result.recommendations}
        />
      </motion.div>
    </motion.section>
  );
}
