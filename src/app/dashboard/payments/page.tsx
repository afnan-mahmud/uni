"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Payment {
    _id: string;
    student?: { studentId: string; name: string };
    invoiceId: string;
    amount: number;
    feeType: string;
    method: string;
    status: string;
    paidAt: string;
}

export default function PaymentsPage() {
    const router = useRouter();
    const [payments, setPayments] = useState<Payment[]>([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        student: "",
        amount: "",
        feeType: "tuition",
        method: "online",
        transactionId: "",
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
                const [payRes, studentsRes] = await Promise.all([
                    fetch("/api/payments", { headers }),
                    fetch("/api/students", { headers }),
                ]);
                const payData = await payRes.json();
                const studentsData = await studentsRes.json();
                setPayments(payData.data || []);
                setStudents(studentsData.data || []);
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
            const res = await fetch("/api/payments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    amount: Number(formData.amount),
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                setMessage(data.message || "Failed to record payment");
                return;
            }
            setMessage("Payment recorded successfully!");
            setShowForm(false);
            setFormData({ student: "", amount: "", feeType: "tuition", method: "online", transactionId: "" });
            const payRes = await fetch("/api/payments", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const payData = await payRes.json();
            setPayments(payData.data || []);
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

    const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="text-gray-500 hover:text-blue-600 transition">← Dashboard</Link>
                        <h1 className="text-lg font-bold text-gray-900">Payments & Fees</h1>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">Total Payments</p>
                        <p className="text-2xl font-bold text-blue-600 mt-1">{payments.length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">Total Collected</p>
                        <p className="text-2xl font-bold text-emerald-600 mt-1">৳{totalCollected.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">Completed</p>
                        <p className="text-2xl font-bold text-purple-600 mt-1">{payments.filter(p => p.status === "completed").length}</p>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Payment Records</h2>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        {showForm ? "Cancel" : "+ Record Payment"}
                    </button>
                </div>

                {message && (
                    <div className={`mb-4 p-3 rounded-lg text-sm ${message.startsWith("Failed") || message.startsWith("Something") ? "bg-red-50 border border-red-200 text-red-700" : "bg-blue-50 border border-blue-200 text-blue-700"}`}>
                        {message}
                    </div>
                )}

                {showForm && (
                    <form onSubmit={handleCreate} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Record New Payment</h3>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
                                <input type="number" min={1} required value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fee Type *</label>
                                <select value={formData.feeType} onChange={(e) => setFormData({ ...formData, feeType: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="admission">Admission</option>
                                    <option value="tuition">Tuition</option>
                                    <option value="semester">Semester</option>
                                    <option value="lab">Lab</option>
                                    <option value="library">Library</option>
                                    <option value="exam">Exam</option>
                                    <option value="hostel">Hostel</option>
                                    <option value="transport">Transport</option>
                                    <option value="miscellaneous">Miscellaneous</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Method *</label>
                                <select value={formData.method} onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="cash">Cash</option>
                                    <option value="bank">Bank</option>
                                    <option value="card">Card</option>
                                    <option value="mobile_banking">Mobile Banking</option>
                                    <option value="online">Online</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                                <input type="text" value={formData.transactionId} onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>
                        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                            Record Payment
                        </button>
                    </form>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Type</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {payments.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-8 text-center text-gray-500">No payments recorded.</td>
                                    </tr>
                                ) : (
                                    payments.map((payment) => (
                                        <tr key={payment._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm font-mono text-blue-600">{payment.invoiceId}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">
                                                <span className="font-medium">{payment.student?.name}</span>
                                                <span className="text-gray-400 ml-2">{payment.student?.studentId}</span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500 capitalize">{payment.feeType.replace("_", " ")}</td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">৳{payment.amount.toLocaleString()}</td>
                                            <td className="px-4 py-3 text-sm text-gray-500 capitalize">{payment.method.replace("_", " ")}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${payment.status === "completed" ? "bg-emerald-100 text-emerald-700" : payment.status === "refunded" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{new Date(payment.paidAt).toLocaleDateString()}</td>
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