import React, { useState } from 'react';
import {
  ShieldCheck,
  Calendar,
  ExternalLink,
  BookOpen,
  CheckCircle,
  Sparkles,
  Layers,
  Award,
  Zap,
  ArrowRight,
  ShieldAlert,
  Code2,
  FileText,
  DollarSign,
  Cpu,
  Target,
  Table
} from 'lucide-react';
import {
  PLATFORM_METADATA,
  ENTERPRISE_SOLUTION_TRACKS,
  OFFICIAL_SPONSOR_LIST,
  ENTERPRISE_DEPLOYMENT_STANDARDS,
  ENTERPRISE_GOVERNANCE_CRITERIA
} from '../data/hackathonData';

interface HackathonOverviewProps {
  onSelectTrackForIncubation: (trackName: string) => void;
  onOpenAgGrid: () => void;
}

export const HackathonOverview: React.FC<HackathonOverviewProps> = ({
  onSelectTrackForIncubation,
  onOpenAgGrid,
}) => {
  const [activeTab, setActiveTab] = useState<'pillars' | 'ecosystem' | 'standards'>('pillars');

  return (
    <div className="space-y-8">
      {/* Hero Overview Card */}
      <div className="p-8 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-sky-950/20 to-transparent pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-950 border border-sky-800/60 text-xs font-semibold text-sky-300">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Autonomous Agentic Commerce & Enterprise Financial Governance</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            PayPal Agentic Commerce Platform
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Architect, simulate, and deploy enterprise-grade autonomous commerce agents integrating the <strong>PayPal Developer Platform</strong> (REST API v2) with frontier cognitive AI models. Enforce zero-trust financial guardrails, hard spending bounds, and real-time ledger observability.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Cpu className="w-4 h-4 text-sky-400" />
              <span>
                <strong>Environment:</strong> PayPal Developer Sandbox (REST API v2)
              </span>
            </div>

            <span className="text-slate-600 hidden sm:inline">·</span>

            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Deterministic Policy Invariants Enforced</span>
            </div>

            <span className="text-slate-600 hidden sm:inline">·</span>

            <a
              href="https://developer.paypal.com/docs/api/overview/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 font-semibold inline-flex items-center gap-1 underline underline-offset-4"
            >
              <span>PayPal REST Documentation</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveTab('pillars')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'pillars'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-sky-300" />
            <span>Strategic Solution Pillars</span>
          </button>

          <button
            onClick={() => setActiveTab('ecosystem')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'ecosystem'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-sky-300" />
            <span>Enterprise Integration Ecosystem</span>
          </button>

          <button
            onClick={() => setActiveTab('standards')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'standards'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-300" />
            <span>Deployment & Compliance Standards</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Strategic Solution Pillars */}
      {activeTab === 'pillars' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENTERPRISE_SOLUTION_TRACKS.map((track) => (
              <div
                key={track.id}
                className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-sky-950 text-sky-300 border border-sky-800/50">
                      {track.tier}
                    </span>
                    <Sparkles className="w-4 h-4 text-sky-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    {track.name}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {track.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Core System Capabilities
                    </span>
                    <ul className="text-xs text-slate-400 space-y-1">
                      {track.keyRequirements.slice(0, 3).map((req, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-sky-400 font-bold">·</span>
                          <span className="line-clamp-2">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-800/60 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400 italic line-clamp-1">
                    {track.recommendedArchitecture.split(':')[0]}
                  </div>

                  <button
                    onClick={() => onSelectTrackForIncubation(track.name)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-sky-600 rounded-lg transition-colors shrink-0"
                  >
                    <span>Design</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Enterprise Integration Ecosystem */}
      {activeTab === 'ecosystem' && (
        <div className="space-y-6">
          <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-xl space-y-2">
            <h2 className="text-base font-bold text-white">
              Enterprise Technology Stack & Tooling Integrations
            </h2>
            <p className="text-xs text-slate-300">
              Integrate enterprise-grade developer tooling to deliver complete full-stack autonomous commerce solutions with high observability, verified type safety, and resilient infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {OFFICIAL_SPONSOR_LIST.map((tool, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-white">{tool.name}</div>
                  <span className="text-[11px] font-mono text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800/50">
                    {tool.role}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {tool.description}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  {tool.name === 'AG Grid' ? (
                    <button
                      onClick={onOpenAgGrid}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
                    >
                      <Table className="w-3.5 h-3.5" />
                      <span>Open Financial Ledger</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-500">Enterprise Verified</span>
                  )}

                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-sky-300 font-medium inline-flex items-center gap-1"
                  >
                    <span>Documentation</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Deployment & Compliance Standards */}
      {activeTab === 'standards' && (
        <div className="space-y-6">
          {/* Compliance Matrix */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-sky-400" />
              Enterprise Assurance & Architectural Evaluation Criteria
            </h3>
            <p className="text-xs text-slate-300">
              Autonomous commerce architectures are evaluated across five fundamental fintech assurance dimensions:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {ENTERPRISE_GOVERNANCE_CRITERIA.map((criterion, i) => (
                <div
                  key={i}
                  className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">
                      {criterion.criterion}
                    </span>
                    <span className="font-mono text-xs font-semibold text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800/50">
                      {criterion.weight}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {criterion.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Architectural Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
                <Code2 className="w-4 h-4" />
                <span>API Architecture</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2">
                {ENTERPRISE_DEPLOYMENT_STANDARDS.whatToBuild.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
                <ShieldAlert className="w-4 h-4" />
                <span>Security Invariants</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2">
                {ENTERPRISE_DEPLOYMENT_STANDARDS.projectRequirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
                <FileText className="w-4 h-4" />
                <span>Production Artifacts</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2">
                {ENTERPRISE_DEPLOYMENT_STANDARDS.whatToSubmit.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
