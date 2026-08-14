"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, CreditCard, Users, Wallet } from "lucide-react";

export default function HRDashboard() {
    const [stats, setStats] = useState({
        students: 0,
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
                const [studentsRes, payRes] = await Promise.all([
                    fetch("/api/students", { headers }),
                    fetch("/api/payments", { headers }),
                ]);
                const students = await studentsRes.json();
                const pays = await payRes.json();
                const payments = pays.data || [];
                setStats({
                    students: students.data?.length || 0,
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
        { label: "Payments", value: stats.payments, icon: CreditCard, tint: "bg-emerald-50 text-emerald-600" },
        { label: "Revenue", value: `৳${stats.totalRevenue.toLocaleString()}`, icon: Wallet, tint: "bg-violet-50 text-violet-600" },
    ];

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="gradient-primary rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <h1 className="text-2xl font-bold mb-2 relative">HR & Administration</h1>
                <p className="text-indigo-100 relative">
                    Manage university workforce and administrative operations.
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
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link href="/dashboard/students" className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 card-hover flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                            <Users size={18} strokeWidth={1.75} />
                        </span>
                        <span className="text-sm font-medium text-slate-700">View Students</span>
                    </Link>
                    <Link href="/dashboard/payments" className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 card-hover flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                            <CreditCard size={18} strokeWidth={1.75} />
                        </span>
                        <span className="text-sm font-medium text-slate-700">View Payments</span>
                    </Link>
                    <Link href="/dashboard/notifications" className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 card-hover flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                            <Bell size={18} strokeWidth={1.75} />
                        </span>
                        <span className="text-sm font-medium text-slate-700">Notifications</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}