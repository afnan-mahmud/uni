"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BarChart3, BookOpen, FileCheck2, UserCheck } from "lucide-react";

export default function FacultyDashboard() {
    const [stats, setStats] = useState({
        courses: 0,
        exams: 0,
        results: 0,
        attendance: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        async function fetchData() {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const [coursesRes, examsRes, resultsRes, attRes] = await Promise.all([
                    fetch("/api/courses", { headers }),
                    fetch("/api/exams", { headers }),
                    fetch("/api/results", { headers }),
                    fetch("/api/attendance", { headers }),
                ]);
                const courses = await coursesRes.json();
                const exams = await examsRes.json();
                const results = await resultsRes.json();
                const att = await attRes.json();
                setStats({
                    courses: courses.data?.length || 0,
                    exams: exams.data?.length || 0,
                    results: results.data?.length || 0,
                    attendance: att.data?.length || 0,
                });
            } catch {
                // ignore
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const statCards = [
        { label: "Assigned Courses", value: stats.courses, icon: BookOpen, tint: "bg-indigo-50 text-indigo-600" },
        { label: "Exams Scheduled", value: stats.exams, icon: FileCheck2, tint: "bg-emerald-50 text-emerald-600" },
        { label: "Results Entered", value: stats.results, icon: BarChart3, tint: "bg-violet-50 text-violet-600" },
        { label: "Attendance Records", value: stats.attendance, icon: UserCheck, tint: "bg-amber-50 text-amber-600" },
    ];

    const quickActions = [
        { label: "Mark Attendance", href: "/dashboard/attendance", icon: UserCheck },
        { label: "Schedule Exam", href: "/dashboard/exams", icon: FileCheck2 },
        { label: "Enter Results", href: "/dashboard/results", icon: BarChart3 },
        { label: "View Courses", href: "/dashboard/courses", icon: BookOpen },
    ];

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="gradient-primary rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <h1 className="text-2xl font-bold mb-2 relative">Faculty Dashboard</h1>
                <p className="text-indigo-100 relative">
                    Manage your courses, exams, and student results.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, i) => (
                    <div
                        key={stat.label}
                        className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 card-hover animate-fade-in-up"
                        style={{ animationDelay: `${i * 0.05}s` }}
                    >
                        <div className={`icon-bubble ${stat.tint} mb-4`}>
                            <stat.icon size={20} strokeWidth={1.75} />
                        </div>
                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                        <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action) => (
                        <Link
                            key={action.label}
                            href={action.href}
                            className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 card-hover flex items-center gap-3"
                        >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                                <action.icon size={18} strokeWidth={1.75} />
                            </span>
                            <span className="text-sm font-medium text-slate-700">{action.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}