"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Result {
    _id: string;
    student?: { studentId: string; name: string };
    course?: { code: string; name: string; credits: number };
    semester?: { name: string };
    exam?: { name: string; type: string };
    marksObtained: number;
    grade?: string;
    gradePoint?: number;
    status: string;
}

export default function ResultsPage() {
    const router = useRouter();
    const [results, setResults] = useState<Result[]>([]);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        student: "",
        course: "",
        semester: "",
        exam: "",
        marksObtained: "",
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
                const [resultsRes, studentsRes, coursesRes, semsRes, examsRes] = await Promise.all([
                    fetch("/api/results", { headers }),
                    fetch("/api/students", { headers }),
                    fetch("/api/courses", { headers }),
                    fetch("/api/semesters", { headers }),
                    fetch("/api/exams", { headers }),
                ]);
                const resultsData = await resultsRes.json();
                const studentsData = await studentsRes.json();
                const coursesData = await coursesRes.json();
                const semsData = await semsRes.json();
                const examsData = await examsRes.json();
                setResults(resultsData.data || []);
                setStudents(studentsData.data || []);
                setCourses(coursesData.data || []);
                setSemesters(semsData.data || []);
                setExams(examsData.data || []);
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
            const res = await fetch("/api/results", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    marksObtained: Number(formData.marksObtained),
                    totalMarks: Number(formData.totalMarks),
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                setMessage(data.message || "Failed to enter result");
                return;
            }
            setMessage("Result entered successfully!");
            setShowForm(false);
            setFormData({ student: "", course: "", semester: "", exam: "", marksObtained: "", totalMarks: "100" });
            const resultsRes = await fetch("/api/results", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const resultsData = await resultsRes.json();
            setResults(resultsData.data || []);
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
                        <h1 className="text-lg font-bold text-gray-900">Results & Grades</h1>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Results ({results.length})</h2>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        {showForm ? "Cancel" : "+ Enter Result"}
                    </button>
                </div>

                {message && (
                    <div className={`mb-4 p-3 rounded-lg text-sm ${message.startsWith("Failed") || message.startsWith("Something") ? "bg-red-50 border border-red-200 text-red-700" : "bg-blue-50 border border-blue-200 text-blue-700"}`}>
                        {message}
                    </div>
                )}

                {showForm && (
                    <form onSubmit={handleCreate} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Enter Result</h3>
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
                                    {semesters.map((s: { _id: string; name: string }) => (
                                        <option key={s._id} value={s._id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Exam *</label>
                                <select required value={formData.exam} onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select exam</option>
                                    {exams.map((x: { _id: string; name: string; type: string }) => (
                                        <option key={x._id} value={x._id}>{x.name} ({x.type})</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Marks Obtained *</label>
                                <input type="number" min={0} max={200} required value={formData.marksObtained} onChange={(e) => setFormData({ ...formData, marksObtained: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks</label>
                                <input type="number" min={10} max={200} value={formData.totalMarks} onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>
                        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                            Enter Result
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
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GP</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {results.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-8 text-center text-gray-500">No results entered.</td>
                                    </tr>
                                ) : (
                                    results.map((result) => (
                                        <tr key={result._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm text-gray-900">
                                                <span className="font-medium">{result.student?.name}</span>
                                                <span className="text-gray-400 ml-2">{result.student?.studentId}</span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                <span className="font-mono text-blue-600">{result.course?.code}</span> — {result.course?.name}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{result.exam?.name || "-"}</td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{result.marksObtained}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-bold ${result.grade === "F" ? "bg-red-100 text-red-700" : result.grade && result.grade.startsWith("A") ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
                                                    {result.grade || "-"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{result.gradePoint?.toFixed(2) || "-"}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${result.status === "published" ? "bg-emerald-100 text-emerald-700" : result.status === "approved" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                                                    {result.status}
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