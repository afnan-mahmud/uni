"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, phone }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Registration failed");
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-2xl">U</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
                        <p className="text-gray-600 mt-1">Join the University ERP</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="you@university.edu"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone (optional)
                            </label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="+8801XXXXXXXXX"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Minimum 6 characters"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}