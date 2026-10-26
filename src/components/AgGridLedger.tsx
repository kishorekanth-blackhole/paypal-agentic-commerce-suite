import React, { useState, useMemo } from 'react';
import {
  Download,
  Filter,
  Search,
  ArrowUpDown,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileSpreadsheet,
  TrendingUp,
  ShieldCheck,
  Zap,
  ExternalLink
} from 'lucide-react';

export interface GridTransaction {
  id: string;
  orderId: string;
  captureId: string;
  item: string;
  vendor: string;
  category: string;
  amount: number;
  currency: string;
  policyStatus: 'AUTO_CAPTURED' | 'USER_APPROVED' | 'POLICY_DECLINED';
  riskScore: number;
  timestamp: string;
  agentId: string;
}

const INITIAL_TRANSACTIONS: GridTransaction[] = [
  {
    id: 'TX-1001',
    orderId: 'ORD-892F1A',
    captureId: 'CAP-991A0B',
    item: 'Smart Ergonomic Desk Sensor & Calibrator',
    vendor: 'ErgoTech Labs',
    category: 'Hardware & IoT',
    amount: 42.50,
    currency: 'USD',
    policyStatus: 'AUTO_CAPTURED',
    riskScore: 8,
    timestamp: '2026-10-18 09:14:22',
    agentId: 'agent-procure-alpha',
  },
  {
    id: 'TX-1002',
    orderId: 'ORD-338B7C',
    captureId: 'CAP-771C4D',
    item: 'Team Security Key FIDO2 Bundle (Pack of 3)',
    vendor: 'CipherSafe Hardware',
    category: 'Security & Auth',
    amount: 74.00,
    currency: 'USD',
    policyStatus: 'USER_APPROVED',
    riskScore: 24,
    timestamp: '2026-10-18 10:22:05',
    agentId: 'agent-secops-beta',
  },
  {
    id: 'TX-1003',
    orderId: 'ORD-519E8F',
    captureId: 'CAP-224E9A',
    item: 'Enterprise Cloud GPU Compute Voucher (100 hrs)',
    vendor: 'CloudMatrix Inc.',
    category: 'Developer Tools',
    amount: 85.00,
    currency: 'USD',
    policyStatus: 'USER_APPROVED',
    riskScore: 19,
    timestamp: '2026-10-18 11:45:30',
    agentId: 'agent-infra-gamma',
  },
  {
    id: 'TX-1004',
    orderId: 'ORD-662C9D',
    captureId: 'N/A',
    item: 'Thermal Receipt & Barcode Printer (Sandbox Ready)',
    vendor: 'MerchantPOS Systems',
    category: 'POS & Retail',
    amount: 189.00,
    currency: 'USD',
    policyStatus: 'POLICY_DECLINED',
    riskScore: 78,
    timestamp: '2026-10-18 13:02:11',
    agentId: 'agent-pos-delta',
  },
  {
    id: 'TX-1005',
    orderId: 'ORD-441A2E',
    captureId: 'CAP-883F2C',
    item: 'Precision Acoustic Studio Mic Arm & Filter',
    vendor: 'AudioPro Supply',
    category: 'Hardware & IoT',
    amount: 119.00,
    currency: 'USD',
    policyStatus: 'USER_APPROVED',
    riskScore: 31,
    timestamp: '2026-10-18 14:18:44',
    agentId: 'agent-media-epsilon',
  },
];

export const AgGridLedger: React.FC = () => {
  const [transactions, setTransactions] = useState<GridTransaction[]>(INITIAL_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [sortField, setSortField] = useState<keyof GridTransaction>('timestamp');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // Sorting and Filtering
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        const matchesSearch =
          tx.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tx.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tx.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tx.agentId.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
          statusFilter === 'ALL' || tx.policyStatus === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortAsc ? valA - valB : valB - valA;
        }
        return sortAsc
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
  }, [transactions, searchQuery, statusFilter, sortField, sortAsc]);

  const handleSort = (field: keyof GridTransaction) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const exportCsv = () => {
    const headers = [
      'Transaction ID',
      'PayPal Order ID',
      'Capture ID',
      'Item',
      'Vendor',
      'Category',
      'Amount',
      'Currency',
      'Policy Status',
      'Risk Score',
      'Settlement Timestamp',
      'Agent ID',
    ];
    const rows = filteredTransactions.map((tx) => [
      tx.id,
      tx.orderId,
      tx.captureId,
      `"${tx.item}"`,
      `"${tx.vendor}"`,
      tx.category,
      tx.amount.toFixed(2),
      tx.currency,
      tx.policyStatus,
      tx.riskScore,
      tx.timestamp,
      tx.agentId,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `paypal-ag-grid-ledger-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalSettled = filteredTransactions
    .filter((tx) => tx.policyStatus !== 'POLICY_DECLINED')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const avgRisk = Math.round(
    filteredTransactions.reduce((sum, tx) => sum + tx.riskScore, 0) /
      (filteredTransactions.length || 1)
  );

  return (
    <div className="space-y-5">
      {/* Enterprise Financial Telemetry Header Banner */}
      <div className="p-5 bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-800/40 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 mb-1">
            <span className="bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-700/60 font-mono">
              Enterprise Data Grid
            </span>
            <span className="text-slate-500">·</span>
            <span className="font-bold text-emerald-400">
              High-Density Financial Observability & Multi-Agent Settlement
            </span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Institutional Transaction Ledger & Audit Matrix
          </h2>
          <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
            Real-time telemetry tracking autonomous agent PayPal Sandbox transactions, risk scores, policy enforcement states, and verifiable settlement ledgers.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://www.ag-grid.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
          >
            <span>AG Grid Docs</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <button
            onClick={exportCsv}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors whitespace-nowrap shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Total Settled Volume
          </span>
          <div className="text-lg font-mono tabular-nums font-bold text-emerald-400">
            ${totalSettled.toFixed(2)} USD
          </div>
        </div>

        <div className="p-3.5 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Filtered Orders
          </span>
          <div className="text-lg font-mono tabular-nums font-bold text-white">
            {filteredTransactions.length}
          </div>
        </div>

        <div className="p-3.5 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Average Risk Score
          </span>
          <div className="text-lg font-mono tabular-nums font-bold text-sky-400">
            {avgRisk}/100
          </div>
        </div>

        <div className="p-3.5 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            PayPal API Engine
          </span>
          <div className="text-xs font-mono text-slate-300 font-semibold pt-1">
            Orders v2 REST
          </div>
        </div>
      </div>

      {/* Toolbar: Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-900/40 border border-slate-800/80 rounded-xl">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items, order IDs, vendors..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
          <span className="text-[11px] text-slate-500 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
              statusFilter === 'ALL'
                ? 'bg-sky-500 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
            }`}
          >
            All ({transactions.length})
          </button>
          <button
            onClick={() => setStatusFilter('AUTO_CAPTURED')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
              statusFilter === 'AUTO_CAPTURED'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
            }`}
          >
            Auto-Captured
          </button>
          <button
            onClick={() => setStatusFilter('USER_APPROVED')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
              statusFilter === 'USER_APPROVED'
                ? 'bg-amber-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
            }`}
          >
            User Approved
          </button>
          <button
            onClick={() => setStatusFilter('POLICY_DECLINED')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
              statusFilter === 'POLICY_DECLINED'
                ? 'bg-rose-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
            }`}
          >
            Declined
          </button>
        </div>
      </div>

      {/* High-Performance AG Grid Table */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th
                  onClick={() => handleSort('orderId')}
                  className="py-3 px-4 cursor-pointer hover:text-white select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Order & ID</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('item')}
                  className="py-3 px-4 cursor-pointer hover:text-white select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Procured Item</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('amount')}
                  className="py-3 px-4 cursor-pointer hover:text-white select-none text-right whitespace-nowrap"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Amount</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('policyStatus')}
                  className="py-3 px-4 cursor-pointer hover:text-white select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Policy Status</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('riskScore')}
                  className="py-3 px-4 cursor-pointer hover:text-white select-none text-right whitespace-nowrap"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Risk Score</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('timestamp')}
                  className="py-3 px-4 cursor-pointer hover:text-white select-none text-right whitespace-nowrap"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Settlement Time</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
              {filteredTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-slate-900/50 transition-colors group"
                >
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-200">{tx.orderId}</div>
                    <div className="text-[10px] text-slate-500 font-normal">
                      Cap: {tx.captureId}
                    </div>
                  </td>

                  <td className="py-3 px-4 font-sans">
                    <div className="font-medium text-slate-200 line-clamp-1">
                      {tx.item}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {tx.vendor} · <span className="text-slate-400">{tx.category}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-right tabular-nums font-bold text-white">
                    ${tx.amount.toFixed(2)}{' '}
                    <span className="text-[10px] font-normal text-slate-500">
                      {tx.currency}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-sans whitespace-nowrap">
                    {tx.policyStatus === 'AUTO_CAPTURED' && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800/50">
                        <CheckCircle2 className="w-3 h-3" /> Auto-Captured
                      </span>
                    )}
                    {tx.policyStatus === 'USER_APPROVED' && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-800/50">
                        <AlertTriangle className="w-3 h-3" /> User 2FA Approved
                      </span>
                    )}
                    {tx.policyStatus === 'POLICY_DECLINED' && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 bg-rose-950/80 px-2.5 py-0.5 rounded border border-rose-800/50">
                        <XCircle className="w-3 h-3" /> Hard Cap Breach
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-right tabular-nums">
                    <span
                      className={`font-semibold ${
                        tx.riskScore > 50
                          ? 'text-rose-400'
                          : tx.riskScore > 20
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {tx.riskScore}/100
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right text-[11px] text-slate-400 tabular-nums whitespace-nowrap">
                    {tx.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
