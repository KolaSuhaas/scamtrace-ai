"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

import type { RiskSignal } from "@/types/analysis";

type Props = {
  signals: RiskSignal[];
};

export default function ThreatRadar({ signals }: Props) {
  function normalizeConfidence(value: number) {
    if (!Number.isFinite(value)) return 0;

    // AI may return confidence as either 0-1 or 0-100.
    const normalized = value <= 1 ? value * 100 : value;

    return Math.min(100, Math.max(0, Math.round(normalized)));
  }

  function getScore(keywords: string[]) {
    const matchingSignals = signals.filter((signal) => {
      const searchable =
        `${signal.category} ${signal.title}`.toLowerCase();

      return keywords.some((keyword) =>
        searchable.includes(keyword.toLowerCase())
      );
    });

    // No evidence means zero, not an artificial fallback value.
    if (matchingSignals.length === 0) {
      return 0;
    }

    // If several signals match one dimension,
    // display the strongest confidence.
    return Math.max(
      ...matchingSignals.map((signal) =>
        normalizeConfidence(signal.confidence)
      )
    );
  }

  const data = [
    {
      threat: "Payment",
      value: getScore([
        "payment",
        "fee",
        "money",
        "financial",
      ]),
    },
    {
      threat: "Urgency",
      value: getScore([
        "urgency",
        "urgent",
        "pressure",
        "deadline",
      ]),
    },
    {
      threat: "Credential",
      value: getScore([
        "credential",
        "password",
        "otp",
        "account details",
        "personal information",
      ]),
    },
    {
      threat: "Impersonation",
      value: getScore([
        "impersonation",
        "brand",
        "recruiter",
        "identity",
      ]),
    },
    {
      threat: "Domain",
      value: getScore([
        "domain",
        "url",
        "link",
        "website",
      ]),
    },
    {
      threat: "Social",
      value: getScore([
        "social engineering",
        "manipulation",
        "trust",
      ]),
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5 md:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05),transparent_65%)]" />

      <div className="relative">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] text-cyan-300">
              THREAT RADAR
            </p>

            <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
              Threat surface
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Confidence of detected scam indicators.
            </p>
          </div>

          <div className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 font-mono text-[10px] tracking-wider text-cyan-300">
            SIGNAL MAP
          </div>
        </div>

        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              data={data}
              outerRadius="72%"
            >
              <PolarGrid
                stroke="rgba(148,163,184,0.16)"
              />

              <PolarAngleAxis
                dataKey="threat"
                tick={{
                  fill: "#94a3b8",
                  fontSize: 11,
                }}
              />

              <PolarRadiusAxis
                domain={[0, 100]}
                tick={false}
                axisLine={false}
              />

              <Radar
                name="Threat confidence"
                dataKey="value"
                stroke="#67e8f9"
                fill="#22d3ee"
                fillOpacity={0.18}
                strokeWidth={2}
                isAnimationActive
                animationDuration={1200}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {data.map((item) => (
            <div
              key={item.threat}
              className="rounded-xl border border-white/5 bg-black/20 px-3 py-2"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-slate-500">
                  {item.threat}
                </span>

                <span className="font-mono text-xs text-cyan-300">
                  {item.value}%
                </span>
              </div>

              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-cyan-300 transition-all duration-700"
                  style={{
                    width: `${item.value}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
