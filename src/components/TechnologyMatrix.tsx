import React, { useState } from 'react';
import {
  Zap,
  Table,
  Code2,
  Server,
  Sparkles,
  CheckCircle,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  FileCode,
  Calendar,
  ShoppingBag,
  Sliders
} from 'lucide-react';
import { HOW_WE_USED_EACH_TECHNOLOGY, TechnologyImplementation } from '../data/hackathonData';

interface TechnologyMatrixProps {
  onNavigateTab: (tabId: string) => void;
}

export const TechnologyMatrix: React.FC<TechnologyMatrixProps> = ({ onNavigateTab }) => {
  const [selectedTechId, setSelectedTechId] = useState<string>('all');

  const techIcons: Record<string, React.ReactNode> = {
    paypal: <Zap className="w-5 h-5 text-sky-400" />,
    gemini: <Sparkles className="w-5 h-5 text-amber-400" />,
    agentic: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
    aggrid: <Table className="w-5 h-5 text-emerald-400" />,
    bryntum: <Calendar className="w-5 h-5 text-rose-400" />,
    channel3: <ShoppingBag className="w-5 h-5 text-orange-400" />,
    apimatic: <Code2 className="w-5 h-5 text-indigo-400" />,
    render: <Server className="w-5 h-5 text-purple-400" />,
  };

  const displayedTechs =
    selectedTechId === 'all'
      ? HOW_WE_USED_EACH_TECHNOLOGY
      : HOW_WE_USED_EACH_TECHNOLOGY.filter((t) => t.id === selectedTechId);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-8 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-sky-950/20 to-transparent pointer-events-none" />

        <div className="max-w-4xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950 border border-sky-800/60 text-xs font-semibold text-sky-300">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Integrated System Architecture · Complete 8-Technology Engineering Showcase</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            How We Architected Each Technology
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            A transparent engineering breakdown of how the <strong>PayPal Developer Platform</strong>, <strong>Google Gemini 3.8 Flash</strong>, <strong>Agentic Commerce Policy Protocol</strong>, <strong>AG Grid Enterprise</strong>, <strong>Bryntum Scheduler</strong>, <strong>Channel3 Commerce Intelligence</strong>, <strong>APIMatic SDK Engine</strong>, and <strong>Render Cloud</strong> are orchestrated into one unified, production-grade autonomous commerce platform.
          </p>
        </div>
      </div>

      {/* Filter / Technology Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setSelectedTechId('all')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            selectedTechId === 'all'
              ? 'bg-sky-500 text-white shadow-sm'
              : 'text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All 8 Technologies ({HOW_WE_USED_EACH_TECHNOLOGY.length})</span>
        </button>

        {HOW_WE_USED_EACH_TECHNOLOGY.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedTechId(t.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedTechId === t.id
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800'
            }`}
          >
            {techIcons[t.id] || <Cpu className="w-4 h-4" />}
            <span>{t.name}</span>
          </button>
        ))}
      </div>

      {/* Feature-by-Feature Spectacular Grid / List */}
      <div className="space-y-8">
        {displayedTechs.map((tech) => (
          <div
            key={tech.id}
            className="bg-slate-900/50 border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg transition-all hover:border-slate-700"
          >
            {/* Tech Header Banner */}
            <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded font-mono text-xs font-semibold bg-sky-950 text-sky-300 border border-sky-800/60">
                    {techIcons[tech.id] || <Cpu className="w-4 h-4 text-sky-400" />}
                    {tech.provider}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    Verified Active in Platform
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Category: {tech.category}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span>{tech.name}</span>
                  <span className="text-slate-500 text-sm font-normal">·</span>
                  <span className="text-slate-300 text-sm font-medium">{tech.tagline}</span>
                </h2>

                <p className="text-xs text-slate-300 max-w-4xl leading-relaxed pt-1">
                  <strong>Core Feature Role:</strong> {tech.featureDescription}
                </p>
              </div>

              {/* Action button to test/view live */}
              <button
                onClick={() => onNavigateTab(tech.interactiveTargetTab)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-sky-600 rounded-lg transition-colors border border-slate-700 hover:border-sky-500 shrink-0 self-start md:self-auto"
              >
                <span>{tech.interactiveButtonLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Implementation Deep Dive - The 4 Feature Cards */}
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-sky-400" />
                  <span>How We Implemented This Feature in the Application</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-500">
                  4 Architectural Invariants Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tech.howWeUsedIt.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-2 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold text-xs text-slate-100 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-sky-400 font-mono text-[10px] flex items-center justify-center font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <span>{item.title}</span>
                      </div>
                      {item.codeRef && (
                        <span className="font-mono text-[10px] text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800/40 shrink-0">
                          {item.codeRef}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed pl-6.5">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Architectural Highlights / Guarantees Pill Bar */}
              <div className="p-3.5 bg-slate-950/40 border border-slate-800/70 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-slate-200">Guaranteed System Invariants:</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {tech.architectureHighlights.map((hl, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {hl}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
