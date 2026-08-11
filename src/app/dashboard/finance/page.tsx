"use client";

import { mockFinances } from "@/lib/mockData";
import { DollarSign, TrendingUp, ArrowDownToLine, ArrowUpFromLine, Download, Search } from "lucide-react";

export default function FinanceDashboard() {
    return (
        <div className="min-h-screen bg-slate-50/50 p-6 space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 tracking-tight">
                        Financial Overview
                    </h1>
                    <p className="text-slate-500 mt-2">Monitor revenue, expenses, and transaction history.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 hover:shadow-sm transition font-medium shadow-sm">
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(16,185,129,0.1)] border border-slate-100 flex flex-col justify-between hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                            <DollarSign className="w-5 h-5" />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                            <TrendingUp className="w-3 h-3" /> +12%
                        </span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Total Revenue</p>
                        <h3 className="text-3xl font-bold text-slate-800">{mockFinances.summary.totalRevenue}</h3>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(16,185,129,0.1)] border border-slate-100 flex flex-col justify-between hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                            <ArrowUpFromLine className="w-5 h-5" />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-md">
                            +4%
                        </span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Total Expenses</p>
                        <h3 className="text-3xl font-bold text-slate-800">{mockFinances.summary.totalExpenses}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(16,185,129,0.1)] border border-slate-100 flex flex-col justify-between hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                            <ArrowDownToLine className="w-5 h-5" />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Pending Dues</p>
                        <h3 className="text-3xl font-bold text-slate-800">{mockFinances.summary.pendingDues}</h3>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700 flex flex-col justify-between text-white hover:shadow-xl transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-300 mb-1">Net Profit</p>
                        <h3 className="text-3xl font-bold">{mockFinances.summary.netProfit}</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart (CSS Mockup) */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-800 mb-6">Revenue Trend (YTD)</h3>
                    <div className="h-64 flex items-end gap-4">
                        {mockFinances.revenue.map((item, idx) => {
                            const height = (item.amount / 3000000) * 100;
                            return (
                                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                                    <div className="w-full relative rounded-t-lg bg-gradient-to-t from-emerald-100 to-emerald-400 opacity-80 group-hover:opacity-100 transition-opacity" style={{ height: `${height}%` }}>
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                                            ৳{(item.amount / 1000000).toFixed(1)}M
                                        </div>
                                    </div>
                                    <span className="text-xs font-medium text-slate-500">{item.month}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-800">Recent Transactions</h3>
                        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View All</button>
                    </div>
                    <div className="space-y-4">
                        {mockFinances.recentTransactions.map(txn => (
                            <div key={txn.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${txn.amount > 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                        {txn.amount > 0 ? <ArrowDownToLine className="w-5 h-5" /> : <ArrowUpFromLine className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-800 text-sm">{txn.type}</p>
                                        <p className="text-xs text-slate-500">{txn.date} • {txn.student !== 'N/A' ? txn.student : 'System'}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold text-sm ${txn.amount > 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                                        {txn.amount > 0 ? '+' : ''}৳{Math.abs(txn.amount).toLocaleString()}
                                    </p>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider
                                        ${txn.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                                        {txn.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
