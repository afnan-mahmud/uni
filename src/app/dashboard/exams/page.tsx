"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Exam {
    _id: string;
    name: string;
    type: string;
    course?: { code: string; name: string };
    semester?: { name: string };
    date: string;
    startTime?: string;
    endTime?: string;
    room?: string;
    totalMarks: number;
    status: string;
}

export default function ExamsPage() {
    const router = useRouter();
    const [exams, setExams] = useState<Exam[]>([]);
    const [courses, setCourses] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        type: "midterm",
        course: "",
        semester: "",
        date: "",
        startTime: "",
        endTime: "",
        room: "",
        totalMarks: "100",
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
                const [examsRes, coursesRes, semsRes] = await Promise.all([
                    fetch("/api/exams", { headers }),
                    fetch("/api/courses", { headers }),
                    fetch("/api/semesters", { headers }),
                ]);
                const examsData = await examsRes.json();
                const coursesData = await coursesRes.json();
                const semsData = await semsRes.json();
                setExams(examsData.data || []);
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
            const res = await fetch("/api/exams", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    totalMarks: Number(formData.totalMarks),
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                setMessage(data.message || "Failed to create exam");
                return;
            }
            setMessage("Exam created successfully!");
            setShowForm(false);
            setFormData({ name: "", type: "midterm", course: "", semester: "", date: "", startTime: "", endTime: "", room: "", totalMarks: "100" });
            const examsRes = await fetch("/api/exams", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const examsData = await examsRes.json();
            setExams(examsData.data || []);
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
                        <h1 className="text-lg font-bold text-gray-900">Examinations</h1>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Exams ({exams.length})</h2>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        {showForm ? "Cancel" : "+ Schedule Exam"}
                    </button>
                </div>

                {message && (
                    <div className={`mb-4 p-3 rounded-lg text-sm ${message.startsWith("Failed") || message.startsWith("Something") ? "bg-red-50 border border-red-200 text-red-700" : "bg-blue-50 border border-blue-200 text-blue-700"}`}>
                        {message}
                    </div>
                )}

                {showForm && (
                    <form onSubmit={handleCreate} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Schedule New Exam</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Exam Name *</label>
                                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Midterm Exam" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="midterm">Midterm</option>
                                    <option value="final">Final</option>
                                    <option value="quiz">Quiz</option>
                                    <option value="assignment">Assignment</option>
                                    <option value="viva">Viva</option>
                                    <option value="practical">Practical</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks *</label>
                                <input type="number" min={10} max={200} required value={formData.totalMarks} onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                <input type="time" value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                                <input type="time" value={formData.endTime} onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                                <input type="text" value={formData.room} onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Room 301" />
                            </div>
                        </div>
                        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                            Schedule Exam
                        </button>
                    </form>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {exams.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-8 text-center text-gray-500">No exams scheduled.</td>
                                    </tr>
                                ) : (
                                    exams.map((exam) => (
                                        <tr key={exam._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{exam.name}</td>
                                            <td className="px-4 py-3 text-sm text-gray-500 capitalize">{exam.type}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                <span className="font-mono text-blue-600">{exam.course?.code}</span> — {exam.course?.name}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{exam.semester?.name || "-"}</td>
                                            <td className="px-4 py-3 text-sm text-gray-500">
                                                {new Date(exam.date).toLocaleDateString()}
                                                {exam.startTime && <span className="text-gray-400 ml-1">at {exam.startTime}</span>}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{exam.totalMarks}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${exam.status === "completed" ? "bg-emerald-100 text-emerald-700" : exam.status === "ongoing" ? "bg-blue-100 text-blue-700" : exam.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                                                    {exam.status}
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