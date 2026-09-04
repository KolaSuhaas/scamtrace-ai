# CHAKSH

### See. Verify. Trust.

**AI-Powered Digital Threat Intelligence**

CHAKSH is an explainable threat-investigation platform that analyzes suspicious **messages and optional URLs** to identify scam indicators, social-engineering tactics, credential theft, impersonation, payment fraud, urgency, and suspicious domain relationships.

Instead of simply saying **"Scam" or "Safe"**, CHAKSH answers:

> **What is suspicious, where is the evidence, how serious is it, and what should the user do next?**

---

## The Problem

Modern scams increasingly imitate legitimate recruiters, companies, banks, institutions, and online services.

Common tactics include:

- Fake job and internship offers
- Registration or processing-fee requests
- OTP/password theft
- Credential harvesting
- Artificial urgency and pressure
- Brand impersonation
- Misleading domains and links
- Social-engineering techniques

Most users can recognize an obvious scam.

The real challenge is identifying a message that **looks legitimate**.

CHAKSH is designed for that grey area.

---

## What Makes CHAKSH Different?

CHAKSH is not just an AI classifier.

It combines:

```text
AI Context Analysis
        +
Deterministic Threat Signals
        +
Optional URL Forensics
        +
Evidence Correlation
        +
Weighted Risk Scoring
        ↓
Explainable Investigation
```

This hybrid approach gives users both a **verdict and the reasoning behind it**.

---

## Core Features

### AI Message Intelligence

Analyzes message context for:

- Payment requests
- Credential / OTP requests
- Urgency and pressure tactics
- Impersonation
- Social engineering
- Suspicious recruitment language
- Unrealistic offers
- Likely attack objectives

---

### Evidence-Based Detection

Every AI-detected signal can include:

- **Category**
- **Evidence**
- **Explanation**
- **Confidence**
- **Severity**

Example:

```text
Signal      : Credential Request
Evidence    : "Provide your account password and OTP."
Confidence  : 0.98
Severity    : CRITICAL
```

This turns a black-box prediction into an understandable investigation.

---

### Optional URL Forensics

CHAKSH does **not require a URL**.

A suspicious WhatsApp message, SMS, email, or recruiter message can be analyzed independently.

When a URL is supplied, CHAKSH additionally performs:

- Hostname extraction
- Protocol inspection
- HTTPS detection
- Suspicious URL-pattern analysis
- Domain inspection
- Claimed organization vs domain comparison
- Domain relationship analysis

So CHAKSH supports both:

```text
Message → Investigation
```

and:

```text
Message + URL → Enhanced Investigation
```

---

### Domain Relationship Analysis

A scammer may claim to represent a legitimate organization while directing the victim to an unrelated domain.

CHAKSH compares:

```text
Claimed Organization
        ↕
Provided Domain
```

to surface suspicious relationships as additional evidence.

---

### Hybrid Risk Engine

CHAKSH combines AI intelligence with deterministic security rules.

Detected signals contribute to a normalized **0-100 risk score**.

| Risk Score | Classification |
|---:|---|
| 0-29 | LOW |
| 30-59 | MODERATE |
| 60-79 | HIGH |
| 80-100 | CRITICAL |

The deterministic layer can identify indicators such as payment requests, credentials, urgency, impersonation, suspicious language, and domain mismatch.

---

### Threat Radar

Instead of representing an investigation with only one number, CHAKSH visualizes different threat dimensions.

Examples include:

- Payment
- Credentials
- Urgency
- Impersonation
- Domain risk
- Social engineering

This helps users understand **what is driving the risk score**.

---

### Confidence vs Severity

CHAKSH deliberately separates two concepts:

**Confidence** = How certain the system is that a signal exists.

```text
0.00 ─────────────── 1.00
uncertain             confident
```

**Severity** = How dangerous that behavior would be.

```text
LOW → MEDIUM → HIGH → CRITICAL
```

A signal can therefore have high confidence without necessarily having high severity.

---

### Safety Recommendations

CHAKSH converts investigation results into actionable guidance, such as:

- Do not send requested payments
- Never share OTPs or passwords
- Verify organizations independently
- Use official company websites
- Avoid suspicious links
- Contact organizations through trusted channels

---

## Investigation Pipeline

```text
               USER INPUT
                   │
          ┌────────┴────────┐
          │                 │
       MESSAGE         OPTIONAL URL
          │                 │
          ▼                 ▼
   MESSAGE SIGNALS     URL FORENSICS
          │                 │
          └────────┬────────┘
                   ▼
             AI ANALYSIS
                   │
                   ▼
        EVIDENCE CORRELATION
                   │
                   ▼
             RISK ENGINE
                   │
                   ▼
            THREAT RADAR
                   │
                   ▼
       INVESTIGATION VERDICT
                   │
                   ▼
      SAFETY RECOMMENDATIONS
```

The investigation loader remains synchronized with the actual AI request rather than displaying 100% before the analysis is complete.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js |
| Frontend | React + TypeScript |
| Styling | Tailwind CSS |
| UI | shadcn/ui |
| Animation | Framer Motion |
| Visualization | Recharts |
| Icons | Lucide React |
| Backend | Next.js Route Handlers |
| AI Provider | Featherless AI |
| AI Model | Qwen-based LLM |
| Analysis | Hybrid AI + deterministic risk engine |

---

## Project Structure

```text
app/
├── api/analyze/          # AI analysis endpoint
├── analyze/              # Investigation console
└── page.tsx              # CHAKSH landing page

components/
├── investigation/        # Investigation UI and results
├── risk/                 # Risk score, gauge and threat radar
├── url/                  # URL forensic components
└── ui/                   # Shared UI components

lib/
├── ai/                   # AI prompt, parser and API integration
├── risk/                 # Signals, scoring and risk engine
└── url/                  # URL analyzer

public/
└── eye-logo.png

types/
└── analysis.ts
```

---

## Getting Started

### Prerequisites

- Node.js
- npm
- Git
- Featherless AI API key

### 1. Clone

```bash
git clone https://github.com/KolaSuhaas/scamtrace-ai.git
cd scamtrace-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env.local`:

```env
FEATHERLESS_API_KEY=your_api_key
FEATHERLESS_MODEL=your_model_name
```

> Never commit your real API key.

### 4. Run locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Analyzer:

```text
http://localhost:3000/analyze
```

### 5. Production build

```bash
npm run build
```

---

## Security

The Featherless API key remains server-side through environment variables.

Never:

- Commit API keys to GitHub
- Expose the key in client-side components
- Prefix the secret with `NEXT_PUBLIC_`
- Include secrets in API responses

For testing, users should avoid submitting real passwords, OTPs, banking credentials, authentication tokens, or identity documents.

---

## Current Scope

CHAKSH is a **decision-support system**, not an absolute authority on whether a sender or organization is fraudulent.

Its purpose is to identify suspicious indicators, explain the evidence, estimate risk, and help users make safer decisions.

Important claims should still be independently verified through official channels.

---

## Future Scope

CHAKSH can evolve into a broader digital-threat investigation platform with:

- Screenshot-based scam analysis
- QR-code investigation
- Email-header analysis
- Redirect-chain inspection
- Domain-age and WHOIS intelligence
- Domain reputation services
- Multilingual scam detection
- Browser extension integration
- Organization verification APIs
- Real-time threat-intelligence feeds

---

## Vision

Traditional detection:

```text
SCAM / NOT SCAM
```

CHAKSH:

```text
Detect
  ↓
Explain
  ↓
Correlate
  ↓
Score
  ↓
Visualize
  ↓
Recommend
```

The goal is simple:

> **Don't just warn the user. Show them why.**

---

# CHAKSH

### See. Verify. Trust.

**AI-Powered Digital Threat Intelligence**
