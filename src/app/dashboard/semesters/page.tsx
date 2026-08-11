"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Semester {
    _id: string;
    name: string;
    code: string;
    academicYear: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    registrationOpen: boolean;
}

export default function SemestersPage() {
    const router = useRouter();
    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        academicYear: "",
        startDate: "",
        endDate: "",
        isActive: false,
        registrationOpen: false,
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        async function fetchSemesters() {
            try {
                const res = await fetch("/api/semesters", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setSemesters(data.data || []);
            } catch {
                // ignore
            } finally {
                setLoading(false);
            }
        }

        fetchSemesters();
    }, [router]);

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        setMessage("");

        try {
            const res = await fetch("/api/semesters", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                setMessage(data.message || "Failed to create semester");
                return;
            }
            setMessage("Semester created successfully!");
            setShowForm(false);
            setFormData({ name: "", code: "", academicYear: "", startDate: "", endDate: "", isActive: false, registrationOpen: false });
            const semRes = await fetch("/api/semesters", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const semData = await semRes.json();
            setSemesters(semData.data || []);
        } catch {
            setMessage("Something went wrong");
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="text-gray-500 hover:text-blue-600 transition">← Dashboard</Link>
                        <h1 className="text-lg font-bold text-gray-900">Semesters</h1>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Semesters ({semesters.length})</h2>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        {showForm ? "Cancel" : "+ Add Semester"}
                    </button>
                </div>

                {message && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-sm">{message}</div>
                )}

                {showForm && (
                    <form onSubmit={handleCreate} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Add New Semester</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Spring 2026" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
                                <input type="text" required value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="SPR26" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year *</label>
                                <input type="text" required value={formData.academicYear} onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="2025-2026" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                                <input type="date" required value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                                <input type="date" required value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="flex items-center gap-6 pt-6">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm text-gray-700">Active</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={formData.registrationOpen} onChange={(e) => setFormData({ ...formData, registrationOpen: e.target.checked })}
                                        className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm text-gray-700">Registration Open</span>
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                            Create Semester
                        </button>
                    </form>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Academic Year</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {semesters.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500">No semesters found.</td>
                                    </tr>
                                ) : (
                                    semesters.map((sem) => (
                                        <tr key={sem._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{sem.name}</td>
                                            <td className="px-4 py-3 text-sm font-mono text-blue-600">{sem.code}</td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{sem.academicYear}</td>
                                            <td className="px-4 py-3 text-sm text-gray-500">
                                                {new Date(sem.startDate).toLocaleDateString()} — {new Date(sem.endDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${sem.isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                                                    {sem.isActive ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${sem.registrationOpen ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                                                    {sem.registrationOpen ? "Open" : "Closed"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}