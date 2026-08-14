"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BellOff, CreditCard, Bell } from "lucide-react";

interface NotificationItem {
    _id: string;
    title: string;
    message: string;
    type: string;
    isRead: boolean;
    createdAt: string;
}

export default function NotificationsPage() {
    const router = useRouter();
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        async function fetchNotifications() {
            try {
                const res = await fetch("/api/notifications", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setNotifications(data.data || []);
            } catch {
                // ignore
            } finally {
                setLoading(false);
            }
        }

        fetchNotifications();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="text-gray-500 hover:text-blue-600 transition">
                            ← Dashboard
                        </Link>
                        <h1 className="text-lg font-bold text-gray-900">Notifications</h1>
                        {unreadCount > 0 && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                {unreadCount} unread
                            </span>
                        )}
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {notifications.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                            <BellOff size={22} strokeWidth={1.75} />
                        </div>
                        <p className="text-gray-500">No notifications yet.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {notifications.map((notification) => (
                            <div
                                key={notification._id}
                                className={`bg-white rounded-xl p-5 shadow-sm border ${notification.isRead
                                        ? "border-gray-100"
                                        : "border-blue-200 bg-blue-50/50"
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                                            notification.type === "payment"
                                                ? "bg-emerald-50 text-emerald-600"
                                                : "bg-indigo-50 text-indigo-600"
                                        }`}>
                                            {notification.type === "payment"
                                                ? <CreditCard size={16} strokeWidth={1.75} />
                                                : <Bell size={16} strokeWidth={1.75} />}
                                        </span>
                                        <h3 className="font-semibold text-gray-900">
                                            {notification.title}
                                        </h3>
                                    </div>
                                    {!notification.isRead && (
                                        <span className="px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs font-medium">
                                            New
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                                <p className="text-xs text-gray-400">
                                    {new Date(notification.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}