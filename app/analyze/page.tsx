import InvestigationForm from "@/components/investigation/InvestigationForm";

export default function AnalyzePage() {
  return (
    <main className="min-h-screen bg-[#071019] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:36px_36px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-6 md:px-8">
        <header className="mb-10 flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-xs font-semibold tracking-[0.35em] text-cyan-300">
              CHAKSH
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              Investigation Console
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            SYSTEM ONLINE
          </div>
        </header>

        <section className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              New Investigation
            </p>

            <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Trace the evidence.
              <span className="block text-cyan-300">
                Expose the scam.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-400">
              Analyze suspicious recruitment messages and URLs using AI,
              deterministic risk scoring, evidence correlation, and URL
              forensics.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-sm">
            <p className="text-xs font-semibold tracking-[0.22em] text-gray-500">
              INVESTIGATION STACK
            </p>

            <div className="mt-4 space-y-3 text-sm">
              <StatusRow label="Message intelligence" status="READY" />
              <StatusRow label="URL forensics" status="READY" />
              <StatusRow label="AI analysis" status="READY" />
              <StatusRow label="Risk engine" status="READY" />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 lg:block">
            <p className="text-xs font-semibold tracking-[0.2em] text-gray-500">
              CASE WORKFLOW
            </p>

            <div className="mt-6 space-y-5">
              <WorkflowItem number="01" label="Submit evidence" />
              <WorkflowItem number="02" label="Analyze signals" />
              <WorkflowItem number="03" label="Correlate threats" />
              <WorkflowItem number="04" label="Issue verdict" />
            </div>
          </aside>

          <div>
            <InvestigationForm />
          </div>
        </section>
      </div>
    </main>
  );
}

function StatusRow({
  label,
  status,
}: {
  label: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-3">
      <span className="text-gray-400">{label}</span>
      <span className="text-emerald-400">{status}</span>
    </div>
  );
}

function WorkflowItem({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/30 text-xs text-cyan-300">
        {number}
      </div>

      <span className="text-sm text-gray-400">{label}</span>
    </div>
  );
}
