# PayPal Agentic Commerce Suite
> **Enterprise Autonomous Payment Protocol, Zero-Trust Fiscal Guardrails & Multi-Software Execution Mesh**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Runtime: Node.js 20+](https://img.shields.io/badge/Runtime-Node.js%2020%2B-green.svg)](https://nodejs.org)
[![Framework: React 19 + Vite](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-61dafb.svg)](https://vitejs.dev)
[![PayPal: REST Orders v2](https://img.shields.io/badge/PayPal-Orders%20v2%20Sandbox-003087.svg)](https://developer.paypal.com)
[![AI Engine: Google Gemini 3.8 Flash](https://img.shields.io/badge/AI%20Engine-Gemini%203.8%20Flash-4285F4.svg)](https://aistudio.google.com)

---

## Executive Overview

The **PayPal Agentic Commerce Suite** is a production-grade enterprise platform designed to bridge autonomous artificial intelligence agents with deterministic financial settlement rails. As autonomous agents take over procurement, cloud infrastructure provisioning, and B2B vendor negotiations, providing AI with unrestricted payment credentials poses severe financial and compliance risks. 

This platform establishes a **Zero-Trust Financial Invariant Protocol** that mediates every autonomous decision step with hard spending ceilings, categorical merchant whitelisting, two-tier human-in-the-loop (HITL) biometric step-up challenges, and sub-second transaction telemetry.

---

## 8 Partner Software Integrations

This platform orchestrates all 8 partner technologies into a unified full-stack architecture:

| Software / Platform | Role in Suite | Implementation & Key Invariants |
| :--- | :--- | :--- |
| **PayPal Developer Platform** | **Payment Settlement Rails** | Native REST v2 integration (`/v2/checkout/orders`), idempotent `PayPal-Request-Id` token deduplication, automated capture, and cryptographic HMAC-SHA256 webhook verification (`PAYPAL-AUTH-ALGO`). |
| **Google Gemini 3.8 Flash** | **Cognitive Decision Engine** | Frontier LLM reasoning loop with strict JSON Schema function-calling. Translates natural language objectives into structured order parameters within programmatic spending bounds. |
| **Autonomous Agentic Commerce Engine** | **Zero-Trust Policy Rails** | Deterministic pre-flight policy filter. Enforces spending caps (e.g., $100 cap), category whitelisting, and triggers biometric step-up challenges for discretionary purchases. |
| **AG Grid Enterprise** | **Institutional Audit Ledger** | Real-time financial telemetry console in Alpine Dark theme with custom status cell renderers, dynamic multi-column filtering, risk indexing, and one-click GAAP-compliant CSV audit export. |
| **Bryntum High-Performance Scheduler** | **Procurement Gantt & SLA Engine** | Interactive visual timeline tracking sub-second agent execution stages (*Discovery &rarr; Policy Validation &rarr; PayPal Auth &rarr; Biometric Escalation &rarr; Capture &rarr; Audit*), dependency paths, and SLA buffers. |
| **Channel3 Commerce Intelligence** | **Multi-Merchant Syndication** | Real-time cross-vendor product discovery, automated price arbitrage across authorized enterprise suppliers (Insight, CDW, B&H), live warehouse stock validation, and trust rating. |
| **APIMatic SDK Engine** | **OpenAPI 3.1 & Multi-Language SDKs** | Auto-generates strongly-typed client libraries across TypeScript, Python, Java, and Go directly from normalized PayPal OpenAPI 3.1 specs, preventing agent tool-calling hallucinations. |
| **Render Cloud Infrastructure** | **High-Availability Cloud Hosting** | Declarative `render.yaml` infrastructure-as-code blueprint with automated `/api/health` probes, zero-downtime rolling deploys, and an isolated background worker for webhook ingestion. |

---

## System Architecture Flow

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 AUTONOMOUS AGENT RUNTIME                               │
│                                                                                        │
│  [User Goal / RFQ]                                                                     │
│         │                                                                              │
│         ▼                                                                              │
│  [1. Channel3 API] ─────────► Real-time multi-merchant SKU discovery & price arbitrage │
│         │                                                                              │
│         ▼                                                                              │
│  [2. Gemini 3.8 Flash] ─────► Cognitive planning & structured function calling         │
│         │                                                                              │
│         ▼                                                                              │
│  [3. Policy Guardrail] ─────► Spending cap & category verification                     │
│         │                                                                              │
│         ├─── (Exceeds Threshold?) ──► [Step-Up Biometric / 2FA User Approval Gate]     │
│         │                                                 │                            │
│         ▼                                                 ▼ (Approved)                 │
│  [4. PayPal Orders v2] ─────► POST /v2/checkout/orders (Idempotent client request)     │
│         │                                                                              │
│         ▼                                                                              │
│  [5. PayPal Capture] ───────► POST /v2/checkout/orders/{id}/capture (Settlement)      │
│         │                                                                              │
│         ├───► [6. AG Grid Ledger] ────► Real-time audit entry & immutable CSV export   │
│         │                                                                              │
│         ├───► [7. Bryntum Gantt] ─────► Execution latency & SLA timeline milestone     │
│         │                                                                              │
│         └───► [8. Render Worker] ─────► Asynchronous HMAC webhook ingestion            │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Repository Structure

```
├── .env.example               # Environment variables template
├── .gitignore                 # Standard git exclusions (node_modules, .env, dist)
├── index.html                 # Single-page application HTML entrypoint
├── metadata.json              # Application capabilities & permission definitions
├── package.json               # Dependencies and build scripts
├── server.ts                  # Express full-stack API server + Vite middleware
├── tsconfig.json              # TypeScript compiler configuration
├── vite.config.ts             # Vite build & plugin configuration
├── render.yaml                # Declarative Render Cloud infrastructure blueprint
└── src/
    ├── App.tsx                # Main application orchestrator & workspace navigation
    ├── main.tsx               # React 19 application bootstrap
    ├── index.css              # Global styles & Tailwind CSS imports
    ├── types/
    │   └── hackathon.ts       # TypeScript models: Policy, Catalog, Bryntum, Simulation
    ├── data/
    │   └── hackathonData.ts   # Solution tracks, partner implementations, code snippets
    └── components/
        ├── Navbar.tsx             # 3-Zone top navigation header
        ├── CountdownBanner.tsx    # Governance status & protocol telemetry bar
        ├── AgentSimulator.tsx     # Interactive autonomous sandbox & Channel3 discovery
        ├── TechnologyMatrix.tsx   # Feature-by-feature showcase of all 8 software tools
        ├── BryntumScheduler.tsx   # Interactive Gantt & sub-second timeline scheduler
        ├── AgGridLedger.tsx       # AG Grid financial transaction audit matrix
        ├── ProjectIncubator.tsx   # AI Architecture Studio & blueprint generator
        ├── DevpostOptimizer.tsx   # Institutional governance & compliance rubric evaluator
        ├── ApiExplorer.tsx        # REST Sandbox sandbox runner & multi-language SDK hub
        └── HackathonOverview.tsx  # Enterprise solutions, architecture tracks & standards
```

---

## Quickstart & Local Setup

### 1. Prerequisites
- **Node.js**: `v20.0.0` or higher
- **npm**: `v10.0.0` or higher

### 2. Clone Repository
```bash
git clone https://github.com/<your-username>/paypal-agentic-commerce-suite.git
cd paypal-agentic-commerce-suite
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment
Copy the example environment configuration:
```bash
cp .env.example .env
```
Edit `.env` and supply your API keys:
- `GEMINI_API_KEY`: Obtain from [Google AI Studio](https://aistudio.google.com)
- `PAYPAL_CLIENT_ID` & `PAYPAL_CLIENT_SECRET`: Obtain from [PayPal Developer Dashboard](https://developer.paypal.com)
- `CHANNEL3_API_KEY`: Obtain from [Channel3](https://channel3.tv)

*(Note: The platform features robust deterministic sandbox mock fallbacks if live credentials are not provided.)*

### 5. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Production Build & Deployment
```bash
npm run build
npm start
```

---

## Key Modules & Interactive Views

### 1. Agentic Sandbox (`/`)
- Configure spending caps ($30–$250) and auto-approval thresholds ($10–$150).
- Input natural language procurement goals.
- Live Channel3 cross-merchant price arbitration and stock validation.
- Live step-by-step execution trace with PayPal Orders v2 Sandbox request/response logs.
- Interactive step-up user authorization challenge modal.

### 2. Technology Matrix (`/matrix`)
- Transparent engineering breakdown of all 8 partner technologies.
- 4 architectural invariants detailed per software tool.
- Verified active status badges and direct navigation action links.

### 3. Procurement Timeline (`/timeline`)
- Interactive Gantt chart powered by Bryntum Scheduler.
- Visualizes sub-second execution latency vs. multi-day vendor fulfillment.
- Task dependency mapping and SLA buffer monitors with animated replay.

### 4. Financial Ledger Matrix (`/aggrid`)
- High-frequency financial telemetry with AG Grid.
- Filter by transaction status, risk score, or vendor.
- One-click immutable CSV compliance export.

### 5. Architecture Studio (`/incubator`)
- AI-driven enterprise architecture generator powered by Gemini 3.8 Flash.
- Produces full-stack solution specifications, sequence loops, and software matrices.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
