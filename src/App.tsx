import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CountdownBanner } from './components/CountdownBanner';
import { AgentSimulator } from './components/AgentSimulator';
import { ProjectIncubator } from './components/ProjectIncubator';
import { DevpostOptimizer } from './components/DevpostOptimizer';
import { ApiExplorer } from './components/ApiExplorer';
import { HackathonOverview } from './components/HackathonOverview';
import { AgGridLedger } from './components/AgGridLedger';
import { TechnologyMatrix } from './components/TechnologyMatrix';
import { BryntumScheduler } from './components/BryntumScheduler';
import { Terminal, Sparkles, BookOpen, Table, Code2, ShieldCheck, Cpu, Calendar } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('simulator');

  const handleSelectTrackForIncubation = (_trackName: string) => {
    setActiveTab('incubator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAgGrid = () => {
    setActiveTab('aggrid');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickSimulate = () => {
    setActiveTab('simulator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-sky-500/25 selection:text-sky-300">
      {/* Top Bar (Complies with 3-Zone Contract) */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onQuickSimulate={handleQuickSimulate}
      />

      {/* Protocol Telemetry & Governance Status Banner */}
      <CountdownBanner />

      {/* Workspace Toolbar / Segmented Mode Selector */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800/80 rounded-xl overflow-x-auto text-xs">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 px-3.5 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'simulator'
                  ? 'bg-sky-500 text-white font-semibold shadow-sm shadow-sky-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Agentic Sandbox</span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`flex items-center gap-2 px-3.5 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'matrix'
                  ? 'bg-sky-500 text-white font-semibold shadow-sm shadow-sky-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-sky-300" />
              <span>Technology Matrix</span>
            </button>

            <button
              onClick={() => setActiveTab('incubator')}
              className={`flex items-center gap-2 px-3.5 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'incubator'
                  ? 'bg-sky-500 text-white font-semibold shadow-sm shadow-sky-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Architecture Studio</span>
            </button>

            <button
              onClick={() => setActiveTab('aggrid')}
              className={`flex items-center gap-2 px-3.5 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'aggrid'
                  ? 'bg-sky-500 text-white font-semibold shadow-sm shadow-sky-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Table className="w-3.5 h-3.5 text-emerald-300" />
              <span>Financial Ledger</span>
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-2 px-3.5 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'timeline'
                  ? 'bg-rose-600 text-white font-semibold shadow-sm shadow-rose-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-rose-300" />
              <span>Procurement Timeline</span>
            </button>

            <button
              onClick={() => setActiveTab('rubrics')}
              className={`flex items-center gap-2 px-3.5 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'rubrics'
                  ? 'bg-sky-500 text-white font-semibold shadow-sm shadow-sky-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Governance & Audit</span>
            </button>

            <button
              onClick={() => setActiveTab('api')}
              className={`flex items-center gap-2 px-3.5 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'api'
                  ? 'bg-sky-500 text-white font-semibold shadow-sm shadow-sky-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>REST Sandbox APIs</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-2 px-3.5 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'guide'
                  ? 'bg-sky-500 text-white font-semibold shadow-sm shadow-sky-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Solutions & Standards</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
            <span>PayPal Sandbox REST API v2</span>
            <span className="text-slate-600">·</span>
            <span className="font-mono text-emerald-400 font-semibold">Production Ready</span>
          </div>
        </div>
      </div>

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {activeTab === 'simulator' && <AgentSimulator onNavigateTab={setActiveTab} />}
        {activeTab === 'matrix' && <TechnologyMatrix onNavigateTab={setActiveTab} />}
        {activeTab === 'incubator' && <ProjectIncubator />}
        {activeTab === 'aggrid' && <AgGridLedger />}
        {activeTab === 'timeline' && <BryntumScheduler onNavigateTab={setActiveTab} />}
        {activeTab === 'rubrics' && <DevpostOptimizer />}
        {activeTab === 'api' && <ApiExplorer />}
        {activeTab === 'guide' && (
          <HackathonOverview
            onSelectTrackForIncubation={handleSelectTrackForIncubation}
            onOpenAgGrid={handleOpenAgGrid}
          />
        )}
      </main>

      {/* Institutional Enterprise Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-8 px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-200">PayPal Agentic Commerce</span>
            <span>·</span>
            <span>Autonomous Payment Protocol & Financial Governance Platform</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => setActiveTab('matrix')} className="hover:text-sky-400 transition-colors">
              Technology Matrix
            </button>
            <span>·</span>
            <button onClick={() => setActiveTab('timeline')} className="hover:text-rose-400 transition-colors">
              Bryntum Timeline
            </button>
            <span>·</span>
            <button onClick={() => setActiveTab('simulator')} className="hover:text-sky-400 transition-colors">
              Agent Simulator
            </button>
            <span>·</span>
            <button onClick={() => setActiveTab('aggrid')} className="hover:text-sky-400 transition-colors">
              Audit Ledger
            </button>
            <span>·</span>
            <a
              href="https://developer.paypal.com/docs/api/overview/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 font-medium"
            >
              PayPal REST Documentation
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
