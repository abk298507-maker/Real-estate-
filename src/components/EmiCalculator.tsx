import React from 'react';
import { Calculator, DollarSign, Percent, Clock } from 'lucide-react';

export default function EmiCalculator() {
  const [principal, setPrincipal] = React.useState<number>(5000000); // 50 Lakhs
  const [interest, setInterest] = React.useState<number>(8.5); // 8.5%
  const [tenure, setTenure] = React.useState<number>(20); // 20 years

  const calculateEmi = () => {
    const p = principal;
    const r = interest / 12 / 100;
    const n = tenure * 12;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - p;
    return { emi, totalInterest, totalAmount };
  };

  const results = calculateEmi();

  const formatRupees = (num: number) => {
    return `₹ ${Math.round(num).toLocaleString('en-IN')}`;
  };

  return (
    <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-white">EMI Calculator</h3>
          <p className="text-xs text-slate-400">Estimate your monthly mortgage payments</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-1.5">
            Loan Amount: <span className="text-white font-mono">{formatRupees(principal)}</span>
          </label>
          <input
            type="range"
            min="100000"
            max="100000000"
            step="100000"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full accent-blue-500 h-2 bg-slate-900 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <label className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-1.5">
            Interest Rate: <span className="text-white font-mono">{interest}%</span>
          </label>
          <input
            type="range"
            min="5"
            max="20"
            step="0.1"
            value={interest}
            onChange={(e) => setInterest(Number(e.target.value))}
            className="w-full accent-blue-500 h-2 bg-slate-900 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <label className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-1.5">
            Tenure (Years): <span className="text-white font-mono">{tenure} Yrs</span>
          </label>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full accent-blue-500 h-2 bg-slate-900 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <span className="text-xs text-slate-400 font-bold uppercase">Monthly EMI</span>
          <span className="text-xl font-black text-blue-400 font-mono">
            {formatRupees(results.emi)}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center text-[10px] font-mono">
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/40">
            <span className="text-slate-500 block mb-1">Total Interest</span>
            <span className="text-white font-extrabold">{formatRupees(results.totalInterest)}</span>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/40">
            <span className="text-slate-500 block mb-1">Total Payment</span>
            <span className="text-white font-extrabold">{formatRupees(results.totalAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
