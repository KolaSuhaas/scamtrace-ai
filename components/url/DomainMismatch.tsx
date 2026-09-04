import {
  Building2,
  Globe2,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

type Props = {
  claimedOrganization: string;
  url: string;
};

const KNOWN_DOMAINS: Record<string, string> = {
  amazon: "amazon.com",
  microsoft: "microsoft.com",
  google: "google.com",
  tcs: "tcs.com",
  infosys: "infosys.com",
  wipro: "wipro.com",
  accenture: "accenture.com",
  deloitte: "deloitte.com",
};

export default function DomainMismatch({
  claimedOrganization,
  url,
}: Props) {
  let hostname = "Invalid URL";

  try {
    hostname = new URL(url).hostname;
  } catch {
    // Invalid URL
  }

  const normalizedOrg = claimedOrganization
    .trim()
    .toLowerCase();

  const officialDomain =
    KNOWN_DOMAINS[normalizedOrg] ?? null;

  const relationship =
    officialDomain === null
      ? null
      : hostname === officialDomain ||
        hostname.endsWith(`.${officialDomain}`);

  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
      <div className="border-b border-white/8 px-5 py-4">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-amber-300">
          DOMAIN RELATIONSHIP
        </p>

        <p className="mt-1 text-xs text-slate-600">
          AI-extracted identity compared with the submitted domain.
        </p>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-2">
        <div className="min-w-0 rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <div className="flex items-center gap-2 text-slate-500">
            <Building2 className="h-4 w-4" />
            <span className="text-[10px] font-semibold tracking-[0.16em]">
              CLAIMED ORGANIZATION
            </span>
          </div>

          <p className="mt-3 wrap-anywhere text-lg font-semibold text-white">
            {claimedOrganization}
          </p>

          {officialDomain && (
            <p className="mt-1 wrap-anywhere font-mono text-[11px] text-slate-600">
              Known official domain: {officialDomain}
            </p>
          )}
        </div>

        <div className="min-w-0 rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <div className="flex items-center gap-2 text-slate-500">
            <Globe2 className="h-4 w-4" />
            <span className="text-[10px] font-semibold tracking-[0.16em]">
              SUBMITTED DOMAIN
            </span>
          </div>

          <p className="mt-3 wrap-anywhere font-mono text-sm font-semibold leading-6 text-white">
            {hostname}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5">
        {relationship === false && (
          <div className="flex items-start gap-3 rounded-xl border border-amber-400/15 bg-amber-400/5 p-4">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />

            <div>
              <p className="text-sm font-medium text-amber-200">
                Suspicious domain relationship
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                The submitted hostname does not match the known official
                domain for {claimedOrganization}.
              </p>
            </div>
          </div>
        )}

        {relationship === true && (
          <div className="flex items-start gap-3 rounded-xl border border-emerald-400/15 bg-emerald-400/5 p-4">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />

            <div>
              <p className="text-sm font-medium text-emerald-200">
                Domain relationship appears consistent
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                The submitted hostname matches the known official
                domain for {claimedOrganization}.
              </p>
            </div>
          </div>
        )}

        {relationship === null && (
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs leading-5 text-slate-500">
            CHAKSH identified the claimed organization as{" "}
            <span className="text-slate-300">
              {claimedOrganization}
            </span>
            , but its official domain has not been independently verified
            by the local trusted-domain registry.
          </div>
        )}
      </div>
    </div>
  );
}
