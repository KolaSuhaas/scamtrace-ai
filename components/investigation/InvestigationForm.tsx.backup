"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Link2,
  ScanSearch,
  Sparkles,
  Cpu,
  Radar,
} from "lucide-react";

import InvestigationResult from "./InvestigationResult";
import InvestigationLoader from "./InvestigationLoader";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import type {
  InvestigationResult as InvestigationResultType,
  RiskSignal,
} from "@/types/analysis";

import { detectMessageSignals } from "@/lib/risk/signals";
import { evaluateRisk } from "@/lib/risk/risk-engine";
import { analyzeUrl } from "@/lib/url/analyzer";

export default function InvestigationForm() {
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");

  const [result, setResult] =
    useState<InvestigationResultType | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFinished, setAiFinished] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setResult(null);
    setError("");
    setAiFinished(false);
    setIsAnalyzing(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          url,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "AI analysis failed");
      }

      const detectedSignals = detectMessageSignals(message);

      if (url.trim()) {
        const urlAnalysis = analyzeUrl(url);

        if (urlAnalysis.suspicious) {
          detectedSignals.push("DOMAIN_MISMATCH");
        }
      }

      const risk = evaluateRisk(detectedSignals);

      const aiSignals: RiskSignal[] = data.analysis.signals.map(
        (signal: {
          category: string;
          title: string;
          evidence: string;
          explanation: string;
          confidence: number;
          severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
        }) => ({
          category: signal.category,
          title: signal.title,
          evidence: signal.evidence,
          explanation: signal.explanation,
          confidence: signal.confidence,

          severity: signal.severity,
        })
      );

      const finalResult: InvestigationResultType = {
        claimedOrganization: data.analysis.claimedOrganization,
        score: risk.score,
        level: risk.level,
        summary: data.analysis.summary,
        signals: aiSignals,
        attackObjective: data.analysis.attackObjective,
        recommendations: data.analysis.recommendations,
      };

      setResult(finalResult);
      setAiFinished(true);
    } catch (err) {
      console.error(err);

      setError(
        "CHAKSH could not complete the AI investigation."
      );

      setAiFinished(true);
    }
  }

  function resetInvestigation() {
    setMessage("");
    setUrl("");
    setResult(null);
    setError("");
    setAiFinished(false);
    setIsAnalyzing(false);
  }

  function finishLoader() {
    if (aiFinished) {
      setIsAnalyzing(false);
    }
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-8"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

        <div className="mb-8 flex flex-col gap-4 border-b border-white/8 pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ScanSearch className="h-4 w-4 text-cyan-300" />

              <p className="text-xs font-semibold tracking-[0.22em] text-cyan-300">
                EVIDENCE INTAKE
              </p>
            </div>

            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Start a new investigation
            </h3>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
              Submit the suspicious message and its associated URL.
              CHAKSH will correlate language, domain signals, and AI
              analysis into one verdict.
            </p>
          </div>

          <Badge
            variant="outline"
            className="w-fit border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-emerald-300"
          >
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
            AI ENGINE ONLINE
          </Badge>
        </div>

        <div className="space-y-7">
          <div>
            <div className="mb-3 flex items-center justify-between gap-4">
              <label
                htmlFor="message"
                className="flex items-center gap-2 text-sm font-medium text-slate-200"
              >
                <ShieldCheck className="h-4 w-4 text-slate-500" />
                Message evidence
              </label>

              <span className="font-mono text-[11px] tracking-wider text-slate-600">
                {message.length} CHARS
              </span>
            </div>

            <div className="relative">
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Paste the recruiter message, internship offer, payment request, or suspicious communication here..."
                rows={8}
                required
                disabled={isAnalyzing}
                className="min-h-[190px] resize-none border-white/10 bg-black/30 px-4 py-4 text-[15px] leading-7 text-slate-100 placeholder:text-slate-600 focus-visible:border-cyan-400/40 focus-visible:ring-cyan-400/10"
              />

              <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md border border-white/5 bg-black/40 px-2 py-1 text-[10px] tracking-wider text-slate-600">
                <Cpu className="h-3 w-3" />
                NLP INPUT
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <label
                htmlFor="url"
                className="flex items-center gap-2 text-sm font-medium text-slate-200"
              >
                <Link2 className="h-4 w-4 text-slate-500" />
                Associated URL
              </label>

              <span className="font-mono text-[11px] tracking-wider text-slate-600">
                DOMAIN FORENSICS
              </span>
            </div>

            <div className="relative">
              <Link2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com (optional)"
                disabled={isAnalyzing}
                className="h-13 border-white/10 bg-black/30 pl-11 text-slate-100 placeholder:text-slate-600 focus-visible:border-cyan-400/40 focus-visible:ring-cyan-400/10"
              />
            </div>
          </div>

          <div className="grid gap-3 border-y border-white/8 py-5 sm:grid-cols-3">
            <EngineStatus
              icon={<Sparkles className="h-4 w-4" />}
              label="AI Analysis"
            />

            <EngineStatus
              icon={<Radar className="h-4 w-4" />}
              label="Threat Signals"
            />

            <EngineStatus
              icon={<ShieldCheck className="h-4 w-4" />}
              label="Risk Engine"
            />
          </div>

          <Button
            type="submit"
            disabled={isAnalyzing}
            size="lg"
            className="group h-14 w-full rounded-xl bg-cyan-300 text-sm font-semibold tracking-wide text-slate-950 shadow-lg shadow-cyan-950/20 transition-all hover:bg-cyan-200 disabled:opacity-60"
          >
            {isAnalyzing ? (
              <>
                <ScanSearch className="mr-2 h-4 w-4 animate-pulse" />
                INVESTIGATION RUNNING
              </>
            ) : (
              <>
                <ScanSearch className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                START INVESTIGATION
              </>
            )}
          </Button>

          <p className="text-center text-[11px] leading-5 text-slate-600">
            Do not submit passwords, OTPs, banking credentials, or identity documents.
          </p>
        </div>
      </form>

      {isAnalyzing && (
        <InvestigationLoader
          aiFinished={aiFinished}
          hasUrl={Boolean(url.trim())}
          onComplete={finishLoader}
        />
      )}

      {error && (
        <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/5 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {result && (
        <>
          <InvestigationResult
            result={result}
            url={url}
            message={message}
          />

          <div className="mt-6 flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={resetInvestigation}
              className="border-white/10 bg-white/[0.02] px-5 text-slate-300 hover:bg-white/[0.05] hover:text-white"
            >
              NEW INVESTIGATION
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function EngineStatus({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
      <div className="flex items-center gap-2 text-slate-400">
        <span className="text-cyan-300">{icon}</span>
        <span className="text-xs">{label}</span>
      </div>

      <span className="font-mono text-[10px] tracking-wider text-emerald-400">
        READY
      </span>
    </div>
  );
}
