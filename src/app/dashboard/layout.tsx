"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface NavItem {
    label: string;
    href: string;
    icon: string;
}

const ROLE_NAV: Record<string, NavItem[]> = {
    super_admin: [
        { label: "Overview", href: "/dashboard", icon: "📊" },
        { label: "Students", href: "/dashboard/students", icon: "👨‍🎓" },
        { label: "Departments", href: "/dashboard/departments", icon: "🏛️" },
        { label: "Programs", href: "/dashboard/programs", icon: "🎓" },
        { label: "Courses", href: "/dashboard/courses", icon: "📚" },
        { label: "Semesters", href: "/dashboard/semesters", icon: "📅" },
        { label: "Registrations", href: "/dashboard/registrations", icon: "📝" },
        { label: "Attendance", href: "/dashboard/attendance", icon: "✅" },
        { label: "Exams", href: "/dashboard/exams", icon: "📋" },
        { label: "Results", href: "/dashboard/results", icon: "📊" },
        { label: "Payments", href: "/dashboard/payments", icon: "💰" },
        { label: "Notifications", href: "/dashboard/notifications", icon: "🔔" },
    ],
    admin: [
        { label: "Overview", href: "/dashboard", icon: "📊" },
        { label: "Students", href: "/dashboard/students", icon: "👨‍🎓" },
        { label: "Departments", href: "/dashboard/departments", icon: "🏛️" },
        { label: "Programs", href: "/dashboard/programs", icon: "🎓" },
        { label: "Courses", href: "/dashboard/courses", icon: "📚" },
        { label: "Semesters", href: "/dashboard/semesters", icon: "📅" },
        { label: "Registrations", href: "/dashboard/registrations", icon: "📝" },
        { label: "Attendance", href: "/dashboard/attendance", icon: "✅" },
        { label: "Exams", href: "/dashboard/exams", icon: "📋" },
        { label: "Results", href: "/dashboard/results", icon: "📊" },
        { label: "Payments", href: "/dashboard/payments", icon: "💰" },
        { label: "Notifications", href: "/dashboard/notifications", icon: "🔔" },
    ],
    registrar: [
        { label: "Overview", href: "/dashboard", icon: "📊" },
        { label: "Students", href: "/dashboard/students", icon: "👨‍🎓" },
        { label: "Registrations", href: "/dashboard/registrations", icon: "📝" },
        { label: "Results", href: "/dashboard/results", icon: "📊" },
        { label: "Semesters", href: "/dashboard/semesters", icon: "📅" },
        { label: "Notifications", href: "/dashboard/notifications", icon: "🔔" },
    ],
    dean: [
        { label: "Overview", href: "/dashboard", icon: "📊" },
        { label: "Students", href: "/dashboard/students", icon: "👨‍🎓" },
        { label: "Departments", href: "/dashboard/departments", icon: "🏛️" },
        { label: "Programs", href: "/dashboard/programs", icon: "🎓" },
        { label: "Courses", href: "/dashboard/courses", icon: "📚" },
        { label: "Results", href: "/dashboard/results", icon: "📊" },
        { label: "Notifications", href: "/dashboard/notifications", icon: "🔔" },
    ],
    hod: [
        { label: "Overview", href: "/dashboard", icon: "📊" },
        { label: "Students", href: "/dashboard/students", icon: "👨‍🎓" },
        { label: "Courses", href: "/dashboard/courses", icon: "📚" },
        { label: "Registrations", href: "/dashboard/registrations", icon: "📝" },
        { label: "Attendance", href: "/dashboard/attendance", icon: "✅" },
        { label: "Results", href: "/dashboard/results", icon: "📊" },
        { label: "Notifications", href: "/dashboard/notifications", icon: "🔔" },
    ],
    faculty: [
        { label: "Overview", href: "/dashboard", icon: "📊" },
        { label: "Courses", href: "/dashboard/courses", icon: "📚" },
        { label: "Attendance", href: "/dashboard/attendance", icon: "✅" },
        { label: "Exams", href: "/dashboard/exams", icon: "📋" },
        { label: "Results", href: "/dashboard/results", icon: "📊" },
        { label: "Notifications", href: "/dashboard/notifications", icon: "🔔" },
    ],
    student: [
        { label: "Overview", href: "/dashboard", icon: "📊" },
        { label: "Courses", href: "/dashboard/courses", icon: "📚" },
        { label: "Registrations", href: "/dashboard/registrations", icon: "📝" },
        { label: "Attendance", href: "/dashboard/attendance", icon: "✅" },
        { label: "Exams", href: "/dashboard/exams", icon: "📋" },
        { label: "Results", href: "/dashboard/results", icon: "📊" },
        { label: "Payments", href: "/dashboard/payments", icon: "💰" },
        { label: "Notifications", href: "/dashboard/notifications", icon: "🔔" },
    ],
    guardian: [
        { label: "Overview", href: "/dashboard", icon: "📊" },
        { label: "Results", href: "/dashboard/results", icon: "📊" },
        { label: "Attendance", href: "/dashboard/attendance", icon: "✅" },
        { label: "Payments", href: "/dashboard/payments", icon: "💰" },
        { label: "Notifications", href: "/dashboard/notifications", icon: "🔔" },
    ],
    admission_officer: [
        { label: "Overview", href: "/dashboard", icon: "📊" },
        { label: "Students", href: "/dashboard/students", icon: "👨‍🎓" },
        { label: "Programs", href: "/dashboard/programs", icon: "🎓" },
        { label: "Notifications", href: "/dashboard/notifications", icon: "🔔" },
    ],
    finance_officer: [
        { label: "Overview", href: "/dashboard", icon: "📊" },
        { label: "Students", href: "/dashboard/students", icon: "👨‍🎓" },
        { label: "Payments", href: "/dashboard/payments", icon: "💰" },
        { label: "Notifications", href: "/dashboard/notifications", icon: "🔔" },
    ],
    accountant: [
        { label: "Overview", href: "/dashboard", icon: "📊" },
        { label: "Payments", href: "/dashboard/payments", icon: "💰" },
        { label: "Notifications", href: "/dashboard/notifications", icon: "🔔" },
    ],
    hr_officer: [
        { label: "Overview", href: "/dashboard", icon: "📊" },
        { label: "Notifications", href: "/dashboard/notifications", icon: "🔔" },
    ],
    examination_officer: [
        { label: "Overview", href: "/dashboard", icon: "📊" },
        { label: "Exams", href: "/dashboard/exams", icon: "📋" },
        { label: "Results", href: "/dashboard/results", icon: "📊" },
        { label: "Notifications", href: "/dashboard/notifications", icon: "🔔" },
    ],
    librarian: [
        { label: "Overview", href: "/dashboard", icon: "📊" },
        { label: "Notifications", href: "/dashboard/notifications", icon: "🔔" },
    ],
    hostel_manager: [
        { label: "Overview", href: "/dashboard", icon: "📊" },
        { label: "Students", href: "/dashboard/students", icon: "👨‍🎓" },
        { label: "Notifications", href: "/dashboard/notifications", icon: "🔔" },
    ],
    transport_manager: [
        { label: "Overview", href: "/dashboard", icon: "📊" },
        { label: "Students", href: "/dashboard/students", icon: "👨‍🎓" },
        { label: "Notifications", href: "/dashboard/notifications", icon: "🔔" },
    ],
    it_admin: [
        { label: "Overview", href: "/dashboard", icon: "📊" },
        { label: "Students", href: "/dashboard/students", icon: "👨‍🎓" },
        { label: "Departments", href: "/dashboard/departments", icon: "🏛️" },
        { label: "Programs", href: "/dashboard/programs", icon: "🎓" },
        { label: "Courses", href: "/dashboard/courses", icon: "📚" },
        { label: "Semesters", href: "/dashboard/semesters", icon: "📅" },
        { label: "Notifications", href: "/dashboard/notifications", icon: "🔔" },
    ],
};

const ROLE_LABELS: Record<string, string> = {
    super_admin: "Super Administrator",
    admin: "Administrator",
    registrar: "Registrar",
    dean: "Dean",
    hod: "Head of Department",
    faculty: "Faculty Member",
    student: "Student",
    guardian: "Guardian",
    admission_officer: "Admission Officer",
    finance_officer: "Finance Officer",
    accountant: "Accountant",
    hr_officer: "HR Officer",
    examination_officer: "Examination Officer",
    librarian: "Librarian",
    hostel_manager: "Hostel Manager",
    transport_manager: "Transport Manager",
    it_admin: "IT Administrator",
};

const GROUP_MAPPING: Record<string, string> = {
    "Overview": "Dashboard",
    "Students": "Academics & Students",
    "Registrations": "Academics & Students",
    "Attendance": "Academics & Students",
    "Departments": "Academics & Students",
    "Programs": "Academics & Students",
    "Courses": "Academics & Students",
    "Semesters": "Academics & Students",
    "Exams": "Examinations",
    "Results": "Examinations",
    "Payments": "Finance",
    "Notifications": "System",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (!token) {
            router.push("/login");
            return;
        }

        if (userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, [router]);

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400">Loading workspace...</p>
                </div>
            </div>
        );
    }

    const role = user?.role || "student";
    const navItems = ROLE_NAV[role] || ROLE_NAV.student;
    const roleLabel = ROLE_LABELS[role] || role.replace("_", " ");

    const groupedItems = navItems.reduce((acc, item) => {
        const groupName = GROUP_MAPPING[item.label] || "Others";
        if (!acc[groupName]) acc[groupName] = [];
        acc[groupName].push(item);
        return acc;
    }, {} as Record<string, typeof navItems>);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="px-6 py-6 border-b border-slate-800/60">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/50">
                                <span className="text-white font-bold text-lg">U</span>
                            </div>
                            <div>
                                <h1 className="text-white font-bold text-lg tracking-tight">University ERP</h1>
                                <p className="text-xs text-indigo-300 font-medium">{roleLabel}</p>
                            </div>
                        </div>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                        {Object.entries(groupedItems).map(([group, items]) => (
                            <div key={group}>
                                <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                    {group}
                                </h3>
                                <div className="space-y-1">
                                    {items.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                                                pathname === item.href 
                                                    ? "bg-indigo-500/10 text-indigo-400" 
                                                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                                            }`}
                                        >
                                            <span className={`text-lg transition-transform duration-200 ${pathname === item.href ? 'scale-110' : 'group-hover:scale-110'}`}>{item.icon}</span>
                                            <span>{item.label}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>

                    {/* User */}
                    <div className="px-4 py-4 border-t border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 gradient-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                {user?.name?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-white font-medium truncate">
                                    {user?.name}
                                </p>
                                <p className="text-xs text-slate-400 truncate">
                                    {user?.email}
                                </p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-slate-400 hover:text-red-400 transition"
                                title="Logout"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-800/40 text-center">
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Developed by</p>
                            <a href="https://www.cholobohudur.com" target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 font-bold hover:text-indigo-300 transition block mb-1">
                                Cholo Bohudur
                            </a>
                            <p className="text-[10px] text-slate-500 leading-tight">
                                A <span className="text-slate-400 font-medium">Launchpad</span> Initiative<br />
                                AI & Custom Software
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <header className="sticky top-0 z-20 glass border-b border-slate-200/60">
                    <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition"
                            >
                                <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">
                                    {navItems.find((i) => i.href === pathname)?.label || "Dashboard"}
                                </h2>
                                <p className="text-xs text-slate-500">
                                    {new Date().toLocaleDateString("en-US", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                href="/dashboard/notifications"
                                className="p-2 rounded-xl hover:bg-slate-100 transition relative bg-white border border-slate-200/60 shadow-sm"
                            >
                                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
                            </Link>
                            <div className="w-9 h-9 gradient-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                {user?.name?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="px-4 sm:px-6 lg:px-8 py-8">{children}</main>
            </div>
        </div>
    );
}