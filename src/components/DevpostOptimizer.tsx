import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Award,
  ChevronRight,
  Sparkles,
  CheckSquare,
  Square,
  FileCheck,
  ExternalLink,
  Target,
  FileText
} from 'lucide-react';
import { ENTERPRISE_GOVERNANCE_CRITERIA } from '../data/hackathonData';
import { RubricEvaluation } from '../types/hackathon';

export const DevpostOptimizer: React.FC = () => {
  const [projectTitle, setProjectTitle] = useState<string>('PayAgent Mesh: Autonomous B2B Purchasing Protocol');
  const [pitch, setPitch] = useState<string>(
    'PayAgent Mesh empowers autonomous AI agents to negotiate, verify spending limits, and execute transactions using PayPal Orders v2 with cryptographic policy guardrails and instant digital receipts.'
  );
  const [payPalApis, setPayPalApis] = useState<string>('Orders v2 (/v2/checkout/orders), Payments Capture, Payouts API, Webhooks');
  const [repoUrl, setRepoUrl] = useState<string>('https://github.com/enterprise/payagent-mesh');
  const [demoUrl, setDemoUrl] = useState<string>('https://internal.demo/payagent-preview');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<RubricEvaluation | null>(null);

  // Interactive Checklist directly aligned with Enterprise Deployment Standards
  const [checklist, setChecklist] = useState<{ id: string; label: string; done: boolean; tip: string }[]>([
    {
      id: 'paypal-integration',
      label: 'PayPal REST Sandbox Integration (Orders v2, Capture, or Payouts)',
      done: true,
      tip: 'Production-ready sandbox integration with bearer OAuth credentials and structured payload schemas.',
    },
    {
      id: 'ai-incorporation',
      label: 'Autonomous Agent Reasoning Loop (Structured Gemini Tool Calling)',
      done: true,
      tip: 'Agent executes deterministic tool calls for price evaluation and payment dispatch with zero hallucination.',
    },
    {
      id: 'policy-guardrails',
      label: 'Financial Policy Guardrails (Hard Spending Bounds & 2FA Escalation)',
      done: true,
      tip: 'Strict ceiling on autonomous settlement; discretionary transactions trigger step-up authorization.',
    },
    {
      id: 'idempotency-keys',
      label: 'Idempotency & Resiliency (PayPal-Request-Id & Retry Circuit Breaker)',
      done: true,
      tip: 'Guarantees that network retries or agent loop replays never result in duplicate debit captures.',
    },
    {
      id: 'webhook-signatures',
      label: 'HMAC Webhook Verification (PAYPAL-AUTH-ALGO & Cert Header Validation)',
      done: true,
      tip: 'Verifies incoming asynchronous settlement notifications against PayPal public security certificates.',
    },
    {
      id: 'audit-ledger',
      label: 'Institutional Observability & Ledger Integration (AG Grid Audit Matrix)',
      done: false,
      tip: 'Immutable audit trail logging every agent reasoning step, order ID, capture ID, and risk telemetry score.',
    },
    {
      id: 'security-secrets',
      label: 'Zero-Trust Secrets Isolation (Server-Side Proxy & Secure Key Store)',
      done: true,
      tip: 'PayPal client secrets and LLM credentials are strictly confined to backend proxy environments.',
    },
  ]);

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const completedCount = checklist.filter((i) => i.done).length;
  const readinessPercent = Math.round((completedCount / checklist.length) * 100);

  const evaluatePitch = async () => {
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/incubator/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: projectTitle,
          pitch,
          payPalApis,
          repoUrl,
          demoUrl,
        }),
      });
      const data: RubricEvaluation = await res.json();
      setEvaluation(data);
    } catch (err) {
      console.error('Failed to run audit evaluation:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 mb-1">
            <span className="bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-700/60 font-mono">
              Enterprise Governance
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300">Production Assurance & Compliance Audit</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Governance & Compliance Audit Matrix
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Audit autonomous commerce architectures against enterprise financial security invariants, PayPal REST v2 requirements, resilience criteria, and institutional compliance standards.
          </p>
        </div>

        <button
          onClick={evaluatePitch}
          disabled={isEvaluating}
          className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#003087] to-[#0079C1] hover:brightness-110 active:scale-[0.99] disabled:opacity-50 rounded-lg shadow-sm shadow-sky-950 transition-all whitespace-nowrap self-start lg:self-auto"
        >
          <Sparkles className="w-4 h-4 fill-current text-sky-200" />
          <span>{isEvaluating ? 'Auditing Architecture...' : 'Run Compliance Audit'}</span>
        </button>
      </div>

      {/* Main Grid: Submission Input & Checklist vs Rubric Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (6 Cols): Input Pitch Form & Pre-Flight Checklist */}
        <div className="lg:col-span-6 space-y-5">
          {/* Solution Scope Dossier Box */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-sky-400" />
              Solution Architecture Dossier
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Platform / Protocol Name</label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Architecture Summary & Financial Invariant Description
              </label>
              <textarea
                rows={3}
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-sky-500 transition-colors"
                placeholder="Explain the operational problem, AI decision engine, spending limits, and PayPal checkout mechanism..."
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                PayPal Developer REST APIs Integrated
              </label>
              <input
                type="text"
                value={payPalApis}
                onChange={(e) => setPayPalApis(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">Repository Reference</label>
                <input
                  type="text"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 font-mono focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">Environment Verification URL</label>
                <input
                  type="text"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 font-mono focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Deployment Pre-Flight Checklist */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <Target className="w-4 h-4 text-sky-400" />
                  Production Deployment Readiness
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Verify enterprise security controls and invariant specifications
                </p>
              </div>

              <div className="text-right">
                <span className="font-mono tabular-nums text-sm font-bold text-sky-400">
                  {readinessPercent}%
                </span>
                <div className="text-[10px] text-slate-500">
                  {completedCount} of {checklist.length} verified
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${readinessPercent}%` }}
              />
            </div>

            {/* Checklist items */}
            <div className="space-y-2 pt-1">
              {checklist.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-start gap-3 ${
                    item.done
                      ? 'border-emerald-800/40 bg-emerald-950/20 text-slate-200'
                      : 'border-slate-800/80 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {item.done ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                  <div>
                    <div className={item.done ? 'font-medium text-slate-200 line-through text-slate-400' : 'font-medium text-slate-200'}>
                      {item.label}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{item.tip}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (6 Cols): Scoring Results & Official Criteria Breakdown */}
        <div className="lg:col-span-6 space-y-5">
          {evaluation ? (
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 space-y-5">
              {/* Score Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-sky-400">
                    Enterprise Assurance Rating
                  </span>
                  <div className="text-lg font-bold text-white mt-0.5">{evaluation.verdict}</div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-mono tabular-nums font-extrabold text-emerald-400">
                    {evaluation.totalScore}
                    <span className="text-sm font-normal text-slate-500">/100</span>
                  </div>
                  <div className="text-[10px] text-slate-400">Enterprise Compliance Index</div>
                </div>
              </div>

              {/* Rubric Breakdown Bars */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Criteria Score Breakdown
                </h4>

                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Financial Security Invariants (25%)</span>
                      <span className="font-mono text-slate-200 font-semibold">
                        {evaluation.scores.technicalExecution}/25
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sky-500"
                        style={{ width: `${(evaluation.scores.technicalExecution / 25) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">PayPal REST Integration Depth (25%)</span>
                      <span className="font-mono text-slate-200 font-semibold">
                        {evaluation.scores.innovation}/25
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500"
                        style={{ width: `${(evaluation.scores.innovation / 25) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Operational Resilience (20%)</span>
                      <span className="font-mono text-slate-200 font-semibold">
                        {evaluation.scores.impact}/20
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500"
                        style={{ width: `${(evaluation.scores.impact / 20) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Governance & Step-Up Controls (15%)</span>
                      <span className="font-mono text-slate-200 font-semibold">
                        {evaluation.scores.userExperience}/15
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500"
                        style={{ width: `${(evaluation.scores.userExperience / 15) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Auditability & Ledger Integrity (15%)</span>
                      <span className="font-mono text-slate-200 font-semibold">
                        {evaluation.scores.presentation}/15
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500"
                        style={{ width: `${(evaluation.scores.presentation / 15) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Strengths & Actionable Tips */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Architectural Strengths
                </h4>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  {evaluation.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Enterprise Optimization Recommendations
                </h4>
                <div className="space-y-2">
                  {evaluation.actionableTips.map((tip, i) => (
                    <div
                      key={i}
                      className="p-3 bg-amber-950/20 border border-amber-800/40 rounded-lg text-xs text-amber-200 leading-relaxed"
                    >
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Award className="w-4 h-4 text-sky-400" />
                Enterprise Compliance Standards
              </h3>
              <p className="text-xs text-slate-400">
                Architectures are benchmarked on a 100-point index across 5 core fintech assurance pillars:
              </p>

              <div className="space-y-3 pt-1">
                {ENTERPRISE_GOVERNANCE_CRITERIA.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-lg space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200">
                        {item.criterion}
                      </span>
                      <span className="font-mono text-xs font-bold text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800/50">
                        {item.weight}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={evaluatePitch}
                  className="w-full py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
                >
                  Run Compliance Audit Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
