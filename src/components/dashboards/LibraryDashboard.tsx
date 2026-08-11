"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LibraryDashboard() {
    const [stats, setStats] = useState({
        students: 0,
        courses: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        async function fetchData() {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const [studentsRes, coursesRes] = await Promise.all([
                    fetch("/api/students", { headers }),
                    fetch("/api/courses", { headers }),
                ]);
                const students = await studentsRes.json();
                const courses = await coursesRes.json();
                setStats({
                    students: students.data?.length || 0,
                    courses: courses.data?.length || 0,
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
        { label: "Registered Students", value: stats.students, icon: "👨‍🎓", color: "from-indigo-500 to-blue-500" },
        { label: "Course Materials", value: stats.courses, icon: "📚", color: "from-emerald-500 to-teal-500" },
    ];

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="gradient-primary rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <h1 className="text-2xl font-bold mb-2 relative">Library Management</h1>
                <p className="text-indigo-100 relative">
                    Manage the university library and resources.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {statCards.map((stat, i) => (
                    <div
                        key={stat.label}
                        className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 card-hover animate-fade-in-up"
                        style={{ animationDelay: `${i * 0.05}s` }}
                    >
                        <div className={`icon-bubble bg-gradient-to-br ${stat.color} text-white mb-4`}>
                            {stat.icon}
                        </div>
                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                        <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link href="/dashboard/students" className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 card-hover flex items-center gap-3">
                        <span className="text-2xl">👨‍🎓</span>
                        <span className="font-medium text-slate-700">Library Members</span>
                    </Link>
                    <Link href="/dashboard/courses" className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 card-hover flex items-center gap-3">
                        <span className="text-2xl">📚</span>
                        <span className="font-medium text-slate-700">Resources</span>
                    </Link>
                    <Link href="/dashboard/notifications" className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 card-hover flex items-center gap-3">
                        <span className="text-2xl">🔔</span>
                        <span className="font-medium text-slate-700">Notifications</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}