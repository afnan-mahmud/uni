"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Mail, Lock } from "lucide-react";

const DEMO_ACCOUNTS = [
    { label: "Admin Portal", email: "admin@erp.com", password: "password", role: "admin", color: "bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100 hover:border-indigo-200" },
    { label: "Student Portal", email: "student@erp.com", password: "password", role: "student", color: "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100 hover:border-blue-200" },
    { label: "Faculty Portal", email: "faculty@erp.com", password: "password", role: "faculty", color: "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200" },
    { label: "Finance Portal", email: "finance@erp.com", password: "password", role: "finance_officer", color: "bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100 hover:border-amber-200" },
];

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Login failed");
                return;
            }

            localStorage.setItem("token", data.data.token);
            localStorage.setItem("user", JSON.stringify(data.data.user));
            router.push("/dashboard");
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-indigo-100 selection:text-indigo-900">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[2rem] shadow-2xl shadow-indigo-100/50 overflow-hidden border border-slate-100">
                {/* Left Side - Branding */}
                <div className="hidden lg:flex flex-col justify-between bg-slate-900 p-12 relative overflow-hidden text-white">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
                    
                    <div className="relative z-10 flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">U</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">University ERP</span>
                    </div>

                    <div className="relative z-10 max-w-sm mt-20 mb-auto">
                        <h2 className="text-4xl font-extrabold mb-6 leading-tight">Empowering Modern Education</h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            A centralized enterprise resource planning system connecting students, faculty, and administration.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-300">
                                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                                <span>Enterprise-grade security</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300">
                                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                                <span>Role-based access control</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300">
                                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                                <span>Real-time data synchronization</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 text-sm text-slate-500 flex flex-col gap-1 border-t border-slate-800/60 pt-6 mt-8">
                        <p>© {new Date().getFullYear()} University ERP. All rights reserved.</p>
                        <p>
                            Developed by <a href="https://www.cholobohudur.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 font-semibold transition">Cholo Bohudur</a>.
                        </p>
                        <p className="text-xs text-slate-600 max-w-sm mt-1 leading-relaxed">
                            A proud initiative of <span className="text-slate-400 font-medium">Launchpad</span> — Specializing in AI System Development and Enterprise Custom Software Solutions.
                        </p>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                            <span className="text-white font-bold text-lg">U</span>
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">University ERP</span>
                    </div>

                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
                        <p className="text-slate-500">Enter your credentials to access your portal</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-sm font-medium flex items-center gap-2 animate-fade-in-up">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5 mb-8">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                University Email
                            </label>
                            <div className="relative">
                                <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium placeholder:font-normal placeholder:text-slate-400"
                                    placeholder="you@university.edu"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-bold text-slate-700">
                                    Password
                                </label>
                                <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium placeholder:font-normal placeholder:text-slate-400"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold text-base hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2 group mt-2"
                        >
                            {loading ? "Authenticating..." : "Sign In to Portal"}
                            {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="relative mt-8 mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-slate-500 font-medium">Quick Demo Access</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {DEMO_ACCOUNTS.map((acc) => (
                            <button
                                key={acc.role}
                                type="button"
                                onClick={() => {
                                    setEmail(acc.email);
                                    setPassword(acc.password);
                                }}
                                className={`px-4 py-3 text-sm font-semibold rounded-xl border transition-all flex items-center justify-center text-center ${acc.color}`}
                            >
                                {acc.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}