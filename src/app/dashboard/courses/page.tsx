"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Course {
    _id: string;
    code: string;
    name: string;
    credits: number;
    semester: number;
    department?: { name: string; code: string };
    program?: { name: string; code: string };
}

export default function CoursesPage() {
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const [departments, setDepartments] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        credits: "3",
        department: "",
        program: "",
        semester: "1",
        description: "",
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
                const [coursesRes, deptsRes, progsRes] = await Promise.all([
                    fetch("/api/courses", { headers }),
                    fetch("/api/departments", { headers }),
                    fetch("/api/programs", { headers }),
                ]);
                const coursesData = await coursesRes.json();
                const deptsData = await deptsRes.json();
                const progsData = await progsRes.json();
                setCourses(coursesData.data || []);
                setDepartments(deptsData.data || []);
                setPrograms(progsData.data || []);
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
            const res = await fetch("/api/courses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    credits: Number(formData.credits),
                    semester: Number(formData.semester),
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                setMessage(data.message || "Failed to create course");
                return;
            }
            setMessage("Course created successfully!");
            setShowForm(false);
            setFormData({ code: "", name: "", credits: "3", department: "", program: "", semester: "1", description: "" });
            const coursesRes = await fetch("/api/courses", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const coursesData = await coursesRes.json();
            setCourses(coursesData.data || []);
        } catch {
            setMessage("Something went wrong");
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading courses...</p>
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
                        <h1 className="text-lg font-bold text-gray-900">Course Management</h1>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Courses ({courses.length})
                    </h2>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        {showForm ? "Cancel" : "+ Add Course"}
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
                        <h3 className="font-semibold text-gray-900 mb-4">Add New Course</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Course Code *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="CSE101"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Course Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Introduction to Programming"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Credits *
                                </label>
                                <select
                                    value={formData.credits}
                                    onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {[1, 2, 3, 4, 5, 6].map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Semester *
                                </label>
                                <select
                                    value={formData.semester}
                                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                                        <option key={s} value={s}>
                                            Semester {s}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Department *
                                </label>
                                <select
                                    required
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select department</option>
                                    {departments.map((d: { _id: string; name: string }) => (
                                        <option key={d._id} value={d._id}>
                                            {d.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Program *
                                </label>
                                <select
                                    required
                                    value={formData.program}
                                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select program</option>
                                    {programs.map((p: { _id: string; name: string }) => (
                                        <option key={p._id} value={p._id}>
                                            {p.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={2}
                                    placeholder="Optional course description"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                            Create Course
                        </button>
                    </form>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {courses.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                            No courses found. Add your first course.
                                        </td>
                                    </tr>
                                ) : (
                                    courses.map((course) => (
                                        <tr key={course._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm font-medium text-blue-600">{course.code}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">{course.name}</td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{course.credits}</td>
                                            <td className="px-4 py-3 text-sm text-gray-500">Semester {course.semester}</td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{course.department?.name || "-"}</td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{course.program?.name || "-"}</td>
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