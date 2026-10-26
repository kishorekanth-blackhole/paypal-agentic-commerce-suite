import React, { useState, useEffect } from 'react';
import { ShieldCheck, Activity, Terminal, ExternalLink, Cpu, CheckCircle } from 'lucide-react';

export const CountdownBanner: React.FC = () => {
  const [pulse, setPulse] = useState<boolean>(true);
  const [processedEvents, setProcessedEvents] = useState<number>(14280);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => !p);
      setProcessedEvents((prev) => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800/80 px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Protocol Standard & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-950/80 border border-sky-800/50 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-sky-400">
                Autonomous Agent Protocol (AAP-2026)
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${pulse ? 'opacity-100' : 'opacity-40'} transition-opacity`} />
                Zero-Trust Financial Invariants Active
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Enterprise policy guardrails, cryptographic spending bounds, and PayPal Sandbox REST integration
            </p>
          </div>
        </div>

        {/* Live Network & Sandbox Telemetry */}
        <div className="flex items-center gap-5 text-xs">
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300">
            <Activity className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-slate-400">Ledger Verified:</span>
            <span className="font-mono text-emerald-300 font-semibold">{processedEvents.toLocaleString()} tx</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-slate-400">Environment:</span>
            <span className="font-mono text-slate-200 font-medium">REST Sandbox v2</span>
          </div>

          <a
            href="https://developer.paypal.com/docs/api/overview/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-300 hover:text-white bg-sky-950/70 hover:bg-sky-900/80 border border-sky-800/60 rounded-lg transition-colors whitespace-nowrap"
          >
            <span>Platform Docs</span>
            <ExternalLink className="w-3 h-3 text-sky-400" />
          </a>
        </div>
      </div>
    </div>
  );
};
