"use client";

import { useState } from "react";
import { mockStudents } from "@/lib/mockData";
import { Search, Download, UserPlus, Users, GraduationCap, FileText, MoreVertical } from "lucide-react";

export default function StudentsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredStudents = mockStudents.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              s.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || s.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 tracking-tight">
                        Student Management
                    </h1>
                    <p className="text-slate-500 mt-2">Manage enrolled students, profiles, and academic status.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 hover:shadow-sm transition font-medium shadow-sm">
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition font-medium">
                        <UserPlus className="w-4 h-4" /> Add Student
                    </button>
                </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 flex items-center gap-4 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Enrolled</p>
                        <h3 className="text-2xl font-bold text-slate-800">{mockStudents.length.toLocaleString()}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 flex items-center gap-4 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                        <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Graduating Batch</p>
                        <h3 className="text-2xl font-bold text-slate-800">{mockStudents.filter(s => s.status === 'Graduating').length}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 flex items-center gap-4 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">On Warning</p>
                        <h3 className="text-2xl font-bold text-slate-800">{mockStudents.filter(s => s.status === 'Warning').length}</h3>
                    </div>
                </div>
            </div>

            {/* Data Table Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div className="relative w-80">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search by name or ID..." 
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select 
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition appearance-none cursor-pointer"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="warning">Warning</option>
                            <option value="graduating">Graduating</option>
                            <option value="suspended">Suspended</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold bg-slate-50">
                                <th className="p-4 pl-6">Student Info</th>
                                <th className="p-4">Department</th>
                                <th className="p-4">Semester</th>
                                <th className="p-4">CGPA</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right pr-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-slate-50/80 transition group">
                                    <td className="p-4 pl-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">{student.name}</p>
                                                <div className="flex gap-2 items-center text-xs text-slate-500 mt-0.5">
                                                    <span>{student.id}</span>
                                                    <span>•</span>
                                                    <span>{student.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                                            {student.department}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-slate-600">{student.semester}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-slate-700">{student.gpa.toFixed(2)}</span>
                                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full rounded-full ${student.gpa >= 3.5 ? 'bg-emerald-500' : student.gpa >= 2.5 ? 'bg-amber-500' : 'bg-red-500'}`} 
                                                    style={{ width: `${(student.gpa / 4.0) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
                                            ${student.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                                              student.status === 'Graduating' ? 'bg-blue-100 text-blue-700' : 
                                              student.status === 'Warning' ? 'bg-amber-100 text-amber-700' : 
                                              'bg-red-100 text-red-700'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 
                                                ${student.status === 'Active' ? 'bg-emerald-500' : 
                                                  student.status === 'Graduating' ? 'bg-blue-500' : 
                                                  student.status === 'Warning' ? 'bg-amber-500' : 
                                                  'bg-red-500'}`}></span>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="p-4 pr-6 text-right">
                                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredStudents.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500">
                                        No students found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}