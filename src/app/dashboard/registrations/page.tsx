"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Registration {
    _id: string;
    student?: { studentId: string; name: string };
    course?: { code: string; name: string; credits: number };
    semester?: { name: string };
    status: string;
    advisorApproval: string;
}

export default function RegistrationsPage() {
    const router = useRouter();
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({ student: "", course: "", semester: "" });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        async function fetchData() {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const [regsRes, studentsRes, coursesRes, semsRes] = await Promise.all([
                    fetch("/api/registrations", { headers }),
                    fetch("/api/students", { headers }),
                    fetch("/api/courses", { headers }),
                    fetch("/api/semesters", { headers }),
                ]);
                const regsData = await regsRes.json();
                const studentsData = await studentsRes.json();
                const coursesData = await coursesRes.json();
                const semsData = await semsRes.json();
                setRegistrations(regsData.data || []);
                setStudents(studentsData.data || []);
                setCourses(coursesData.data || []);
                setSemesters(semsData.data || []);
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
            const res = await fetch("/api/registrations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                setMessage(data.message || "Failed to register course");
                return;
            }
            setMessage("Course registered successfully!");
            setShowForm(false);
            setFormData({ student: "", course: "", semester: "" });
            const regsRes = await fetch("/api/registrations", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const regsData = await regsRes.json();
            setRegistrations(regsData.data || []);
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
                        <h1 className="text-lg font-bold text-gray-900">Course Registrations</h1>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Registrations ({registrations.length})</h2>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        {showForm ? "Cancel" : "+ New Registration"}
                    </button>
                </div>

                {message && (
                    <div className={`mb-4 p-3 rounded-lg text-sm ${message.startsWith("Failed") || message.startsWith("Something") ? "bg-red-50 border border-red-200 text-red-700" : "bg-blue-50 border border-blue-200 text-blue-700"}`}>
                        {message}
                    </div>
                )}

                {showForm && (
                    <form onSubmit={handleCreate} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                        <h3 className="font-semibold text-gray-900 mb-4">New Course Registration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Student *</label>
                                <select required value={formData.student} onChange={(e) => setFormData({ ...formData, student: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select student</option>
                                    {students.map((s: { _id: string; studentId: string; name: string }) => (
                                        <option key={s._id} value={s._id}>{s.studentId} — {s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
                                <select required value={formData.course} onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select course</option>
                                    {courses.map((c: { _id: string; code: string; name: string }) => (
                                        <option key={c._id} value={c._id}>{c.code} — {c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Semester *</label>
                                <select required value={formData.semester} onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select semester</option>
                                    {semesters.filter((s: { registrationOpen: boolean }) => s.registrationOpen).map((s: { _id: string; name: string }) => (
                                        <option key={s._id} value={s._id}>{s.name} (Open)</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                            Register Course
                        </button>
                        {semesters.filter((s: { registrationOpen: boolean }) => s.registrationOpen).length === 0 && (
                            <p className="mt-2 text-xs text-amber-600">No semesters with registration open. Open registration in Semesters module first.</p>
                        )}
                    </form>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Advisor</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {registrations.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500">No registrations found.</td>
                                    </tr>
                                ) : (
                                    registrations.map((reg) => (
                                        <tr key={reg._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm text-gray-900">
                                                <span className="font-medium">{reg.student?.name}</span>
                                                <span className="text-gray-400 ml-2">{reg.student?.studentId}</span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                <span className="font-mono text-blue-600">{reg.course?.code}</span> — {reg.course?.name}
                                                <span className="text-gray-400 ml-2">({reg.course?.credits} cr)</span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{reg.semester?.name || "-"}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${reg.status === "confirmed" ? "bg-emerald-100 text-emerald-700" : reg.status === "dropped" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                                                    {reg.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${reg.advisorApproval === "approved" ? "bg-emerald-100 text-emerald-700" : reg.advisorApproval === "rejected" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"}`}>
                                                    {reg.advisorApproval}
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