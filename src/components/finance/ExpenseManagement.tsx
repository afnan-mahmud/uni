import React from 'react';

export default function ExpenseManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Expense Management</h2>
          <p className="text-slate-500">Track internal expenses, vendor payments, and procurements.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm">
            Record Expense
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
            </div>
            <span className="text-xs font-medium text-rose-600 bg-rose-100 px-2 py-1 rounded-full">+12% vs last month</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-1">৳ 2,150,000</h3>
          <p className="text-sm text-slate-500">Operating Expenses</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-1">24</h3>
          <p className="text-sm text-slate-500">Pending Approvals</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-1">৳ 850,000</h3>
          <p className="text-sm text-slate-500">Vendor Payments</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Recent Expenses</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { date: '2026-08-10', desc: 'Electricity Bill - Central Campus', cat: 'Utilities', amount: 150000, status: 'Approved' },
                { date: '2026-08-09', desc: 'Lab Equipment Purchase', cat: 'Procurement', amount: 450000, status: 'Pending' },
                { date: '2026-08-08', desc: 'Marketing Campaign - Fall 2026', cat: 'Marketing', amount: 200000, status: 'Paid' },
                { date: '2026-08-07', desc: 'Server Maintenance (CloudPanel)', cat: 'IT Services', amount: 45000, status: 'Paid' },
                { date: '2026-08-05', desc: 'Office Supplies - HR Dept', cat: 'Supplies', amount: 15000, status: 'Paid' },
              ].map((exp, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4 text-sm text-slate-500">{exp.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">{exp.desc}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{exp.cat}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">৳ {exp.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                      exp.status === 'Approved' ? 'bg-indigo-100 text-indigo-700' :
                      exp.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {exp.status}
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
