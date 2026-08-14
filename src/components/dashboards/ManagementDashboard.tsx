"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BarChart3, BookOpen, CreditCard, GraduationCap, Landmark, Users, Wallet } from "lucide-react";

export default function ManagementDashboard() {
    const [stats, setStats] = useState({
        students: 0,
        courses: 0,
        departments: 0,
        programs: 0,
        payments: 0,
        totalRevenue: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        async function fetchData() {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const [studentsRes, coursesRes, deptsRes, progsRes, payRes] =
                    await Promise.all([
                        fetch("/api/students", { headers }),
                        fetch("/api/courses", { headers }),
                        fetch("/api/departments", { headers }),
                        fetch("/api/programs", { headers }),
                        fetch("/api/payments", { headers }),
                    ]);
                const students = await studentsRes.json();
                const courses = await coursesRes.json();
                const depts = await deptsRes.json();
                const progs = await progsRes.json();
                const pays = await payRes.json();
                const payments = pays.data || [];
                setStats({
                    students: students.data?.length || 0,
                    courses: courses.data?.length || 0,
                    departments: depts.data?.length || 0,
                    programs: progs.data?.length || 0,
                    payments: payments.length,
                    totalRevenue: payments.reduce(
                        (sum: number, p: { amount: number }) => sum + p.amount,
                        0
                    ),
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
        { label: "Total Students", value: stats.students, icon: Users, tint: "bg-indigo-50 text-indigo-600" },
        { label: "Courses", value: stats.courses, icon: BookOpen, tint: "bg-emerald-50 text-emerald-600" },
        { label: "Departments", value: stats.departments, icon: Landmark, tint: "bg-violet-50 text-violet-600" },
        { label: "Programs", value: stats.programs, icon: GraduationCap, tint: "bg-amber-50 text-amber-600" },
        { label: "Payments", value: stats.payments, icon: CreditCard, tint: "bg-rose-50 text-rose-600" },
        { label: "Revenue", value: `৳${stats.totalRevenue.toLocaleString()}`, icon: Wallet, tint: "bg-teal-50 text-teal-600" },
    ];

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="gradient-primary rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-white/5 rounded-full"></div>
                <h1 className="text-2xl font-bold mb-2 relative">University Overview</h1>
                <p className="text-indigo-100 relative">
                    High-level analytics for university leadership.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Access</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link href="/dashboard/students" className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 card-hover flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                            <Users size={18} strokeWidth={1.75} />
                        </span>
                        <span className="text-sm font-medium text-slate-700">Students</span>
                    </Link>
                    <Link href="/dashboard/departments" className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 card-hover flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                            <Landmark size={18} strokeWidth={1.75} />
                        </span>
                        <span className="text-sm font-medium text-slate-700">Departments</span>
                    </Link>
                    <Link href="/dashboard/results" className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 card-hover flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                            <BarChart3 size={18} strokeWidth={1.75} />
                        </span>
                        <span className="text-sm font-medium text-slate-700">Results</span>
                    </Link>
                    <Link href="/dashboard/payments" className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 card-hover flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                            <Wallet size={18} strokeWidth={1.75} />
                        </span>
                        <span className="text-sm font-medium text-slate-700">Finance</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}