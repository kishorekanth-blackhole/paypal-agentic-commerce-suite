import { ExternalLink, Terminal, Sparkles, BookOpen, ShieldCheck, Code2, Table, Cpu, Calendar } from 'lucide-react';
import { PLATFORM_METADATA } from '../data/hackathonData';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onQuickSimulate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-6 py-3.5 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Zone 1: Brand Wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#003087] via-[#0079C1] to-sky-400 flex items-center justify-center shadow-inner">
          <span className="font-bold text-white text-base tracking-tighter">P</span>
        </div>
        <div className="flex items-baseline gap-2">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onTabChange('simulator');
            }}
            className="text-base font-bold tracking-tight text-white hover:text-sky-300 transition-colors whitespace-nowrap"
          >
            PayPal Agentic Commerce
          </a>
          <span className="text-xs font-semibold text-sky-400 tracking-wider uppercase">
            Enterprise Suite
          </span>
        </div>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-300">
        <button
          onClick={() => onTabChange('simulator')}
          className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'simulator'
              ? 'text-sky-400 border-b-2 border-sky-400 font-semibold'
              : 'text-slate-400 hover:text-slate-100'
          }`}
        >
          <Terminal className="w-4 h-4" />
          Agent Sandbox
        </button>

        <button
          onClick={() => onTabChange('matrix')}
          className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'matrix'
              ? 'text-sky-400 border-b-2 border-sky-400 font-semibold'
              : 'text-slate-400 hover:text-slate-100'
          }`}
        >
          <Cpu className="w-4 h-4 text-sky-400" />
          Technology Matrix
        </button>

        <button
          onClick={() => onTabChange('incubator')}
          className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'incubator'
              ? 'text-sky-400 border-b-2 border-sky-400 font-semibold'
              : 'text-slate-400 hover:text-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Architecture Studio
        </button>

        <button
          onClick={() => onTabChange('aggrid')}
          className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'aggrid'
              ? 'text-sky-400 border-b-2 border-sky-400 font-semibold'
              : 'text-slate-400 hover:text-slate-100'
          }`}
        >
          <Table className="w-4 h-4" />
          Financial Ledger
        </button>

        <button
          onClick={() => onTabChange('timeline')}
          className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'timeline'
              ? 'text-rose-400 border-b-2 border-rose-400 font-semibold'
              : 'text-slate-400 hover:text-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4 text-rose-400" />
          Procurement Timeline
        </button>

        <button
          onClick={() => onTabChange('rubrics')}
          className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'rubrics'
              ? 'text-sky-400 border-b-2 border-sky-400 font-semibold'
              : 'text-slate-400 hover:text-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Governance & Audit
        </button>

        <button
          onClick={() => onTabChange('api')}
          className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'api'
              ? 'text-sky-400 border-b-2 border-sky-400 font-semibold'
              : 'text-slate-400 hover:text-slate-100'
          }`}
        >
          <Code2 className="w-4 h-4" />
          REST APIs
        </button>

        <button
          onClick={() => onTabChange('guide')}
          className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'guide'
              ? 'text-sky-400 border-b-2 border-sky-400 font-semibold'
              : 'text-slate-400 hover:text-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Solutions & Standards
        </button>
      </nav>

      {/* Zone 3: Primary Action */}
      <div className="flex items-center gap-3 shrink-0">
        <a
          href="https://developer.paypal.com/docs/api/overview/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap"
        >
          <span>Developer Docs</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>
    </header>
  );
};
