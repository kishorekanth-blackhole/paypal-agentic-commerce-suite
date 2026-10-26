import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  Check,
  Shield,
  Sliders,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Layers,
  FileCode,
  DollarSign,
  Fingerprint,
  Calendar,
  ShoppingBag,
  Table
} from 'lucide-react';
import { SAMPLE_CATALOG } from '../data/hackathonData';
import { CatalogItem, SimulationResult, AgentExecutionStep } from '../types/hackathon';

interface AgentSimulatorProps {
  onNavigateTab?: (tabId: string) => void;
}

export const AgentSimulator: React.FC<AgentSimulatorProps> = ({ onNavigateTab }) => {
  // Agent policy settings
  const [spendingCap, setSpendingCap] = useState<number>(100);
  const [autoApproveThreshold, setAutoApproveThreshold] = useState<number>(50);
  const [selectedItem, setSelectedItem] = useState<CatalogItem>(SAMPLE_CATALOG[0]);
  const [agentGoal, setAgentGoal] = useState<string>('Restock ergonomic desk sensors for dev workstation');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [activeLogTab, setActiveLogTab] = useState<'response' | 'request' | 'webhook'>('response');
  const [copied, setCopied] = useState<boolean>(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState<boolean>(false);

  const runSimulation = async (bypassApproval = false) => {
    setIsLoading(true);
    setSimulationResult(null);

    try {
      const response = await fetch('/api/sandbox/simulate-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentGoal,
          spendingCap,
          autoApproveThreshold,
          selectedItem,
          allowDiscretionary: bypassApproval,
        }),
      });

      const data: SimulationResult = await response.json();
      setSimulationResult(data);

      if (data.status === 'PENDING_USER_APPROVAL' && !bypassApproval) {
        setApprovalModalOpen(true);
      }
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualUserApprove = () => {
    setApprovalModalOpen(false);
    // Rerun with discretionary bypass granted
    runSimulation(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectPreset = (item: CatalogItem, prompt: string) => {
    setSelectedItem(item);
    setAgentGoal(prompt);
  };

  return (
    <div className="space-y-6">
      {/* Header and Value Proposition */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 mb-1">
            <span className="bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-700/60 font-mono">
              Autonomous Agent Protocol v3.2
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300">PayPal REST Orders v2 Execution Engine</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Autonomous Agentic Commerce Sandbox
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Simulate an autonomous AI agent executing live transactions through the PayPal Orders v2 Sandbox with programmable spending guardrails, policy enforcement, and step-up user authorization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSpendingCap(100);
              setAutoApproveThreshold(50);
              setSelectedItem(SAMPLE_CATALOG[0]);
              setAgentGoal('Restock ergonomic desk sensors for dev workstation');
              setSimulationResult(null);
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Policy</span>
          </button>

          <button
            onClick={() => runSimulation(false)}
            disabled={isLoading}
            className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#003087] to-[#0079C1] hover:brightness-110 active:scale-[0.99] disabled:opacity-50 rounded-lg shadow-sm shadow-sky-950 transition-all whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isLoading ? 'Executing Agent Loop...' : 'Execute Agent Checkout'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Policy Engine & Catalog vs Reasoning Trace & Sandbox Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 Cols): Agent Configuration & Policy Guardrails */}
        <div className="lg:col-span-5 space-y-5">
          {/* Preset Agent Objectives */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                Sample Agent Objectives
              </label>
              <span className="text-[11px] text-slate-500">Pick a scenario</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => selectPreset(SAMPLE_CATALOG[0], 'Restock ergonomic hardware within budget')}
                className={`text-left p-2.5 rounded-lg border text-xs transition-colors flex items-center justify-between ${
                  selectedItem.id === 'item-1'
                    ? 'border-sky-500/80 bg-sky-950/30 text-white'
                    : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="font-semibold text-slate-200">Autonomous Restock (Under $50)</div>
                  <div className="text-[11px] text-slate-400">Ergonomic Sensor · $42.50 USD · Auto-Captures</div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">$42.50</span>
              </button>

              <button
                onClick={() => selectPreset(SAMPLE_CATALOG[1], 'Provision cloud GPU compute for model fine-tuning')}
                className={`text-left p-2.5 rounded-lg border text-xs transition-colors flex items-center justify-between ${
                  selectedItem.id === 'item-2'
                    ? 'border-sky-500/80 bg-sky-950/30 text-white'
                    : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="font-semibold text-slate-200">Cloud Compute Top-Up ($85)</div>
                  <div className="text-[11px] text-slate-400">GPU Credits · Triggers Step-Up 2FA Gate</div>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400">$85.00</span>
              </button>

              <button
                onClick={() => selectPreset(SAMPLE_CATALOG[4], 'Procure industrial retail receipt hardware')}
                className={`text-left p-2.5 rounded-lg border text-xs transition-colors flex items-center justify-between ${
                  selectedItem.id === 'item-5'
                    ? 'border-sky-500/80 bg-sky-950/30 text-white'
                    : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="font-semibold text-slate-200">High-Value Order ($189)</div>
                  <div className="text-[11px] text-slate-400">Thermal Printer · Exceeds $100 Hard Cap</div>
                </div>
                <span className="text-xs font-mono font-bold text-rose-400">$189.00</span>
              </button>
            </div>

            {/* Channel3 Syndicated Multi-Merchant Intelligence */}
            <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                  <span>Channel3 Commerce Intelligence</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  SKU: {selectedItem.channel3Sku || 'C3-DSK-42901'}
                </span>
              </div>

              {selectedItem.merchantOffers && selectedItem.merchantOffers.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] text-slate-400">
                    Real-time cross-vendor quotes matched by Channel3 API:
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {selectedItem.merchantOffers.map((offer) => (
                      <div
                        key={offer.merchantId}
                        className={`p-2 rounded-lg border text-xs flex items-center justify-between transition-colors ${
                          offer.isOptimalPrice
                            ? 'bg-amber-950/20 border-amber-800/40 text-slate-200'
                            : 'bg-slate-950/30 border-slate-800/60 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-200">{offer.merchantName}</span>
                          {offer.isOptimalPrice && (
                            <span className="text-[9px] font-mono font-bold bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/40">
                              Optimal Quote
                            </span>
                          )}
                          <span className="text-[10px] text-slate-500 font-mono">
                            {offer.deliveryEstimate}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 font-mono">
                          <span className="text-[10px] text-emerald-400 font-semibold">
                            {offer.channel3TrustScore}% Trust
                          </span>
                          <span className="font-bold text-white">${offer.price.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Natural Language Prompt Input */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Agent Natural Language Objective
            </label>
            <input
              type="text"
              value={agentGoal}
              onChange={(e) => setAgentGoal(e.target.value)}
              placeholder="e.g. Procure developer peripherals under $75..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-500 transition-colors font-mono"
            />
            <p className="text-[11px] text-slate-400">
              The agent interprets this goal, checks pricing against limits, and formats PayPal Orders v2 payload.
            </p>
          </div>

          {/* Spending Policy Guardrails */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-sky-400" />
                Spending Policy Invariants
              </label>
              <span className="text-[11px] text-emerald-400 font-medium">Policy Active</span>
            </div>

            {/* Hard Cap Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">Max Hard Cap (Absolute Limit):</span>
                <span className="font-mono tabular-nums font-bold text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  ${spendingCap}.00 USD
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="250"
                step="10"
                value={spendingCap}
                onChange={(e) => setSpendingCap(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>$30</span>
                <span>$100</span>
                <span>$250</span>
              </div>
            </div>

            {/* Auto-Approve Threshold Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">Autonomous Auto-Approval Limit:</span>
                <span className="font-mono tabular-nums font-bold text-emerald-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  ${autoApproveThreshold}.00 USD
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                step="5"
                value={autoApproveThreshold}
                onChange={(e) => setAutoApproveThreshold(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <p className="text-[11px] text-slate-400">
                Transactions under this amount are captured autonomously by the agent. Purchases above require user biometric sign-off.
              </p>
            </div>

            {/* Active Item Summary */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Target Item Cost:</span>
              <div className="text-right">
                <span className="font-mono tabular-nums font-bold text-white">
                  ${selectedItem.price.toFixed(2)} USD
                </span>
                <div className="text-[10px] text-slate-400">
                  {selectedItem.price <= autoApproveThreshold
                    ? 'Status: Auto-Executes'
                    : selectedItem.price <= spendingCap
                    ? 'Status: Requires User Approval'
                    : 'Status: Will Violate Hard Cap'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Live Execution Trace & Sandbox API Inspector */}
        <div className="lg:col-span-7 space-y-5">
          {/* Execution Trace Box */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Agentic Execution Trace & Safety Verification
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {onNavigateTab && (
                  <>
                    <button
                      onClick={() => onNavigateTab('timeline')}
                      className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono font-medium text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/50 rounded-lg transition-colors"
                      title="Inspect sub-second execution in Bryntum Timeline"
                    >
                      <Calendar className="w-3 h-3 text-rose-400" />
                      <span>Bryntum Gantt</span>
                    </button>
                    <button
                      onClick={() => onNavigateTab('aggrid')}
                      className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono font-medium text-emerald-300 hover:text-white bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/50 rounded-lg transition-colors"
                      title="Inspect financial settlement in AG Grid Ledger"
                    >
                      <Table className="w-3 h-3 text-emerald-400" />
                      <span>AG Grid</span>
                    </button>
                  </>
                )}
                {simulationResult && (
                  <span
                    className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded ${
                      simulationResult.status === 'COMPLETED'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                        : simulationResult.status === 'PENDING_USER_APPROVAL'
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                        : 'bg-rose-950/80 text-rose-300 border border-rose-800/60'
                    }`}
                  >
                    {simulationResult.status}
                  </span>
                )}
              </div>
            </div>

            {/* Trace Steps List */}
            {!simulationResult && !isLoading ? (
              <div className="py-10 text-center text-slate-500 border border-dashed border-slate-800 rounded-lg">
                <Play className="w-8 h-8 mx-auto text-slate-600 mb-2 opacity-50" />
                <p className="text-xs font-medium text-slate-400">Ready to simulate agent checkout</p>
                <p className="text-[11px] text-slate-600 mt-1">
                  Click "Execute Agent Checkout" to view live policy checks and PayPal Sandbox REST requests.
                </p>
              </div>
            ) : isLoading ? (
              <div className="py-12 text-center space-y-3">
                <div className="inline-block w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-medium text-slate-300">
                  AI Agent evaluating catalog & PayPal Sandbox endpoints...
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {simulationResult?.steps.map((step) => (
                  <div
                    key={step.step}
                    className="p-3 bg-slate-950/60 border border-slate-800/70 rounded-lg flex items-start gap-3"
                  >
                    <div className="mt-0.5">
                      {step.status === 'completed' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : step.status === 'pending_approval' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-slate-200">
                          {step.step}. {step.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 tabular-nums">
                          {new Date(step.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {step.details}
                      </p>
                    </div>
                  </div>
                ))}

                {/* If pending approval, show user approval callout */}
                {simulationResult?.status === 'PENDING_USER_APPROVAL' && (
                  <div className="p-3.5 bg-amber-950/30 border border-amber-800/60 rounded-lg flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <Fingerprint className="w-5 h-5 text-amber-400 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-amber-200">
                          User Biometric Confirmation Required
                        </div>
                        <div className="text-[11px] text-amber-400/80">
                          Order ${simulationResult.item.price.toFixed(2)} exceeds ${autoApproveThreshold} threshold.
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleManualUserApprove}
                      className="px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors whitespace-nowrap"
                    >
                      Authorize via PayPal
                    </button>
                  </div>
                )}

                {/* If completed, show digital receipt */}
                {simulationResult?.status === 'COMPLETED' && (
                  <div className="p-3.5 bg-emerald-950/20 border border-emerald-800/40 rounded-lg flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
                        <Check className="w-4 h-4" />
                        Capture Confirmed in PayPal Sandbox
                      </div>
                      <div className="text-slate-400 font-mono text-[11px] mt-0.5">
                        Order ID: {simulationResult.orderId} · Capture ID: {simulationResult.captureId}
                      </div>
                    </div>
                    <span className="text-emerald-400 font-mono font-bold text-sm">
                      ${simulationResult.item.price.toFixed(2)} USD
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sandbox REST API Inspector */}
          {simulationResult && (
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    PayPal Sandbox REST Inspector
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
                    <button
                      onClick={() => setActiveLogTab('response')}
                      className={`px-2.5 py-1 rounded font-medium transition-colors ${
                        activeLogTab === 'response'
                          ? 'bg-slate-800 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      API Response
                    </button>
                    <button
                      onClick={() => setActiveLogTab('request')}
                      className={`px-2.5 py-1 rounded font-medium transition-colors ${
                        activeLogTab === 'request'
                          ? 'bg-slate-800 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Request Payload
                    </button>
                    {simulationResult.sandboxLogs.webhookEvent && (
                      <button
                        onClick={() => setActiveLogTab('webhook')}
                        className={`px-2.5 py-1 rounded font-medium transition-colors ${
                          activeLogTab === 'webhook'
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Webhook Event
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      const payload =
                        activeLogTab === 'response'
                          ? simulationResult.sandboxLogs.response
                          : activeLogTab === 'request'
                          ? simulationResult.sandboxLogs.request
                          : simulationResult.sandboxLogs.webhookEvent;
                      copyToClipboard(JSON.stringify(payload, null, 2));
                    }}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                    title="Copy JSON"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Code viewer */}
              <div className="p-4 bg-slate-950 font-mono text-[11px] overflow-x-auto max-h-72">
                <pre className="text-slate-300 leading-relaxed">
                  {JSON.stringify(
                    activeLogTab === 'response'
                      ? simulationResult.sandboxLogs.response
                      : activeLogTab === 'request'
                      ? simulationResult.sandboxLogs.request
                      : simulationResult.sandboxLogs.webhookEvent,
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Manual Step-Up Confirmation Modal */}
      {approvalModalOpen && simulationResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-700/50 flex items-center justify-center text-amber-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Agent Purchase Authorization</h3>
                <p className="text-xs text-slate-400">Cryptographic Step-Up Security Gate</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Agent Reason:</span>
                <span className="text-slate-200 font-medium">{agentGoal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Vendor / Item:</span>
                <span className="text-slate-200 font-medium">{simulationResult.item.name}</span>
              </div>
              <div className="flex justify-between border-t border-slate-800/80 pt-2">
                <span className="text-slate-400">Order Amount:</span>
                <span className="text-white font-mono font-bold text-sm">
                  ${simulationResult.item.price.toFixed(2)} USD
                </span>
              </div>
              <div className="text-[10px] text-amber-400/90 pt-1">
                Policy Notice: Exceeds ${autoApproveThreshold} autonomous threshold.
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              By authorizing this transaction, you approve PayPal Order v2 intent token <code className="text-sky-300 font-mono">{simulationResult.orderId}</code> for immediate sandbox capture.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setApprovalModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                Reject Order
              </button>
              <button
                onClick={handleManualUserApprove}
                className="px-5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-lg font-mono transition-all"
              >
                Sign & Authorize via PayPal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
