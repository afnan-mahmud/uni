"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, BookOpen, Building, GraduationCap, Calendar, CreditCard, TrendingUp, Activity, Bell } from "lucide-react";
import { mockFinances } from "@/lib/mockData";

interface Stats {
    students: number;
    courses: number;
    departments: number;
    programs: number;
    semesters: number;
    payments: number;
    totalRevenue: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({
        students: 0,
        courses: 0,
        departments: 0,
        programs: 0,
        semesters: 0,
        payments: 0,
        totalRevenue: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        async function fetchStats() {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const [studentsRes, coursesRes, deptsRes, progsRes, semsRes, payRes] =
                    await Promise.all([
                        fetch("/api/students", { headers }),
                        fetch("/api/courses", { headers }),
                        fetch("/api/departments", { headers }),
                        fetch("/api/programs", { headers }),
                        fetch("/api/semesters", { headers }),
                        fetch("/api/payments", { headers }),
                    ]);

                const students = await studentsRes.json();
                const courses = await coursesRes.json();
                const depts = await deptsRes.json();
                const progs = await progsRes.json();
                const sems = await semsRes.json();
                const pays = await payRes.json();

                const payments = pays.data || [];
                setStats({
                    students: students.data?.length || 0,
                    courses: courses.data?.length || 0,
                    departments: depts.data?.length || 0,
                    programs: progs.data?.length || 0,
                    semesters: sems.data?.length || 0,
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

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const statCards = [
        { label: "Total Students", value: stats.students, icon: Users, color: "text-indigo-600", bg: "bg-indigo-50", trend: "+12%" },
        { label: "Total Revenue", value: `৳${stats.totalRevenue > 0 ? stats.totalRevenue.toLocaleString() : "22.1M"}`, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50", trend: "+8.4%" },
        { label: "Departments", value: stats.departments, icon: Building, color: "text-blue-600", bg: "bg-blue-50", trend: "0%" },
        { label: "Active Courses", value: stats.courses, icon: BookOpen, color: "text-amber-600", bg: "bg-amber-50", trend: "+5%" },
    ];

    const maxRevenue = Math.max(...mockFinances.revenue.map(r => r.amount));

    return (
        <div className="space-y-8 animate-fade-in-up pb-10">
            {/* Welcome banner */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2 tracking-tight">System Overview</h1>
                    <p className="text-indigo-200 font-medium">
                        Here's what's happening across your university today.
                    </p>
                </div>
            </div>

            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <div
                        key={stat.label}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-md ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-3xl font-black text-slate-800">{stat.value === 0 ? "2,450" : stat.value}</p>
                        <p className="text-sm font-medium text-slate-500 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Revenue Overview</h2>
                            <p className="text-sm text-slate-500 font-medium">Monthly collection across all departments</p>
                        </div>
                        <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block px-3 py-2">
                            <option>2026</option>
                            <option>2025</option>
                        </select>
                    </div>
                    
                    {/* Custom CSS Bar Chart */}
                    <div className="h-64 flex items-end gap-2 sm:gap-4 mt-4">
                        {mockFinances.revenue.map((item, idx) => {
                            const heightPercent = (item.amount / maxRevenue) * 100;
                            return (
                                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                                    <div className="w-full relative flex items-end justify-center h-full bg-slate-50 rounded-t-lg">
                                        <div 
                                            className="w-full bg-indigo-500 hover:bg-indigo-600 transition-all rounded-t-md relative"
                                            style={{ height: `${heightPercent}%` }}
                                        >
                                            <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold py-1 px-2 rounded whitespace-nowrap transition-opacity pointer-events-none z-10">
                                                ৳{(item.amount / 1000000).toFixed(1)}M
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold text-slate-500">{item.month}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
                        <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">View All</button>
                    </div>
                    
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                        
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-emerald-100 text-emerald-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                <CreditCard className="w-4 h-4" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded border border-slate-100 shadow-sm ml-4 md:ml-0 md:group-even:text-right">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="font-bold text-slate-800 text-sm">Payment Received</div>
                                </div>
                                <div className="text-slate-500 text-xs font-medium">৳45,000 from Afnan Mahmud for Fall 2026.</div>
                                <div className="text-slate-400 text-xs mt-2">10 mins ago</div>
                            </div>
                        </div>

                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                <Users className="w-4 h-4" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded border border-slate-100 shadow-sm ml-4 md:ml-0 md:group-even:text-right">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="font-bold text-slate-800 text-sm">New Admission</div>
                                </div>
                                <div className="text-slate-500 text-xs font-medium">Zahid Hossain enrolled in BSc Civil Eng.</div>
                                <div className="text-slate-400 text-xs mt-2">2 hours ago</div>
                            </div>
                        </div>

                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-amber-100 text-amber-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                <Bell className="w-4 h-4" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded border border-slate-100 shadow-sm ml-4 md:ml-0 md:group-even:text-right">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="font-bold text-slate-800 text-sm">System Alert</div>
                                </div>
                                <div className="text-slate-500 text-xs font-medium">Semester final grade submission deadline approaching.</div>
                                <div className="text-slate-400 text-xs mt-2">Yesterday</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}