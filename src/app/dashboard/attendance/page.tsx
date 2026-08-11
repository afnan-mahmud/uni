"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AttendanceRecord {
    _id: string;
    student?: { studentId: string; name: string };
    course?: { code: string; name: string };
    semester?: { name: string };
    date: string;
    status: string;
}

export default function AttendancePage() {
    const router = useRouter();
    const [records, setRecords] = useState<AttendanceRecord[]>([]);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({ student: "", course: "", semester: "", date: "", status: "present" });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        async function fetchData() {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const [attRes, studentsRes, coursesRes, semsRes] = await Promise.all([
                    fetch("/api/attendance", { headers }),
                    fetch("/api/students", { headers }),
                    fetch("/api/courses", { headers }),
                    fetch("/api/semesters", { headers }),
                ]);
                const attData = await attRes.json();
                const studentsData = await studentsRes.json();
                const coursesData = await coursesRes.json();
                const semsData = await semsRes.json();
                setRecords(attData.data || []);
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
            const res = await fetch("/api/attendance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                setMessage(data.message || "Failed to mark attendance");
                return;
            }
            setMessage("Attendance marked successfully!");
            setShowForm(false);
            setFormData({ student: "", course: "", semester: "", date: "", status: "present" });
            const attRes = await fetch("/api/attendance", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const attData = await attRes.json();
            setRecords(attData.data || []);
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
                        <h1 className="text-lg font-bold text-gray-900">Attendance</h1>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Attendance Records ({records.length})</h2>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        {showForm ? "Cancel" : "+ Mark Attendance"}
                    </button>
                </div>

                {message && (
                    <div className={`mb-4 p-3 rounded-lg text-sm ${message.startsWith("Failed") || message.startsWith("Something") ? "bg-red-50 border border-red-200 text-red-700" : "bg-blue-50 border border-blue-200 text-blue-700"}`}>
                        {message}
                    </div>
                )}

                {showForm && (
                    <form onSubmit={handleCreate} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Mark Attendance</h3>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                                        <option key={c._id} value={c._id}>{c.code}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Semester *</label>
                                <select required value={formData.semester} onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select semester</option>
                                    {semesters.map((s: { _id: string; name: string }) => (
                                        <option key={s._id} value={s._id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                                <input type="date" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="present">Present</option>
                                    <option value="absent">Absent</option>
                                    <option value="late">Late</option>
                                    <option value="leave">Leave</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                            Submit Attendance
                        </button>
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
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {records.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500">No attendance records found.</td>
                                    </tr>
                                ) : (
                                    records.map((rec) => (
                                        <tr key={rec._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm text-gray-900">
                                                <span className="font-medium">{rec.student?.name}</span>
                                                <span className="text-gray-400 ml-2">{rec.student?.studentId}</span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                <span className="font-mono text-blue-600">{rec.course?.code}</span> — {rec.course?.name}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{rec.semester?.name || "-"}</td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{new Date(rec.date).toLocaleDateString()}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${rec.status === "present" ? "bg-emerald-100 text-emerald-700" : rec.status === "absent" ? "bg-red-100 text-red-700" : rec.status === "late" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
                                                    {rec.status}
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