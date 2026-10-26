import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  FileText,
  Copy,
  Check,
  Download,
  ShieldAlert,
  ArrowRight,
  Send,
  Zap,
  Cpu,
  CheckCircle,
  Table,
  Code2,
  Server,
  Calendar,
  ShoppingBag
} from 'lucide-react';
import { HACKATHON_TRACKS } from '../data/hackathonData';
import { ProjectBlueprint } from '../types/hackathon';

export const ProjectIncubator: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<string>(HACKATHON_TRACKS[0].name);
  const [domain, setDomain] = useState<string>('Autonomous B2B Supply Chain & Procurement');
  const [techStack, setTechStack] = useState<string>('TypeScript, Gemini 3.8 Flash, PayPal Orders v2, AG Grid, Bryntum, Channel3, APIMatic, Render');
  const [customIdea, setCustomIdea] = useState<string>(
    'Multi-agent procurement swarm that negotiates supplier quotes, enforces spending limits, and executes zero-touch PayPal checkout with institutional AG Grid telemetry.'
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [blueprint, setBlueprint] = useState<ProjectBlueprint | null>(null);
  const [activeTab, setActiveTab] = useState<'architecture' | 'devpost' | 'ecosystem'>('architecture');
  const [copied, setCopied] = useState<boolean>(false);

  const generateBlueprint = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/incubator/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          track: selectedTrack,
          domain,
          techStack,
          projectIdea: customIdea,
        }),
      });
      const data: ProjectBlueprint = await res.json();
      setBlueprint(data);
    } catch (err) {
      console.error('Failed to generate solution blueprint:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyDraft = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    if (!blueprint) return;
    const content = `# ${blueprint.projectName}
> ${blueprint.tagline}

**Strategic Solution Domain:** ${blueprint.solutionDomain}
**Strategic Value Proposition:** ${blueprint.valueProposition}

## Executive Summary
${blueprint.executiveSummary}

## Architecture
- **Agentic Decision Loop:** ${blueprint.architecture.agenticLoop}
- **PayPal REST APIs:** ${blueprint.architecture.payPalComponents.join(', ')}
- **AI & Reasoning Stack:** ${blueprint.architecture.aiComponents.join(', ')}
- **Financial Security Guardrails:** ${blueprint.architecture.securityGuardrails.join(', ')}

## Executive Solution Whitepaper & Dossier
### Executive Overview
${blueprint.devpostSubmission.elevatorPitch}

### Enterprise Motivation & Operational Context
${blueprint.devpostSubmission.inspiration}

### Technical Implementation & Multi-Software Orchestration
${blueprint.devpostSubmission.howWeBuiltIt}

### Architectural Hurdles Solved
${blueprint.devpostSubmission.challengesFaced}

### System Verification & Milestones
${blueprint.devpostSubmission.accomplishments}

### Enterprise Production Scaling Roadmap
${blueprint.devpostSubmission.whatsNext}

## Multi-Technology System Architecture & Feature Matrix
${(blueprint.softwareEcosystem || []).map((s) => `### ${s.name} (${s.category})
- **Role:** ${s.role}
- **Implementation:** ${s.implementation}
- **Feature Capability:** ${s.featureCapability || (s as any).winningCriteria}
- **Status:** ${s.status}
`).join('\n')}
`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${blueprint.projectName.toLowerCase().replace(/\s+/g, '-')}-whitepaper.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 mb-1">
            <span className="bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-700/60 font-mono">
              Enterprise Solution Architecture
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300">PayPal REST v2 Orchestration Studio</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Architecture Studio & Whitepaper Generator
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Synthesize enterprise-ready autonomous payment architectures, PayPal Sandbox REST orchestration plans, multi-software ecosystem integrations, and authoritative whitepapers.
          </p>
        </div>

        <button
          onClick={generateBlueprint}
          disabled={isGenerating}
          className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#003087] to-[#0079C1] hover:brightness-110 active:scale-[0.99] disabled:opacity-50 rounded-lg shadow-sm shadow-sky-950 transition-all whitespace-nowrap self-start lg:self-auto"
        >
          <Sparkles className="w-4 h-4 fill-current text-sky-200" />
          <span>{isGenerating ? 'Synthesizing Architecture...' : 'Generate Solution Blueprint'}</span>
        </button>
      </div>

      {/* Generator Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Track / Pillar Picker */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
            <span>1. Strategic Solution Domain</span>
            <span className="text-[10px] text-sky-400 font-mono">Enterprise Pillar</span>
          </label>
          <select
            value={selectedTrack}
            onChange={(e) => setSelectedTrack(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 transition-colors"
          >
            {HACKATHON_TRACKS.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Targets core enterprise capabilities across supply chain, merchant risk defense, and high-frequency settlement.
          </p>
        </div>

        {/* Domain Scope */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
            <span>2. Industry Domain Scope</span>
            <span className="text-[10px] text-emerald-400 font-mono">Vertical Market</span>
          </label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 transition-colors"
            placeholder="e.g. Healthcare Procurement, Cloud Compute Billing..."
          />
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Specify the operational context, commercial stakeholders, and procurement dynamics.
          </p>
        </div>

        {/* Tech Stack Customization */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
            <span>3. Complete Software Tooling</span>
            <span className="text-[10px] text-indigo-400 font-mono">Unified Stack</span>
          </label>
          <input
            type="text"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 transition-colors"
          />
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Unites PayPal REST APIs, AG Grid, APIMatic SDKs, Render, and Gemini 3.8 Flash.
          </p>
        </div>
      </div>

      {/* Custom Idea Prompt */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
          <span>Operational Objectives & Financial Invariant Boundaries</span>
          <span className="text-[11px] text-slate-500 font-normal">Custom instructions</span>
        </label>
        <div className="flex gap-2">
          <textarea
            rows={2}
            value={customIdea}
            onChange={(e) => setCustomIdea(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500 transition-colors"
            placeholder="Describe specific workflow goals, spending policy rules, or PayPal REST integrations..."
          />
          <button
            onClick={generateBlueprint}
            disabled={isGenerating}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-semibold rounded-lg border border-slate-700 transition-colors self-end flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Apply</span>
          </button>
        </div>
      </div>

      {/* Generated Blueprint Dossier View */}
      {blueprint ? (
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden space-y-6">
          {/* Header Banner */}
          <div className="p-6 bg-gradient-to-r from-slate-900 via-sky-950/30 to-slate-900 border-b border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold font-mono bg-sky-950 text-sky-300 border border-sky-800/60">
                    {blueprint.solutionDomain}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    Enterprise Assurance High
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  {blueprint.projectName}
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  {blueprint.tagline}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto">
                <button
                  onClick={downloadMarkdown}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-sky-400 hover:text-sky-300 bg-sky-950/60 hover:bg-sky-900/60 rounded-lg border border-sky-800/50 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Whitepaper (.md)</span>
                </button>

                <button
                  onClick={() => copyDraft(JSON.stringify(blueprint, null, 2))}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-lg border border-slate-700 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Blueprint'}</span>
                </button>
              </div>
            </div>

            {/* Strategic Value Proposition Banner */}
            <div className="mt-4 p-3 bg-sky-950/40 border border-sky-800/40 rounded-lg text-xs text-sky-200 flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Strategic Value Proposition & ROI: </span>
                {blueprint.valueProposition}
              </div>
            </div>
          </div>

          {/* Sub-tabs */}
          <div className="px-6">
            <div className="flex items-center gap-2 border-b border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('architecture')}
                className={`flex items-center gap-2 px-4 py-2 font-medium border-b-2 transition-colors ${
                  activeTab === 'architecture'
                    ? 'border-sky-400 text-sky-400 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-4 h-4" />
                Technical Architecture
              </button>
              <button
                onClick={() => setActiveTab('devpost')}
                className={`flex items-center gap-2 px-4 py-2 font-medium border-b-2 transition-colors ${
                  activeTab === 'devpost'
                    ? 'border-sky-400 text-sky-400 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                Executive Whitepaper
              </button>
              <button
                onClick={() => setActiveTab('ecosystem')}
                className={`flex items-center gap-2 px-4 py-2 font-medium border-b-2 transition-colors ${
                  activeTab === 'ecosystem'
                    ? 'border-sky-400 text-sky-400 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Cpu className="w-4 h-4" />
                Software Ecosystem & Criteria Matrix
              </button>
            </div>
          </div>

          {/* Content Pane */}
          <div className="px-6 pb-6">
            {activeTab === 'architecture' && (
              <div className="space-y-5">
                {/* Executive Summary */}
                <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Executive Summary
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {blueprint.executiveSummary}
                  </p>
                </div>

                {/* Agentic Loop */}
                <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400">
                    Autonomous Agent Decision & Settlement Loop
                  </h4>
                  <p className="text-xs font-mono text-slate-300 bg-slate-900/90 p-3 rounded-lg border border-slate-800 leading-relaxed">
                    {blueprint.architecture.agenticLoop}
                  </p>
                </div>

                {/* Stack components grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-950/50 border border-slate-800/80 rounded-xl space-y-2">
                    <h5 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-sky-400" />
                      PayPal REST APIs Integrated
                    </h5>
                    <ul className="text-xs text-slate-400 space-y-1">
                      {blueprint.architecture.payPalComponents.map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-sky-400 font-bold">·</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-950/50 border border-slate-800/80 rounded-xl space-y-2">
                    <h5 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                      AI & Reasoning Stack
                    </h5>
                    <ul className="text-xs text-slate-400 space-y-1">
                      {blueprint.architecture.aiComponents.map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-sky-400 font-bold">·</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-950/50 border border-slate-800/80 rounded-xl space-y-2">
                    <h5 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-sky-400" />
                      Financial Security Guardrails
                    </h5>
                    <ul className="text-xs text-slate-400 space-y-1">
                      {blueprint.architecture.securityGuardrails.map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">·</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Key Architectural Capabilities & PayPal Hooks
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {blueprint.keyFeatures.map((feat, i) => (
                      <div
                        key={i}
                        className="p-3.5 bg-slate-950/40 border border-slate-800/70 rounded-xl space-y-1.5"
                      >
                        <div className="font-semibold text-xs text-slate-200">{feat.title}</div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {feat.description}
                        </p>
                        <div className="text-[10px] font-mono text-sky-400 pt-1">
                          Hook: {feat.payPalHook}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'devpost' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400">
                    Structured executive whitepaper sections ready for stakeholders, board review, and compliance verification.
                  </p>
                  <button
                    onClick={() =>
                      copyDraft(
                        `### Executive Overview\n${blueprint.devpostSubmission.elevatorPitch}\n\n### Operational Motivation\n${blueprint.devpostSubmission.inspiration}\n\n### Technical Implementation\n${blueprint.devpostSubmission.howWeBuiltIt}\n\n### Engineering Hurdles Solved\n${blueprint.devpostSubmission.challengesFaced}\n\n### Accomplishments & Verification\n${blueprint.devpostSubmission.accomplishments}\n\n### Production Scaling Roadmap\n${blueprint.devpostSubmission.whatsNext}`
                      )
                    }
                    className="flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-medium"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Complete Whitepaper</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                      Executive Overview
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {blueprint.devpostSubmission.elevatorPitch}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Operational Motivation & Context
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {blueprint.devpostSubmission.inspiration}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Technical Implementation & Multi-Software Synergy
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {blueprint.devpostSubmission.howWeBuiltIt}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Engineering Hurdles Solved
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {blueprint.devpostSubmission.challengesFaced}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        System Verification & Milestones
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {blueprint.devpostSubmission.accomplishments}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Enterprise Roadmap for {blueprint.projectName}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {blueprint.devpostSubmission.whatsNext}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ecosystem' && (
              <div className="space-y-5">
                {/* Overview banner explaining multi-technology integration */}
                <div className="p-4 bg-gradient-to-r from-slate-950 via-sky-950/40 to-slate-950 border border-sky-800/40 rounded-xl flex items-start gap-3">
                  <Zap className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-white text-sm">
                      Full-Stack Partner Technology Integration & Implementation Specifications
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      By incorporating and synthesizing every partner technology (PayPal REST APIs, Google Gemini 3.8 Flash, Autonomous Agentic Commerce Protocol, AG Grid Enterprise, Bryntum Scheduler, Channel3 Commerce Intelligence, APIMatic SDKs, and Render Cloud), this platform delivers an end-to-end, production-grade autonomous commerce architecture.
                    </p>
                  </div>
                </div>

                {/* Software Matrix Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(blueprint.softwareEcosystem || []).map((soft, i) => (
                    <div
                      key={i}
                      className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-3 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {soft.name.includes('PayPal') ? (
                            <Zap className="w-4 h-4 text-sky-400" />
                          ) : soft.name.includes('AG Grid') ? (
                            <Table className="w-4 h-4 text-emerald-400" />
                          ) : soft.name.includes('Bryntum') ? (
                            <Calendar className="w-4 h-4 text-rose-400" />
                          ) : soft.name.includes('Channel3') ? (
                            <ShoppingBag className="w-4 h-4 text-amber-400" />
                          ) : soft.name.includes('APIMatic') ? (
                            <Code2 className="w-4 h-4 text-indigo-400" />
                          ) : soft.name.includes('Render') ? (
                            <Server className="w-4 h-4 text-purple-400" />
                          ) : (
                            <Sparkles className="w-4 h-4 text-amber-400" />
                          )}
                          <span className="font-bold text-sm text-white">{soft.name}</span>
                        </div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-800/50">
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                          {soft.status}
                        </span>
                      </div>

                      <div className="text-xs text-sky-300 font-mono">
                        {soft.category} · {soft.role}
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs">
                        <div>
                          <span className="font-semibold text-slate-300">Implementation: </span>
                          <span className="text-slate-400">{soft.implementation}</span>
                        </div>
                        <div className="pt-1">
                          <span className="font-semibold text-sky-300">Core Feature Capability: </span>
                          <span className="text-slate-300 font-medium">{soft.featureCapability || (soft as any).winningCriteria}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl p-12 text-center space-y-2">
          <Sparkles className="w-8 h-8 mx-auto text-sky-400/60" />
          <h3 className="text-sm font-semibold text-slate-300">
            Click "Generate Solution Blueprint" to Synthesize an Architecture
          </h3>
          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            Select a strategic solution pillar and enterprise domain to formulate a complete technical architecture, PayPal REST integration model, multi-software ecosystem matrix, and executive whitepaper.
          </p>
        </div>
      )}
    </div>
  );
};
