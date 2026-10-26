import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Zap,
  ArrowRight,
  Sparkles,
  Shield,
  FileCode,
  Table,
  Sliders,
  Maximize2
} from 'lucide-react';
import { BRYNTUM_SAMPLE_TASKS, CODE_SNIPPETS } from '../data/hackathonData';
import { BryntumTask } from '../types/hackathon';

interface BryntumSchedulerProps {
  onNavigateTab?: (tabId: string) => void;
}

export const BryntumScheduler: React.FC<BryntumSchedulerProps> = ({ onNavigateTab }) => {
  const [tasks, setTasks] = useState<BryntumTask[]>(BRYNTUM_SAMPLE_TASKS);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('task-3');
  const [timeScale, setTimeScale] = useState<'ms' | 'days'>('ms');
  const [filterPhase, setFilterPhase] = useState<string>('all');
  const [showCriticalPath, setShowCriticalPath] = useState<boolean>(true);
  const [showDependencies, setShowDependencies] = useState<boolean>(true);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);

  const selectedTask = tasks.find((t) => t.id === selectedTaskId) || tasks[0];

  const softwareColors: Record<string, { bg: string; text: string; border: string; bar: string }> = {
    Channel3: { bg: 'bg-amber-950/40', text: 'text-amber-300', border: 'border-amber-700/50', bar: 'from-amber-600 to-amber-500' },
    Gemini: { bg: 'bg-sky-950/40', text: 'text-sky-300', border: 'border-sky-700/50', bar: 'from-sky-600 to-sky-400' },
    PayPal: { bg: 'bg-blue-950/40', text: 'text-blue-300', border: 'border-blue-700/50', bar: 'from-[#003087] to-[#0079C1]' },
    Biometric: { bg: 'bg-purple-950/40', text: 'text-purple-300', border: 'border-purple-700/50', bar: 'from-purple-600 to-purple-400' },
    'AG Grid': { bg: 'bg-emerald-950/40', text: 'text-emerald-300', border: 'border-emerald-700/50', bar: 'from-emerald-600 to-emerald-400' },
    Render: { bg: 'bg-indigo-950/40', text: 'text-indigo-300', border: 'border-indigo-700/50', bar: 'from-indigo-600 to-indigo-400' },
    Bryntum: { bg: 'bg-rose-950/40', text: 'text-rose-300', border: 'border-rose-700/50', bar: 'from-rose-600 to-rose-400' },
  };

  const filteredTasks =
    filterPhase === 'all' ? tasks : tasks.filter((t) => t.phase === filterPhase);

  const totalDurationMs = Math.max(...tasks.map((t) => t.startMs + t.durationMs));

  const triggerLiveReplay = () => {
    setIsSimulating(true);
    setTasks((prev) =>
      prev.map((t) => ({ ...t, progress: 0, status: 'pending' }))
    );

    tasks.forEach((task, index) => {
      setTimeout(() => {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === task.id
              ? { ...t, status: 'in_progress', progress: 50 }
              : t
          )
        );
      }, task.startMs);

      setTimeout(() => {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === task.id
              ? { ...t, status: 'completed', progress: 100 }
              : t
          )
        );
        if (index === tasks.length - 1) {
          setIsSimulating(false);
        }
      }, task.startMs + task.durationMs);
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded font-mono text-xs font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
              <Calendar className="w-3.5 h-3.5 text-rose-400" />
              Bryntum Enterprise Scheduler & Timeline Engine
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Active SLA Monitor
            </span>
            <span className="text-xs text-slate-400 font-mono">Total Execution: 1,630 ms</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Autonomous Procurement Gantt & Timeline Engine
          </h1>

          <p className="text-xs text-slate-300 leading-relaxed">
            High-performance execution scheduler visualizing the sub-second multi-stage procurement lifecycle across <strong>Channel3</strong>, <strong>Gemini 3.8 Flash</strong>, <strong>PayPal Orders v2</strong>, <strong>AG Grid</strong>, and <strong>Render</strong> with explicit task dependency links and SLA monitoring.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={triggerLiveReplay}
            disabled={isSimulating}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:brightness-110 active:scale-[0.99] disabled:opacity-50 rounded-lg shadow-sm transition-all"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isSimulating ? 'Replaying Stages...' : 'Replay Execution'}</span>
          </button>

          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors"
          >
            <FileCode className="w-3.5 h-3.5 text-rose-400" />
            <span>{showCode ? 'Hide Code' : 'Bryntum Config'}</span>
          </button>
        </div>
      </div>

      {/* Code Snippet Drawer */}
      {showCode && (
        <div className="bg-slate-950 border border-rose-900/40 rounded-xl overflow-hidden shadow-xl animate-in fade-in duration-200">
          <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-rose-300 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              Bryntum Enterprise Scheduler React Configuration
            </span>
            <span className="text-[11px] font-mono text-slate-500">@bryntum/scheduler</span>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed bg-[#0b0f19]">
            {CODE_SNIPPETS.bryntumSchedulerSnippet}
          </pre>
        </div>
      )}

      {/* Filter and View Controls Bar */}
      <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* Phase Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
            Filter Phase:
          </span>
          {['all', 'discovery', 'policy', 'authorization', 'settlement', 'audit'].map((phase) => (
            <button
              key={phase}
              onClick={() => setFilterPhase(phase)}
              className={`px-2.5 py-1 rounded font-medium transition-colors capitalize ${
                filterPhase === phase
                  ? 'bg-rose-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
              }`}
            >
              {phase === 'all' ? 'All Stages' : phase}
            </button>
          ))}
        </div>

        {/* View Switches */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 select-none">
            <input
              type="checkbox"
              checked={showCriticalPath}
              onChange={(e) => setShowCriticalPath(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-0"
            />
            <span>Critical Path</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 select-none">
            <input
              type="checkbox"
              checked={showDependencies}
              onChange={(e) => setShowDependencies(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-0"
            />
            <span>Dependency Links</span>
          </label>

          <div className="h-4 w-px bg-slate-800" />

          {/* Time scale switch */}
          <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setTimeScale('ms')}
              className={`px-2.5 py-0.5 rounded font-mono font-medium transition-colors ${
                timeScale === 'ms'
                  ? 'bg-slate-800 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ms (0 - 2000)
            </button>
            <button
              onClick={() => setTimeScale('days')}
              className={`px-2.5 py-0.5 rounded font-mono font-medium transition-colors ${
                timeScale === 'days'
                  ? 'bg-slate-800 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              days (0 - 5d)
            </button>
          </div>
        </div>
      </div>

      {/* Main Gantt Grid & Visual Timeline */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* Left Column: Task Table (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>Procurement Pipeline Task</span>
            <div className="flex items-center gap-4 text-slate-400">
              <span>Software Rail</span>
              <span>SLA</span>
            </div>
          </div>

          <div className="divide-y divide-slate-800/60 overflow-y-auto max-h-[480px]">
            {filteredTasks.map((task, idx) => {
              const color = softwareColors[task.software] || softwareColors.PayPal;
              const isSelected = selectedTaskId === task.id;

              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTaskId(task.id)}
                  className={`px-4 py-3.5 flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-rose-950/30 border-l-4 border-rose-500'
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  <div className="space-y-1 min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-slate-500">#{idx + 1}</span>
                      <span className="text-xs font-medium text-white truncate">{task.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                      <span>Start: {timeScale === 'ms' ? `${task.startMs}ms` : `Day ${Math.floor(task.startMs / 300)}`}</span>
                      <span>·</span>
                      <span>Dur: {timeScale === 'ms' ? `${task.durationMs}ms` : `${(task.durationMs / 300).toFixed(1)}d`}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${color.bg} ${color.text} ${color.border}`}
                    >
                      {task.software}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40">
                      ≤{task.slaLimitMs}ms
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Visual Timeline & Gantt Bars (7 cols on lg) */}
        <div className="lg:col-span-7 p-4 bg-slate-950/40 flex flex-col justify-between overflow-x-auto">
          <div>
            {/* Timeline Time Ruler */}
            <div className="border-b border-slate-800 pb-2 mb-4 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>{timeScale === 'ms' ? '0 ms (Start)' : 'Day 0'}</span>
              <span>{timeScale === 'ms' ? '500 ms' : 'Day 1'}</span>
              <span>{timeScale === 'ms' ? '1,000 ms' : 'Day 2'}</span>
              <span>{timeScale === 'ms' ? '1,500 ms' : 'Day 3'}</span>
              <span>{timeScale === 'ms' ? '2,000 ms (SLA Limit)' : 'Day 5'}</span>
            </div>

            {/* Task Bars List */}
            <div className="space-y-4">
              {filteredTasks.map((task) => {
                const color = softwareColors[task.software] || softwareColors.PayPal;
                const isSelected = selectedTaskId === task.id;

                // Calculate percentage positions
                const maxRange = 1800; // Total ms scale range
                const leftPct = Math.min(100, Math.max(0, (task.startMs / maxRange) * 100));
                const widthPct = Math.min(100 - leftPct, Math.max(5, (task.durationMs / maxRange) * 100));

                return (
                  <div key={task.id} className="relative group">
                    {/* Background row slot */}
                    <div className="h-9 w-full bg-slate-900/60 rounded-lg relative overflow-hidden border border-slate-800/80 flex items-center px-2">
                      {/* Grid ticks */}
                      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-10">
                        <div className="border-r border-slate-400 w-1/4 h-full" />
                        <div className="border-r border-slate-400 w-1/4 h-full" />
                        <div className="border-r border-slate-400 w-1/4 h-full" />
                        <div className="border-r border-slate-400 w-1/4 h-full" />
                      </div>

                      {/* Gantt Task Bar */}
                      <div
                        onClick={() => setSelectedTaskId(task.id)}
                        style={{
                          left: `${leftPct}%`,
                          width: `${widthPct}%`,
                        }}
                        className={`absolute h-7 rounded-md bg-gradient-to-r ${color.bar} shadow-md flex items-center justify-between px-2 text-[10px] text-white font-medium cursor-pointer transition-all hover:brightness-125 z-10 ${
                          isSelected ? 'ring-2 ring-white scale-y-105' : ''
                        }`}
                      >
                        <span className="truncate">{task.name}</span>
                        <span className="font-mono text-[9px] opacity-90 pl-1 shrink-0">
                          {timeScale === 'ms' ? `${task.durationMs}ms` : `${(task.durationMs / 300).toFixed(1)}d`}
                        </span>
                      </div>
                    </div>

                    {/* Dependency Link Indicator */}
                    {showDependencies && task.dependencies.length > 0 && (
                      <div className="text-[9px] font-mono text-slate-500 pl-1 pt-0.5 flex items-center gap-1">
                        <ArrowRight className="w-2.5 h-2.5 text-slate-600" />
                        <span>Prerequisite: {task.dependencies.join(', ')}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Critical Path SLA Marker */}
          {showCriticalPath && (
            <div className="mt-6 p-3 bg-rose-950/20 border border-rose-800/30 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-semibold text-rose-300">Deterministic SLA Invariant:</span>
                <span className="text-slate-300">Total pipeline completes in 1,630 ms (SLA Target: 2,000 ms)</span>
              </div>
              <span className="font-mono text-emerald-400 font-semibold">+370 ms Buffer</span>
            </div>
          )}
        </div>
      </div>

      {/* Selected Task Deep Inspector */}
      {selectedTask && (
        <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Task Inspector & SLA Telemetry
              </span>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{selectedTask.name}</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {selectedTask.id}
                </span>
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Assigned Rail:</span>
              <span
                className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${
                  softwareColors[selectedTask.software]?.bg || 'bg-slate-800'
                } ${softwareColors[selectedTask.software]?.text || 'text-white'}`}
              >
                {selectedTask.owner}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="text-slate-400 text-[11px]">Execution Latency</div>
              <div className="text-lg font-mono font-bold text-white mt-1">
                {selectedTask.durationMs} ms
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5">
                Within {selectedTask.slaLimitMs} ms SLA limit
              </div>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="text-slate-400 text-[11px]">Procurement Phase</div>
              <div className="text-lg font-mono font-bold text-rose-300 capitalize mt-1">
                {selectedTask.phase}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Prerequisites: {selectedTask.dependencies.length > 0 ? selectedTask.dependencies.join(', ') : 'None (Root Task)'}
              </div>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="text-slate-400 text-[11px]">Completion Status</div>
              <div className="text-lg font-mono font-bold text-emerald-400 capitalize mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Progress: {selectedTask.progress}%
              </div>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="text-slate-400 text-[11px]">Connected Software</div>
              <div className="text-sm font-bold text-sky-300 mt-1">
                {selectedTask.software}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Direct REST/SDK integration
              </div>
            </div>
          </div>

          {selectedTask.meta && (
            <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-xl flex items-center gap-3 text-xs overflow-x-auto">
              <span className="font-mono text-slate-400 shrink-0 font-semibold">Active Metadata:</span>
              {Object.entries(selectedTask.meta).map(([key, val]) => (
                <span
                  key={key}
                  className="font-mono text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 whitespace-nowrap"
                >
                  <strong className="text-slate-500">{key}:</strong> {String(val)}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
