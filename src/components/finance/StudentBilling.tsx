import React from 'react';
import { mockFinances } from "@/lib/mockData";

export default function StudentBilling() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Student Billing & Invoicing</h2>
          <p className="text-slate-500">Manage fee generations, tuition invoices, and late fees.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
            Export Report
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm">
            Generate Invoices
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-indigo-500">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Billed (Current Semester)</p>
          <h3 className="text-3xl font-bold text-slate-800">৳ 12,450,000</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-amber-500">
          <p className="text-sm font-medium text-slate-500 mb-1">Unpaid Invoices</p>
          <h3 className="text-3xl font-bold text-slate-800">342</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-emerald-500">
          <p className="text-sm font-medium text-slate-500 mb-1">Collection Rate</p>
          <h3 className="text-3xl font-bold text-slate-800">89%</h3>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-semibold text-slate-800">Recent Invoices</h3>
          <div className="relative">
            <input type="text" placeholder="Search by ID or Name..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-64" />
            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Invoice ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockFinances.recentTransactions.map((inv, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4 text-sm font-mono text-indigo-600 font-medium">INV-26{i}4{i}9</td>
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">Student Name {i+1}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">Tuition Fee</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">৳ {inv.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">2026-09-15</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${i % 3 === 0 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {i % 3 === 0 ? 'Pending' : 'Paid'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
