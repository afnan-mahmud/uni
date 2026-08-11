import React from 'react';

export interface ModuleConfig {
  title: string;
  description: string;
  primaryButton: string;
  secondaryButton?: string;
  kpis: { label: string; value: string; color: string }[];
  columns: string[];
  data: (string | React.ReactNode)[][];
}

export default function GenericModuleView({ config }: { config: ModuleConfig }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{config.title}</h2>
          <p className="text-slate-500">{config.description}</p>
        </div>
        <div className="flex gap-3">
          {config.secondaryButton && (
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
              {config.secondaryButton}
            </button>
          )}
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm">
            {config.primaryButton}
          </button>
        </div>
      </div>

      {config.kpis.length > 0 && (
        <div className={`grid grid-cols-1 md:grid-cols-${config.kpis.length > 4 ? 4 : config.kpis.length} gap-6`}>
          {config.kpis.map((kpi, idx) => (
            <div key={idx} className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 ${kpi.color}`}>
              <p className="text-sm font-medium text-slate-500 mb-1">{kpi.label}</p>
              <h3 className="text-2xl font-bold text-slate-800">{kpi.value}</h3>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-semibold text-slate-800">Recent Records</h3>
          <div className="relative">
            <input type="text" placeholder="Search records..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-64" />
            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {config.columns.map((col, idx) => (
                  <th key={idx} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {config.data.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-slate-50/50 transition">
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className={`px-6 py-4 text-sm ${cellIdx === 0 ? 'font-medium text-slate-800' : 'text-slate-500'}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
