"use client";

import Link from "next/link";
import { BookOpen, Calendar, Clock, CreditCard, FileText, CheckCircle2, TrendingUp, Bell } from "lucide-react";

export default function StudentDashboard() {
    // Mock logged-in student data
    const student = {
        name: "Aarav Rahman",
        id: "STU-2024-001",
        program: "B.Sc Computer Science",
        semester: "Semester 3",
        cgpa: 3.84,
        attendance: 92,
        upcomingClasses: [
            { course: "CSE 201 - Data Structures", time: "10:00 AM", room: "Room 305" },
            { course: "MAT 201 - Linear Algebra", time: "12:30 PM", room: "Room 201" }
        ],
        recentGrades: [
            { course: "CSE 102", grade: "A+" },
            { course: "ENG 101", grade: "A" }
        ],
        dueFees: 0
    };

    const quickLinks = [
        { label: "My Courses", href: "/dashboard/courses", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Class Routine", href: "/dashboard/routine", icon: Calendar, color: "text-indigo-500", bg: "bg-indigo-50" },
        { label: "Attendance", href: "/dashboard/attendance", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
        { label: "Examinations", href: "/dashboard/exams", icon: FileText, color: "text-purple-500", bg: "bg-purple-50" },
        { label: "Results & CGPA", href: "/dashboard/results", icon: TrendingUp, color: "text-rose-500", bg: "bg-rose-50" },
        { label: "Payments", href: "/dashboard/payments", icon: CreditCard, color: "text-amber-500", bg: "bg-amber-50" },
    ];

    return (
        <div className="space-y-8 pb-10">
            {/* Welcome banner */}
            <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-800 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl shadow-indigo-200/50">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
                
                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight">
                            Welcome back, {student.name}
                        </h1>
                        <p className="text-indigo-100 text-lg font-medium flex items-center gap-3">
                            <span className="bg-white/20 px-3 py-1 rounded-lg backdrop-blur-md">{student.id}</span>
                            <span>{student.program}</span>
                            <span>•</span>
                            <span>{student.semester}</span>
                        </p>
                    </div>
                    <div className="flex gap-4 text-center">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 min-w-[100px]">
                            <p className="text-indigo-100 text-xs font-semibold uppercase tracking-wider mb-1">CGPA</p>
                            <p className="text-2xl font-bold">{student.cgpa.toFixed(2)}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 min-w-[100px]">
                            <p className="text-indigo-100 text-xs font-semibold uppercase tracking-wider mb-1">Attendance</p>
                            <p className="text-2xl font-bold">{student.attendance}%</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Quick Links & Schedule */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Quick Access */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            Quick Access
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-100 transition group flex flex-col items-center text-center gap-3"
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${link.bg} group-hover:scale-110 transition-transform`}>
                                        <link.icon className={`w-6 h-6 ${link.color}`} />
                                    </div>
                                    <span className="font-semibold text-slate-700 text-sm">{link.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Today's Schedule */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-800">Today's Schedule</h2>
                            <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">2 Classes</span>
                        </div>
                        <div className="space-y-4">
                            {student.upcomingClasses.map((cls, idx) => (
                                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition">
                                    <div className="w-16 flex flex-col items-center justify-center border-r border-slate-200 pr-4 shrink-0">
                                        <span className="text-sm font-bold text-slate-800">{cls.time.split(" ")[0]}</span>
                                        <span className="text-xs font-semibold text-slate-500">{cls.time.split(" ")[1]}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-1">{cls.course}</h4>
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <Clock className="w-4 h-4" /> {cls.room}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Notices & Info */}
                <div className="space-y-8">
                    {/* Financial Status */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <CreditCard className="w-24 h-24 text-emerald-500" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800 mb-2">Financial Status</h2>
                        {student.dueFees === 0 ? (
                            <div>
                                <p className="text-3xl font-black text-emerald-500 mb-1">$0.00</p>
                                <p className="text-sm font-medium text-slate-500">No pending dues for this semester.</p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-3xl font-black text-rose-500 mb-1">${student.dueFees}</p>
                                <p className="text-sm font-medium text-slate-500">Please clear your dues by Aug 20.</p>
                            </div>
                        )}
                        <button className="mt-6 w-full py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition shadow-md">
                            View Ledger
                        </button>
                    </div>

                    {/* Recent Notices */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-slate-800">Notice Board</h2>
                            <Bell className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="space-y-5">
                            <div className="group cursor-pointer">
                                <p className="text-xs font-bold text-indigo-500 mb-1 tracking-wider uppercase">Academics • Today</p>
                                <h4 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition leading-snug">Midterm Examination Schedule Published for Fall 2024</h4>
                            </div>
                            <div className="group cursor-pointer">
                                <p className="text-xs font-bold text-emerald-500 mb-1 tracking-wider uppercase">Events • Yesterday</p>
                                <h4 className="font-semibold text-slate-800 group-hover:text-emerald-600 transition leading-snug">Annual Tech Fest Registration is now open!</h4>
                            </div>
                            <div className="group cursor-pointer">
                                <p className="text-xs font-bold text-amber-500 mb-1 tracking-wider uppercase">Admin • Aug 10</p>
                                <h4 className="font-semibold text-slate-800 group-hover:text-amber-600 transition leading-snug">Library will remain closed this Friday for maintenance.</h4>
                            </div>
                        </div>
                        <button className="mt-6 w-full py-2 bg-slate-50 text-slate-600 rounded-xl font-medium hover:bg-slate-100 transition border border-slate-200">
                            View All Notices
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}