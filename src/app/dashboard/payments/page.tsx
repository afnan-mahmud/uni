"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { mockPayments, mockStudents, filterByCurrentStudent, getCurrentUser } from "@/lib/demoData";
import { isAdminLike, isFinance, isManagement, isStudent, isGuardian, type DemoUser } from "@/lib/demoAuth";

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
    const [user, setUser] = useState<DemoUser | null>(null);
    const [payments, setPayments] = useState<Payment[]>([]);
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
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setPayments(mockPayments as Payment[]);
        setLoading(false);
    }, [router]);

    const scopedPayments = useMemo(() => {
        if (!user) return [];
        if (isStudent() || isGuardian()) {
            return filterByCurrentStudent(payments);
        }
        // admin/finance/management see everything
        return payments;
    }, [payments, user]);

    const canRecordPayment = isAdminLike() || isFinance() || isManagement();

    const stats = useMemo(() => {
        const total = scopedPayments.reduce((sum, p) => sum + p.amount, 0);
        const completed = scopedPayments.filter((p) => p.status === "completed").length;
        const pending = scopedPayments.filter((p) => p.status === "pending").length;
        return { total, completed, pending, count: scopedPayments.length };
    }, [scopedPayments]);

    function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        setMessage("");
        if (!canRecordPayment) {
            setMessage("You do not have permission to record payments.");
            return;
        }
        const student = mockStudents.find((s) => s.id === formData.student);
        const newPayment: Payment = {
            _id: `P-${Date.now()}`,
            invoiceId: `INV-${9000 + payments.length + 1}`,
            student: student ? { studentId: student.id, name: student.name } : undefined,
            amount: Number(formData.amount),
            feeType: formData.feeType,
            method: formData.method,
            status: "completed",
            paidAt: new Date().toISOString().split("T")[0],
        };
        setPayments((prev) => [newPayment, ...prev]);
        setMessage("Payment recorded successfully!");
        setShowForm(false);
        setFormData({ student: "", amount: "", feeType: "tuition", method: "online", transactionId: "" });
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
                        <h1 className="text-lg font-bold text-slate-900">Payments & Fees</h1>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                        <p className="text-sm text-slate-500">{isStudent() || isGuardian() ? "Total Paid" : "Total Payments"}</p>
                        <p className="text-2xl font-bold text-indigo-600 mt-1">{stats.count}</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                        <p className="text-sm text-slate-500">{isStudent() || isGuardian() ? "Amount Paid" : "Total Collected"}</p>
                        <p className="text-2xl font-bold text-emerald-600 mt-1">৳{stats.total.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                        <p className="text-sm text-slate-500">{isStudent() || isGuardian() ? "Completed" : "Completed"}</p>
                        <p className="text-2xl font-bold text-purple-600 mt-1">{stats.completed}</p>
                        {!(isStudent() || isGuardian()) && stats.pending > 0 && (
                            <p className="text-xs text-amber-600 mt-1">{stats.pending} pending</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-slate-900">Payment Records</h2>
                    {canRecordPayment && (
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                        >
                            {showForm ? "Cancel" : "+ Record Payment"}
                        </button>
                    )}
                </div>

                {message && (
                    <div className={`mb-4 p-3 rounded-lg text-sm ${message.startsWith("Failed") || message.startsWith("Something") || message.startsWith("You do not") ? "bg-red-50 border border-red-200 text-red-700" : "bg-indigo-50 border border-indigo-200 text-indigo-700"}`}>
                        {message}
                    </div>
                )}

                {showForm && canRecordPayment && (
                    <form onSubmit={handleCreate} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-6">
                        <h3 className="font-semibold text-slate-900 mb-4">Record New Payment</h3>
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
                                <label className="block text-sm font-medium text-slate-700 mb-1">Amount *</label>
                                <input type="number" min={1} required value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Fee Type *</label>
                                <select value={formData.feeType} onChange={(e) => setFormData({ ...formData, feeType: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
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
                                <label className="block text-sm font-medium text-slate-700 mb-1">Method *</label>
                                <select value={formData.method} onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                    <option value="cash">Cash</option>
                                    <option value="bank">Bank</option>
                                    <option value="card">Card</option>
                                    <option value="mobile_banking">Mobile Banking</option>
                                    <option value="online">Online</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Transaction ID</label>
                                <input type="text" value={formData.transactionId} onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                        </div>
                        <button type="submit" className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
                            Record Payment
                        </button>
                    </form>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Invoice</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Student</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Fee Type</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Method</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {scopedPayments.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-8 text-center text-slate-500">No payments found.</td>
                                    </tr>
                                ) : (
                                    scopedPayments.map((payment) => (
                                        <tr key={payment._id} className="hover:bg-slate-50">
                                            <td className="px-4 py-3 text-sm font-mono text-indigo-600">{payment.invoiceId}</td>
                                            <td className="px-4 py-3 text-sm text-slate-900">
                                                <span className="font-medium">{payment.student?.name}</span>
                                                <span className="text-slate-400 ml-2">{payment.student?.studentId}</span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-500 capitalize">{payment.feeType.replace("_", " ")}</td>
                                            <td className="px-4 py-3 text-sm font-medium text-slate-900">৳{payment.amount.toLocaleString()}</td>
                                            <td className="px-4 py-3 text-sm text-slate-500 capitalize">{payment.method.replace("_", " ")}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${payment.status === "completed" ? "bg-emerald-100 text-emerald-700" : payment.status === "refunded" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-500">{new Date(payment.paidAt).toLocaleDateString()}</td>
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
