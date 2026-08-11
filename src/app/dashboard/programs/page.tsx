"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Program {
    _id: string;
    name: string;
    code: string;
    department?: { name: string };
    durationYears: number;
    totalCredits: number;
    degree: string;
}

export default function ProgramsPage() {
    const router = useRouter();
    const [programs, setPrograms] = useState<Program[]>([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        department: "",
        durationYears: "4",
        totalCredits: "130",
        degree: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        async function fetchData() {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const [progsRes, deptsRes] = await Promise.all([
                    fetch("/api/programs", { headers }),
                    fetch("/api/departments", { headers }),
                ]);
                const progsData = await progsRes.json();
                const deptsData = await deptsRes.json();
                setPrograms(progsData.data || []);
                setDepartments(deptsData.data || []);
            } catch {
                // ignore
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [router]);

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        setMessage("");

        try {
            const res = await fetch("/api/programs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    durationYears: Number(formData.durationYears),
                    totalCredits: Number(formData.totalCredits),
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                setMessage(data.message || "Failed to create program");
                return;
            }
            setMessage("Program created successfully!");
            setShowForm(false);
            setFormData({ name: "", code: "", department: "", durationYears: "4", totalCredits: "130", degree: "" });
            const progsRes = await fetch("/api/programs", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const progsData = await progsRes.json();
            setPrograms(progsData.data || []);
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
                        <h1 className="text-lg font-bold text-gray-900">Programs</h1>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Programs ({programs.length})</h2>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        {showForm ? "Cancel" : "+ Add Program"}
                    </button>
                </div>

                {message && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-sm">{message}</div>
                )}

                {showForm && (
                    <form onSubmit={handleCreate} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Add New Program</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="B.Sc. in Computer Science" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
                                <input type="text" required value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="BSCSE" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Degree *</label>
                                <input type="text" required value={formData.degree} onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Bachelor of Science" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                                <select required value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select department</option>
                                    {departments.map((d: { _id: string; name: string }) => (
                                        <option key={d._id} value={d._id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Years) *</label>
                                <input type="number" min={1} max={6} required value={formData.durationYears} onChange={(e) => setFormData({ ...formData, durationYears: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Total Credits *</label>
                                <input type="number" min={60} required value={formData.totalCredits} onChange={(e) => setFormData({ ...formData, totalCredits: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>
                        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                            Create Program
                        </button>
                    </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {programs.length === 0 ? (
                        <div className="col-span-full text-center py-8 text-gray-500">No programs found.</div>
                    ) : (
                        programs.map((program) => (
                            <div key={program._id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-semibold text-gray-900">{program.name}</h3>
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-xs font-mono font-medium">{program.code}</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-1">{program.degree}</p>
                                <p className="text-sm text-gray-500 mb-1">Department: {program.department?.name || "-"}</p>
                                <p className="text-sm text-gray-500 mb-2">{program.durationYears} years • {program.totalCredits} credits</p>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}