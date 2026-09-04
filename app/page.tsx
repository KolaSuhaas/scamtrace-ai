import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070A] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_35%)]" />

      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-0 top-1/2 h-px w-full bg-cyan-400/30" />
        <div className="absolute top-0 left-1/2 h-full w-px bg-cyan-400/20" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-xs tracking-[0.45em] text-cyan-300/70">
          AI-POWERED DIGITAL THREAT INTELLIGENCE
        </p>

        <Link
          href="/analyze"
          aria-label="Enter CHAKSH Investigation Console"
          className="group relative block"
        >
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl opacity-50 transition duration-500 group-hover:opacity-100 group-hover:scale-110" />

          <img
            src="/eye-logo.png"
            alt="CHAKSH Eye"
            className="relative w-[320px] max-w-[90vw] transition duration-500 ease-out group-hover:scale-105 group-hover:drop-shadow-[0_0_28px_rgba(34,211,238,0.65)] sm:w-[420px] md:w-[520px]"
          />
        </Link>

        <Link
          href="/analyze"
          className="mt-2 block text-white"
        >
          <h1 className="text-5xl font-bold tracking-[0.14em] transition duration-300 hover:text-cyan-300 hover:drop-shadow-[0_0_18px_rgba(34,211,238,0.6)] sm:text-6xl md:text-7xl">
            CHAKSH
          </h1>
        </Link>

        <p className="mt-4 text-xl tracking-[0.22em] text-slate-300 sm:text-2xl">
          See. Verify. Trust.
        </p>

        <Link
          href="/analyze"
          className="mt-10 rounded-full border border-cyan-400/50 bg-cyan-400/5 px-8 py-3 text-sm tracking-[0.22em] text-cyan-200 transition duration-300 hover:border-cyan-300 hover:bg-cyan-400/10 hover:shadow-[0_0_30px_rgba(34,211,238,0.22)]"
        >
          CLICK TO BEGIN INVESTIGATION
        </Link>

        <div className="mt-14 grid grid-cols-2 gap-6 text-left text-xs text-slate-500 sm:grid-cols-4">
          <div>
            <p className="text-cyan-300">MESSAGE</p>
            <p>INTELLIGENCE</p>
          </div>

          <div>
            <p className="text-cyan-300">URL</p>
            <p>FORENSICS</p>
          </div>

          <div>
            <p className="text-cyan-300">AI</p>
            <p>ANALYSIS</p>
          </div>

          <div>
            <p className="text-cyan-300">RISK</p>
            <p>ENGINE</p>
          </div>
        </div>
      </div>
    </main>
  );
}
