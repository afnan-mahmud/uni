"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Department {
    _id: string;
    name: string;
    code: string;
    faculty: string;
    description?: string;
}

export default function DepartmentsPage() {
    const router = useRouter();
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: "", code: "", faculty: "", description: "" });
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        async function fetchDepartments() {
            try {
                const res = await fetch("/api/departments", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setDepartments(data.data || []);
            } catch {
                // ignore
            } finally {
                setLoading(false);
            }
        }

        fetchDepartments();
    }, [router]);

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        setMessage("");

        try {
            const res = await fetch("/api/departments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                setMessage(data.message || "Failed to create department");
                return;
            }
            setMessage("Department created successfully!");
            setShowForm(false);
            setFormData({ name: "", code: "", faculty: "", description: "" });
            const deptsRes = await fetch("/api/departments", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const deptsData = await deptsRes.json();
            setDepartments(deptsData.data || []);
        } catch {
            setMessage("Something went wrong");
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading departments...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="text-gray-500 hover:text-blue-600 transition">
                            ← Dashboard
                        </Link>
                        <h1 className="text-lg font-bold text-gray-900">Departments</h1>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Departments ({departments.length})
                    </h2>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        {showForm ? "Cancel" : "+ Add Department"}
                    </button>
                </div>

                {message && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-sm">
                        {message}
                    </div>
                )}

                {showForm && (
                    <form
                        onSubmit={handleCreate}
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6"
                    >
                        <h3 className="font-semibold text-gray-900 mb-4">Add New Department</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Computer Science & Engineering"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Code *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="CSE"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Faculty *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.faculty}
                                    onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Faculty of Science & Engineering"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Optional description"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                            Create Department
                        </button>
                    </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {departments.length === 0 ? (
                        <div className="col-span-full text-center py-8 text-gray-500">
                            No departments found. Add your first department.
                        </div>
                    ) : (
                        departments.map((dept) => (
                            <div key={dept._id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-xs font-mono font-medium">
                                        {dept.code}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mb-2">{dept.faculty}</p>
                                {dept.description && (
                                    <p className="text-sm text-gray-600">{dept.description}</p>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}