"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { mockCourses, mockExams, mockResults, mockSemesters, mockStudents, filterByCurrentFaculty, filterByCurrentStudent, getCurrentUser } from "@/lib/demoData";
import { isAdminLike, isFaculty, isManagement, isStudent, isGuardian, type DemoUser } from "@/lib/demoAuth";

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
    const [user, setUser] = useState<DemoUser | null>(null);
    const [results, setResults] = useState<Result[]>([]);
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
        const currentUser = getCurrentUser();
        setUser(currentUser);
        // Frontend-only demo data (no backend)
        setResults(mockResults as Result[]);
        setLoading(false);
    }, [router]);

    const scopedResults = useMemo(() => {
        if (!user) return [];
        let scoped = [...results];
        if (isStudent() || isGuardian()) {
            scoped = filterByCurrentStudent(scoped);
        } else if (isFaculty()) {
            scoped = filterByCurrentFaculty(scoped);
        }
        // admin/finance/management see everything
        return scoped;
    }, [results, user]);

    const canEnterResult = isAdminLike() || isManagement() || isFaculty();

    function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        setMessage("");
        if (!canEnterResult) {
            setMessage("You do not have permission to enter results.");
            return;
        }
        const newResult: Result = {
            _id: `R-${Date.now()}`,
            student: mockStudents.find((s) => s.id === formData.student)
                ? { studentId: formData.student, name: mockStudents.find((s) => s.id === formData.student)!.name }
                : undefined,
            course: mockCourses.find((c) => c._id === formData.course)
                ? { code: mockCourses.find((c) => c._id === formData.course)!.code, name: mockCourses.find((c) => c._id === formData.course)!.name, credits: mockCourses.find((c) => c._id === formData.course)!.credits }
                : undefined,
            semester: mockSemesters.find((s) => s._id === formData.semester)
                ? { name: mockSemesters.find((s) => s._id === formData.semester)!.name }
                : undefined,
            exam: mockExams.find((x) => x._id === formData.exam)
                ? { name: mockExams.find((x) => x._id === formData.exam)!.name, type: mockExams.find((x) => x._id === formData.exam)!.type }
                : undefined,
            marksObtained: Number(formData.marksObtained),
            grade: computeGrade(Number(formData.marksObtained)),
            gradePoint: computeGradePoint(Number(formData.marksObtained)),
            status: "published",
        };
        setResults((prev) => [newResult, ...prev]);
        setMessage("Result entered successfully!");
        setShowForm(false);
        setFormData({ student: "", course: "", semester: "", exam: "", marksObtained: "", totalMarks: "100" });
    }

    function computeGrade(marks: number): string {
        if (marks >= 80) return "A+";
        if (marks >= 75) return "A";
        if (marks >= 70) return "A-";
        if (marks >= 65) return "B+";
        if (marks >= 60) return "B";
        if (marks >= 55) return "B-";
        if (marks >= 50) return "C+";
        if (marks >= 45) return "C";
        if (marks >= 40) return "D";
        return "F";
    }

    function computeGradePoint(marks: number): number {
        if (marks >= 80) return 4.0;
        if (marks >= 75) return 3.75;
        if (marks >= 70) return 3.5;
        if (marks >= 65) return 3.25;
        if (marks >= 60) return 3.0;
        if (marks >= 55) return 2.75;
        if (marks >= 50) return 2.5;
        if (marks >= 45) return 2.25;
        if (marks >= 40) return 2.0;
        return 0.0;
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
                        <h1 className="text-lg font-bold text-slate-900">Results & Grades</h1>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-slate-900">Results ({scopedResults.length})</h2>
                    {canEnterResult && (
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                        >
                            {showForm ? "Cancel" : "+ Enter Result"}
                        </button>
                    )}
                </div>

                {message && (
                    <div className={`mb-4 p-3 rounded-lg text-sm ${message.startsWith("Failed") || message.startsWith("Something") || message.startsWith("You do not") ? "bg-red-50 border border-red-200 text-red-700" : "bg-indigo-50 border border-indigo-200 text-indigo-700"}`}>
                        {message}
                    </div>
                )}

                {showForm && canEnterResult && (
                    <form onSubmit={handleCreate} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-6">
                        <h3 className="font-semibold text-slate-900 mb-4">Enter Result</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                        <option key={c._id} value={c._id}>{c.code} — {c.name}</option>
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
                                <label className="block text-sm font-medium text-slate-700 mb-1">Exam *</label>
                                <select required value={formData.exam} onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                    <option value="">Select exam</option>
                                    {mockExams.map((x) => (
                                        <option key={x._id} value={x._id}>{x.name} ({x.type})</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Marks Obtained *</label>
                                <input type="number" min={0} max={200} required value={formData.marksObtained} onChange={(e) => setFormData({ ...formData, marksObtained: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Total Marks</label>
                                <input type="number" min={10} max={200} value={formData.totalMarks} onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                        </div>
                        <button type="submit" className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
                            Enter Result
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
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Exam</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Marks</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Grade</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">GP</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {scopedResults.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-8 text-center text-slate-500">No results found.</td>
                                    </tr>
                                ) : (
                                    scopedResults.map((result) => (
                                        <tr key={result._id} className="hover:bg-slate-50">
                                            <td className="px-4 py-3 text-sm text-slate-900">
                                                <span className="font-medium">{result.student?.name}</span>
                                                <span className="text-slate-400 ml-2">{result.student?.studentId}</span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-700">
                                                <span className="font-mono text-indigo-600">{result.course?.code}</span> — {result.course?.name}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-500">{result.exam?.name || "-"}</td>
                                            <td className="px-4 py-3 text-sm text-slate-500">{result.marksObtained}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-bold ${result.grade === "F" ? "bg-red-100 text-red-700" : result.grade && result.grade.startsWith("A") ? "bg-emerald-100 text-emerald-700" : "bg-indigo-100 text-indigo-700"}`}>
                                                    {result.grade || "-"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-500">{result.gradePoint?.toFixed(2) || "-"}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${result.status === "published" ? "bg-emerald-100 text-emerald-700" : result.status === "approved" ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-600"}`}>
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
