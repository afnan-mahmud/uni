import React from 'react';

interface Props {
  moduleName: string;
}

export default function FinancePlaceholder({ moduleName }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
      <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{moduleName}</h2>
      <p className="text-slate-500 max-w-md mx-auto mb-8">
        This module is part of our comprehensive University Finance ecosystem. It is currently being integrated and will be available in the upcoming release.
      </p>
      <div className="flex items-center gap-4 text-sm font-medium text-slate-400">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          Under Active Development
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-amber-400"></div>
          Targeting Q4 Release
        </div>
      </div>
    </div>
  );
}
