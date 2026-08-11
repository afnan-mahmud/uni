"use client";

import { mockEmployees } from "@/lib/mockData";
import { Users, Briefcase, CalendarOff, Search, MoreVertical, Plus } from "lucide-react";
import { useState } from "react";

export default function HRDashboard() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredEmployees = mockEmployees.filter(emp => 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        emp.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 tracking-tight">
                        Human Resources
                    </h1>
                    <p className="text-slate-500 mt-2">Manage employee directory, payroll, and leave requests.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition font-medium">
                    <Plus className="w-4 h-4" /> Add Employee
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Employee Directory */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-indigo-500" /> Employee Directory
                        </h3>
                        <div className="relative w-64">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Search employees..." 
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-1.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                            />
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold bg-white">
                                    <th className="p-4 pl-6">Employee</th>
                                    <th className="p-4">Department</th>
                                    <th className="p-4">Type</th>
                                    <th className="p-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredEmployees.map(emp => (
                                    <tr key={emp.id} className="hover:bg-slate-50/80 transition group cursor-pointer">
                                        <td className="p-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200">
                                                    {emp.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition">{emp.name}</p>
                                                    <p className="text-xs text-slate-500">{emp.role} • {emp.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-slate-600 font-medium">{emp.department}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border
                                                ${emp.type === 'Faculty' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                                                {emp.type}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                                                ${emp.status === 'Present' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                                                {emp.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Leave Requests & Stats */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
                        <Users className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10" />
                        <h3 className="font-medium text-indigo-100 mb-1">Total Workforce</h3>
                        <div className="text-4xl font-bold mb-6">{mockEmployees.length}</div>
                        <div className="flex justify-between text-sm bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                            <div>
                                <span className="block text-indigo-200">Present Today</span>
                                <span className="font-bold text-lg">{mockEmployees.filter(e => e.status === 'Present').length}</span>
                            </div>
                            <div className="text-right">
                                <span className="block text-indigo-200">On Leave</span>
                                <span className="font-bold text-lg">{mockEmployees.filter(e => e.status === 'On Leave').length}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <CalendarOff className="w-5 h-5 text-amber-500" /> Pending Leave Requests
                            </h3>
                        </div>
                        <div className="space-y-4">
                            {/* Static mock leave requests */}
                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-sm text-slate-800">Salma Begum</h4>
                                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">Pending</span>
                                </div>
                                <p className="text-xs text-slate-500 mb-3">Sick Leave • 2 Days (Aug 12 - Aug 13)</p>
                                <div className="flex gap-2">
                                    <button className="flex-1 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg hover:bg-emerald-100 transition">Approve</button>
                                    <button className="flex-1 py-1.5 bg-rose-50 text-rose-700 text-xs font-bold rounded-lg hover:bg-rose-100 transition">Reject</button>
                                </div>
                            </div>
                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-sm text-slate-800">Rafiqul Islam</h4>
                                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">Pending</span>
                                </div>
                                <p className="text-xs text-slate-500 mb-3">Casual Leave • 1 Day (Aug 15)</p>
                                <div className="flex gap-2">
                                    <button className="flex-1 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg hover:bg-emerald-100 transition">Approve</button>
                                    <button className="flex-1 py-1.5 bg-rose-50 text-rose-700 text-xs font-bold rounded-lg hover:bg-rose-100 transition">Reject</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
