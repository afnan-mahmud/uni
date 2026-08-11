"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import StudentDashboard from "@/components/dashboards/StudentDashboard";
import FacultyDashboard from "@/components/dashboards/FacultyDashboard";
import HRDashboard from "@/components/dashboards/HRDashboard";
import LibraryDashboard from "@/components/dashboards/LibraryDashboard";
import ManagementDashboard from "@/components/dashboards/ManagementDashboard";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
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

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const role = user?.role || "student";

    // Role-based rendering engine
    switch (role) {
        case "super_admin":
        case "admin":
            return <AdminDashboard />;
        case "student":
            return <StudentDashboard />;
        case "faculty":
            return <FacultyDashboard />;
        case "hr_officer":
            return <HRDashboard />;
        case "librarian":
            return <LibraryDashboard />;
        case "registrar":
        case "dean":
        case "hod":
        case "admission_officer":
        case "finance_officer":
        case "accountant":
        case "examination_officer":
        case "hostel_manager":
        case "transport_manager":
        case "it_admin":
        case "guardian":
            return <ManagementDashboard />;
        default:
            return <StudentDashboard />;
    }
}