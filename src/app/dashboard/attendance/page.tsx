"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { mockAttendance, mockCourses, mockSemesters, mockStudents, filterByCurrentFaculty, filterByCurrentStudent, getCurrentUser } from "@/lib/demoData";
import { isAdminLike, isFaculty, isManagement, isStudent, isGuardian, type DemoUser } from "@/lib/demoAuth";

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
    const [user, setUser] = useState<DemoUser | null>(null);
    const [records, setRecords] = useState<AttendanceRecord[]>([]);
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
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setRecords(mockAttendance as AttendanceRecord[]);
        setLoading(false);
    }, [router]);

    const scopedRecords = useMemo(() => {
        if (!user) return [];
        if (isStudent() || isGuardian()) {
            return filterByCurrentStudent(records);
        }
        if (isFaculty()) {
            return filterByCurrentFaculty(records);
        }
        return records;
    }, [records, user]);

    const canMarkAttendance = isAdminLike() || isManagement() || isFaculty();

    function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        setMessage("");
        if (!canMarkAttendance) {
            setMessage("You do not have permission to mark attendance.");
            return;
        }
        const student = mockStudents.find((s) => s.id === formData.student);
        const course = mockCourses.find((c) => c._id === formData.course);
        const semester = mockSemesters.find((s) => s._id === formData.semester);
        const newRecord: AttendanceRecord = {
            _id: `AT-${Date.now()}`,
            student: student ? { studentId: student.id, name: student.name } : undefined,
            course: course ? { code: course.code, name: course.name } : undefined,
            semester: semester ? { name: semester.name } : undefined,
            date: formData.date,
            status: formData.status,
        };
        setRecords((prev) => [newRecord, ...prev]);
        setMessage("Attendance marked successfully!");
        setShowForm(false);
        setFormData({ student: "", course: "", semester: "", date: "", status: "present" });
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="bg-white shadow-sm border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="text-slate-500 hover:text-indigo-600 transition">← Dashboard</Link>
                        <h1 className="text-lg font-bold text-slate-900">Attendance</h1>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-slate-900">Attendance Records ({scopedRecords.length})</h2>
                    {canMarkAttendance && (
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                        >
                            {showForm ? "Cancel" : "+ Mark Attendance"}
                        </button>
                    )}
                </div>

                {message && (
                    <div className={`mb-4 p-3 rounded-lg text-sm ${message.startsWith("Failed") || message.startsWith("Something") || message.startsWith("You do not") ? "bg-red-50 border border-red-200 text-red-700" : "bg-indigo-50 border border-indigo-200 text-indigo-700"}`}>
                        {message}
                    </div>
                )}

                {showForm && canMarkAttendance && (
                    <form onSubmit={handleCreate} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-6">
                        <h3 className="font-semibold text-slate-900 mb-4">Mark Attendance</h3>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Student *</label>
                                <select required value={formData.student} onChange={(e) => setFormData({ ...formData, student: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                    <option value="">Select student</option>
                                    {mockStudents.map((s) => (
                                        <option key={s.id} value={s.id}>{s.id} — {s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Course *</label>
                                <select required value={formData.course} onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                    <option value="">Select course</option>
                                    {mockCourses.map((c) => (
                                        <option key={c._id} value={c._id}>{c.code}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Semester *</label>
                                <select required value={formData.semester} onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                    <option value="">Select semester</option>
                                    {mockSemesters.map((s) => (
                                        <option key={s._id} value={s._id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Date *</label>
                                <input type="date" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Status *</label>
                                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                    <option value="present">Present</option>
                                    <option value="absent">Absent</option>
                                    <option value="late">Late</option>
                                    <option value="leave">Leave</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
                            Submit Attendance
                        </button>
                    </form>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Student</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Course</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Semester</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {scopedRecords.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-slate-500">No attendance records found.</td>
                                    </tr>
                                ) : (
                                    scopedRecords.map((rec) => (
                                        <tr key={rec._id} className="hover:bg-slate-50">
                                            <td className="px-4 py-3 text-sm text-slate-900">
                                                <span className="font-medium">{rec.student?.name}</span>
                                                <span className="text-slate-400 ml-2">{rec.student?.studentId}</span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-700">
                                                <span className="font-mono text-indigo-600">{rec.course?.code}</span> — {rec.course?.name}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-500">{rec.semester?.name || "-"}</td>
                                            <td className="px-4 py-3 text-sm text-slate-500">{new Date(rec.date).toLocaleDateString()}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${rec.status === "present" ? "bg-emerald-100 text-emerald-700" : rec.status === "absent" ? "bg-red-100 text-red-700" : rec.status === "late" ? "bg-amber-100 text-amber-700" : "bg-indigo-100 text-indigo-700"}`}>
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
