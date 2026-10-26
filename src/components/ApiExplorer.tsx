import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  Play,
  FileCode,
  Terminal,
  ExternalLink,
  Shield,
  Send,
  Sparkles
} from 'lucide-react';
import { CODE_SNIPPETS } from '../data/hackathonData';

export const ApiExplorer: React.FC = () => {
  const [selectedSnippet, setSelectedSnippet] = useState<'ts' | 'py' | 'wh' | 'apimatic' | 'aggrid' | 'bryntum' | 'channel3' | 'render'>('ts');
  const [copied, setCopied] = useState<boolean>(false);
  const [testEndpoint, setTestEndpoint] = useState<string>('/v2/checkout/orders');
  const [testIntent, setTestIntent] = useState<string>('CAPTURE');
  const [testAmount, setTestAmount] = useState<string>('49.99');
  const [testCurrency, setTestCurrency] = useState<string>('USD');
  const [isCallingSandbox, setIsCallingSandbox] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<any>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const executeSandboxTest = () => {
    setIsCallingSandbox(true);
    setApiResponse(null);

    setTimeout(() => {
      const orderId = 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      const debugId = 'dbg_' + Math.random().toString(36).substring(2, 10);
      const timestamp = new Date().toISOString();

      if (testEndpoint === '/v2/checkout/orders') {
        setApiResponse({
          status: 201,
          statusText: 'Created',
          headers: {
            'Content-Type': 'application/json',
            'PayPal-Debug-Id': debugId,
            'PayPal-Request-Id': `REQ-${Date.now()}`,
          },
          body: {
            id: orderId,
            status: 'CREATED',
            intent: testIntent,
            create_time: timestamp,
            purchase_units: [
              {
                reference_id: `PU-${orderId}`,
                amount: {
                  currency_code: testCurrency,
                  value: testAmount,
                },
                payee: {
                  email_address: 'merchant-sandbox@paypal-agentic-sandbox.com',
                  merchant_id: 'SB_MERCHANT_77A',
                },
              },
            ],
            links: [
              {
                href: `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}`,
                rel: 'self',
                method: 'GET',
              },
              {
                href: `https://www.sandbox.paypal.com/checkoutnow?token=${orderId}`,
                rel: 'approve',
                method: 'GET',
              },
              {
                href: `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
                rel: 'capture',
                method: 'POST',
              },
            ],
          },
        });
      } else if (testEndpoint === '/v2/checkout/orders/{id}/capture') {
        const captureId = 'CAP-' + Math.random().toString(36).substring(2, 9).toUpperCase();
        setApiResponse({
          status: 201,
          statusText: 'Created',
          headers: {
            'Content-Type': 'application/json',
            'PayPal-Debug-Id': debugId,
          },
          body: {
            id: orderId,
            status: 'COMPLETED',
            purchase_units: [
              {
                reference_id: `PU-${orderId}`,
                payments: {
                  captures: [
                    {
                      id: captureId,
                      status: 'COMPLETED',
                      amount: { currency_code: testCurrency, value: testAmount },
                      final_capture: true,
                      seller_protection: {
                        status: 'ELIGIBLE',
                        dispute_categories: ['ITEM_NOT_RECEIVED', 'UNAUTHORIZED_TRANSACTION'],
                      },
                      create_time: timestamp,
                    },
                  ],
                },
              },
            ],
          },
        });
      } else {
        // Payouts
        const payoutBatchId = 'PAYOUT-BATCH-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        setApiResponse({
          status: 201,
          statusText: 'Created',
          headers: {
            'Content-Type': 'application/json',
            'PayPal-Debug-Id': debugId,
          },
          body: {
            batch_header: {
              payout_batch_id: payoutBatchId,
              batch_status: 'PENDING',
              time_created: timestamp,
              sender_batch_header: {
                sender_batch_id: `AGENT_SPLIT_${Date.now()}`,
                email_subject: 'You have a payment from an Autonomous Agent Mesh',
              },
              amount: { currency_code: testCurrency, value: testAmount },
            },
          },
        });
      }

      setIsCallingSandbox(false);
    }, 600);
  };

  const activeSnippetCode =
    selectedSnippet === 'ts'
      ? CODE_SNIPPETS.ordersV2TypeScript
      : selectedSnippet === 'py'
      ? CODE_SNIPPETS.captureOrderPython
      : selectedSnippet === 'apimatic'
      ? CODE_SNIPPETS.apimaticSdkSnippet
      : selectedSnippet === 'wh'
      ? CODE_SNIPPETS.webhookSignatureVerify
      : selectedSnippet === 'aggrid'
      ? CODE_SNIPPETS.agGridLedgerSnippet
      : selectedSnippet === 'bryntum'
      ? CODE_SNIPPETS.bryntumSchedulerSnippet
      : selectedSnippet === 'channel3'
      ? CODE_SNIPPETS.channel3CatalogSnippet
      : CODE_SNIPPETS.renderYamlSnippet;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 mb-1">
            <span className="bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-700/60 font-mono">
              PayPal Developer Sandbox
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300">REST API v2 Reference & Enterprise Integration</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            PayPal Sandbox REST APIs & Enterprise Code Hub
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Production-grade integration patterns for autonomous agent checkouts, Orders v2 captures, webhook HMAC signature validation, AG Grid financial ledgers, and containerized deployment blueprints.
          </p>
        </div>

        <a
          href="https://developer.paypal.com/docs/api/overview/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap self-start lg:self-auto"
        >
          <span>Official PayPal Docs</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>

      {/* Main Grid: Code Snippets vs Live API Sandbox Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 Cols): Code Snippets Library */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl overflow-hidden">
            {/* Header Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-slate-950/80 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Payment & Sponsor Patterns
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex flex-wrap items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
                  <button
                    onClick={() => setSelectedSnippet('ts')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors ${
                      selectedSnippet === 'ts'
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Orders v2
                  </button>
                  <button
                    onClick={() => setSelectedSnippet('py')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors ${
                      selectedSnippet === 'py'
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Capture
                  </button>
                  <button
                    onClick={() => setSelectedSnippet('wh')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors ${
                      selectedSnippet === 'wh'
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    HMAC Webhook
                  </button>
                  <button
                    onClick={() => setSelectedSnippet('apimatic')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors ${
                      selectedSnippet === 'apimatic'
                        ? 'bg-slate-800 text-sky-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    APIMatic SDK
                  </button>
                  <button
                    onClick={() => setSelectedSnippet('aggrid')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors ${
                      selectedSnippet === 'aggrid'
                        ? 'bg-slate-800 text-emerald-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    AG Grid Ledger
                  </button>
                  <button
                    onClick={() => setSelectedSnippet('bryntum')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors ${
                      selectedSnippet === 'bryntum'
                        ? 'bg-slate-800 text-rose-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Bryntum Gantt
                  </button>
                  <button
                    onClick={() => setSelectedSnippet('channel3')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors ${
                      selectedSnippet === 'channel3'
                        ? 'bg-slate-800 text-amber-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Channel3 API
                  </button>
                  <button
                    onClick={() => setSelectedSnippet('render')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors ${
                      selectedSnippet === 'render'
                        ? 'bg-slate-800 text-purple-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    render.yaml
                  </button>
                </div>

                <button
                  onClick={() => copyCode(activeSnippetCode)}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-4 bg-slate-950 font-mono text-[11px] overflow-x-auto max-h-[500px]">
              <pre className="text-slate-200 leading-relaxed">
                <code>{activeSnippetCode}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Right Column (5 Cols): Live REST Sandbox Playground */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-sky-400" />
                Sandbox REST Console
              </h3>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
                Sandbox Environment
              </span>
            </div>

            {/* Endpoint Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Endpoint</label>
              <select
                value={testEndpoint}
                onChange={(e) => setTestEndpoint(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-sky-500"
              >
                <option value="/v2/checkout/orders">POST /v2/checkout/orders (Create Order)</option>
                <option value="/v2/checkout/orders/{id}/capture">
                  POST /v2/checkout/orders/{'{id}'}/capture (Capture)
                </option>
                <option value="/v1/payments/payouts">POST /v1/payments/payouts (Batch Split)</option>
              </select>
            </div>

            {/* Parameters */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">Order Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-slate-500">$</span>
                  <input
                    type="number"
                    value={testAmount}
                    onChange={(e) => setTestAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-7 pr-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">Currency Code</label>
                <select
                  value={testCurrency}
                  onChange={(e) => setTestCurrency(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-sky-500"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD ($)</option>
                </select>
              </div>
            </div>

            {/* Run Button */}
            <button
              onClick={executeSandboxTest}
              disabled={isCallingSandbox}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#003087] to-[#0079C1] hover:brightness-110 active:scale-[0.99] disabled:opacity-50 rounded-lg shadow-sm transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isCallingSandbox ? 'Calling Sandbox...' : 'Dispatch Sandbox Test'}</span>
            </button>

            {/* Sandbox Response Viewer */}
            {apiResponse && (
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-emerald-400">
                      HTTP {apiResponse.status} {apiResponse.statusText}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {apiResponse.headers['PayPal-Debug-Id']}
                    </span>
                  </div>
                  <button
                    onClick={() => copyCode(JSON.stringify(apiResponse.body, null, 2))}
                    className="text-slate-400 hover:text-white"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg font-mono text-[11px] max-h-56 overflow-y-auto">
                  <pre className="text-slate-300 leading-relaxed">
                    {JSON.stringify(apiResponse.body, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
