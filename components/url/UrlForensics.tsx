import {
  Globe2,
  LockKeyhole,
  SearchCheck,
  TriangleAlert,
} from "lucide-react";

import DomainMismatch from "./DomainMismatch";
import { analyzeUrl } from "@/lib/url/analyzer";

type Props = {
  url: string;
  claimedOrganization: string;
};

export default function UrlForensics({
  url,
  claimedOrganization,
}: Props) {
  const analysis = analyzeUrl(url);

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/5">
          <SearchCheck className="h-5 w-5 text-cyan-300" />
        </div>

        <div>
          <p className="text-[11px] font-semibold tracking-[0.22em] text-cyan-300">
            URL FORENSICS
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            Domain inspection
          </h3>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <ForensicRow
          icon={<Globe2 className="h-4 w-4" />}
          label="Hostname"
        >
          <span className="max-w-[65%] wrap-anywhere text-right font-mono text-sm text-slate-200">
            {analysis.hostname}
          </span>
        </ForensicRow>

        <ForensicRow
          icon={<Globe2 className="h-4 w-4" />}
          label="Protocol"
        >
          <span className="font-mono text-sm text-slate-200">
            {analysis.protocol
              .replace(":", "")
              .toUpperCase()}
          </span>
        </ForensicRow>

        <ForensicRow
          icon={<LockKeyhole className="h-4 w-4" />}
          label="Secure connection"
        >
          <span
            className={
              analysis.usesHttps
                ? "text-emerald-300"
                : "text-red-300"
            }
          >
            {analysis.usesHttps
              ? "HTTPS ✓"
              : "NOT HTTPS"}
          </span>
        </ForensicRow>

        <ForensicRow
          icon={<TriangleAlert className="h-4 w-4" />}
          label="Assessment"
        >
          <span
            className={
              analysis.suspicious
                ? "text-amber-300"
                : "text-emerald-300"
            }
          >
            {analysis.suspicious
              ? "SUSPICIOUS"
              : "NO OBVIOUS SIGNALS"}
          </span>
        </ForensicRow>
      </div>

      {analysis.reasons.length > 0 && (
        <div className="mt-6">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-slate-600">
            DETECTED URL SIGNALS
          </p>

          <div className="mt-3 space-y-2">
            {analysis.reasons.map(
              (reason, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 rounded-xl border border-amber-400/10 bg-amber-400/[0.025] p-3"
                >
                  <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300" />

                  <p className="text-xs leading-5 text-amber-200/80">
                    {reason}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      )}

      <DomainMismatch
        claimedOrganization={claimedOrganization}
        url={url}
      />
    </section>
  );
}

function ForensicRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-4 border-b border-white/5 pb-3">
      <div className="flex shrink-0 items-center gap-2 text-slate-500">
        {icon}

        <span className="text-xs">
          {label}
        </span>
      </div>

      {children}
    </div>
  );
}
