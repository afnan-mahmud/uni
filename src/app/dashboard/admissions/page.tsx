"use client";

import { mockAdmissions } from "@/lib/mockData";
import { UserCheck, FileText, Search } from "lucide-react";

export default function AdmissionsDashboard() {
    const columns = [
        { id: 'Applied', title: 'New Applications', color: 'bg-slate-100', border: 'border-slate-200', text: 'text-slate-700' },
        { id: 'Test', title: 'Admission Test', color: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-700' },
        { id: 'Merit List', title: 'Merit List', color: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
        { id: 'Admitted', title: 'Admitted', color: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 tracking-tight">
                        Admissions Pipeline
                    </h1>
                    <p className="text-slate-500 mt-2">Track applicant status from submission to enrollment.</p>
                </div>
                <div className="relative w-72">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search applicants..." 
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                    />
                </div>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[75vh]">
                {columns.map(col => {
                    const applicants = mockAdmissions.filter(a => a.status === col.id);
                    return (
                        <div key={col.id} className="flex flex-col h-full bg-slate-100/50 rounded-2xl p-4 border border-slate-200/60">
                            <div className="flex justify-between items-center mb-4 px-2">
                                <h3 className="font-semibold text-slate-800">{col.title}</h3>
                                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${col.color} ${col.border} border ${col.text}`}>
                                    {applicants.length}
                                </span>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto space-y-3 pb-4 pr-1">
                                {applicants.map(applicant => (
                                    <div key={applicant.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition cursor-pointer group">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-medium text-slate-500">{applicant.id}</span>
                                            {applicant.testScore && (
                                                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                                                    Score: {applicant.testScore}
                                                </span>
                                            )}
                                        </div>
                                        <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition">{applicant.name}</h4>
                                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                            <FileText className="w-3 h-3" /> {applicant.program}
                                        </p>
                                        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                                            <span className="text-xs text-slate-400">{applicant.date}</span>
                                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center hover:bg-indigo-100 hover:text-indigo-600 transition text-slate-400">
                                                <UserCheck className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {applicants.length === 0 && (
                                    <div className="h-24 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm">
                                        No applicants
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
