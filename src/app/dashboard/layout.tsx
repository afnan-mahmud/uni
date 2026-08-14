"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { canAccessRoute, type DemoUser, type UserRole } from "@/lib/demoAuth";
import {
    Activity, Ambulance, Award, BadgeCheck, Banknote, BarChart3, BedDouble, Bell, BellRing,
    BookMarked, BookOpen, BookText, Building2, Bus, Calculator, Calendar, CalendarCheck,
    CalendarClock, CalendarDays, CalendarX, ClipboardCheck, ClipboardList, Contact, CreditCard,
    FileBadge, FileBarChart, FileCheck2, FileSpreadsheet, FileText, FolderOpen, Gauge, Gavel,
    GraduationCap, Handshake, IdCard, Inbox, KeyRound, Landmark, Laptop, LayoutDashboard,
    LayoutGrid, Library, LineChart, LogOut, Mail, Megaphone, Menu, MessageSquareWarning,
    MessagesSquare,
    Monitor, Percent, PieChart, School, ScrollText, SearchCheck, Send, Settings, ShieldCheck,
    ShoppingCart, Smartphone, TrendingDown, TrendingUp, Trophy, Undo2, User, UserCheck, UserCog,
    UserPlus, Users, UsersRound, Wallet, Warehouse, Workflow, type LucideIcon,
} from "lucide-react";

interface NavItem {
    label: string;
    href: string;
    icon: LucideIcon;
}


const ACADEMIC_MODULE_NAV: NavItem[] = [
    { label: "Institution Structure", href: "/dashboard/academics/institution-structure", icon: Landmark },
    { label: "Academic Year", href: "/dashboard/academics/academic-year", icon: CalendarDays },

    { label: "Program Management", href: "/dashboard/academics/program-management", icon: GraduationCap },
    { label: "Course Management", href: "/dashboard/academics/course-management", icon: BookOpen },
    { label: "Curriculum Management", href: "/dashboard/academics/curriculum", icon: ScrollText },

    { label: "Class Sections", href: "/dashboard/academics/section-management", icon: School },
    { label: "Class Scheduling", href: "/dashboard/academics/class-scheduling", icon: CalendarClock },
    { label: "Academic Calendar", href: "/dashboard/academics/calendar", icon: Calendar },

    { label: "Course Reg Setup", href: "/dashboard/academics/registration", icon: ClipboardList },
    { label: "Academic Advising", href: "/dashboard/academics/advising", icon: Handshake },
    { label: "Academic Requests", href: "/dashboard/academics/requests", icon: Mail },

    { label: "Attendance Record", href: "/dashboard/academics/attendance", icon: UserCheck },
    { label: "Assessment Setup", href: "/dashboard/academics/assessment", icon: ClipboardCheck },
    { label: "Exam Management", href: "/dashboard/academics/examination", icon: FileCheck2 },
    { label: "Result & Grading", href: "/dashboard/academics/result-grading", icon: BarChart3 },
    { label: "Student Progress", href: "/dashboard/academics/progress", icon: TrendingUp },

    { label: "Academic Documents", href: "/dashboard/academics/documents", icon: FileText },
    { label: "Academic Analytics", href: "/dashboard/academics/analytics", icon: LineChart }
];


const FACULTY_PORTAL_NAV: NavItem[] = [
    { label: "My Classes", href: "/dashboard/academics/section-management", icon: School },
    { label: "My Schedule", href: "/dashboard/academics/class-scheduling", icon: CalendarClock },
    { label: "Academic Calendar", href: "/dashboard/academics/calendar", icon: Calendar },

    { label: "Advisee Students", href: "/dashboard/academics/advising", icon: Handshake },

    { label: "Attendance Entry", href: "/dashboard/academics/attendance", icon: UserCheck },
    { label: "Assessments Setup", href: "/dashboard/academics/assessment", icon: ClipboardCheck },
    { label: "Exam Duties", href: "/dashboard/academics/examination", icon: FileCheck2 },
    { label: "Marks Entry", href: "/dashboard/academics/result-grading", icon: BarChart3 },

    { label: "Faculty Analytics", href: "/dashboard/academics/analytics", icon: LineChart }
];

const ADMINISTRATION_MODULE_NAV: NavItem[] = [
    { label: "Organization", href: "/dashboard/administration/organization-management", icon: Landmark },
    { label: "Admin Staff", href: "/dashboard/administration/admin-staff", icon: UserCog },
    { label: "Offices & Depts", href: "/dashboard/administration/office-department", icon: Building2 },

    { label: "User Access", href: "/dashboard/administration/user-access", icon: KeyRound },
    { label: "Security Settings", href: "/dashboard/administration/security-administration", icon: ShieldCheck },
    { label: "Compliance & Audit", href: "/dashboard/administration/compliance-audit", icon: ClipboardList },

    { label: "Workflow Config", href: "/dashboard/administration/workflow-management", icon: Workflow },
    { label: "Official Documents", href: "/dashboard/administration/document-record", icon: FolderOpen },
    { label: "Correspondence", href: "/dashboard/administration/correspondence", icon: Mail },
    { label: "Notices & Broadcasts", href: "/dashboard/administration/notice-communication", icon: Megaphone },

    { label: "Meeting Manager", href: "/dashboard/administration/meeting-management", icon: CalendarClock },
    { label: "Committee Manager", href: "/dashboard/administration/committee-management", icon: Users },

    { label: "Facilities & Spaces", href: "/dashboard/administration/facility-resource", icon: Warehouse },
    { label: "Asset Registry", href: "/dashboard/administration/asset-administration", icon: Laptop },
    { label: "Procurement", href: "/dashboard/administration/procurement", icon: ShoppingCart },

    { label: "Service Requests", href: "/dashboard/administration/service-request", icon: Inbox },
    { label: "Global Policies", href: "/dashboard/administration/policy-configuration", icon: ScrollText },
    { label: "Alert Configs", href: "/dashboard/administration/notification-configuration", icon: BellRing },
    { label: "Reports", href: "/dashboard/administration/reporting", icon: BarChart3 },
    { label: "System Health", href: "/dashboard/administration/system-administration", icon: Activity }
];

const STUDENT_PORTAL_NAV: NavItem[] = [
    { label: "My Master Profile", href: "/dashboard/students/master-profile", icon: User },
    { label: "My ID Card", href: "/dashboard/students/identity", icon: IdCard },
    { label: "My Personal Info", href: "/dashboard/students/personal-info", icon: Contact },
    { label: "My Emergency Contact", href: "/dashboard/students/emergency", icon: Ambulance },
    { label: "My Academic Profile", href: "/dashboard/students/academic-profile", icon: GraduationCap },

    { label: "Enrollment Status", href: "/dashboard/students/enrollment", icon: UserCheck },
    { label: "My Course Reg", href: "/dashboard/students/registration", icon: BookOpen },
    { label: "My Progress", href: "/dashboard/students/progress", icon: TrendingUp },
    { label: "My Attendance", href: "/dashboard/students/attendance", icon: CalendarCheck },
    { label: "Exam Schedule", href: "/dashboard/students/examination", icon: FileCheck2 },
    { label: "My Results", href: "/dashboard/students/results", icon: BarChart3 },
    { label: "Transcript Request", href: "/dashboard/students/transcript", icon: ScrollText },

    { label: "My Finance", href: "/dashboard/students/finance", icon: Wallet },
    { label: "My Scholarships", href: "/dashboard/students/scholarships", icon: Award },
    { label: "My Documents", href: "/dashboard/students/documents", icon: FolderOpen },
    { label: "Certificate Requests", href: "/dashboard/students/certificates", icon: FileBadge },

    { label: "My Requests", href: "/dashboard/students/requests", icon: Mail },
    { label: "File a Complaint", href: "/dashboard/students/complaints", icon: MessageSquareWarning },
    { label: "Leave Application", href: "/dashboard/students/leave", icon: CalendarX },

    { label: "Library Status", href: "/dashboard/students/library", icon: Library },
    { label: "Hostel Info", href: "/dashboard/students/hostel", icon: BedDouble },
    { label: "Transport Pass", href: "/dashboard/students/transport", icon: Bus },
    { label: "My Clubs", href: "/dashboard/students/clubs", icon: Trophy },
];

const STUDENT_MODULE_NAV: NavItem[] = [
    { label: "Master Profile", href: "/dashboard/students/master-profile", icon: User },
    { label: "Identity & IDs", href: "/dashboard/students/identity", icon: IdCard },
    { label: "Personal Info", href: "/dashboard/students/personal-info", icon: Contact },
    { label: "Family & Guardian", href: "/dashboard/students/family", icon: UsersRound },
    { label: "Emergency Contact", href: "/dashboard/students/emergency", icon: Ambulance },
    { label: "Academic Profile", href: "/dashboard/students/academic-profile", icon: GraduationCap },
    { label: "Program & Batch", href: "/dashboard/students/program", icon: Landmark },
    { label: "Student Status", href: "/dashboard/students/status", icon: BadgeCheck },

    { label: "Admission History", href: "/dashboard/students/admission", icon: ClipboardList },
    { label: "Enrollment", href: "/dashboard/students/enrollment", icon: UserPlus },
    { label: "Course Registration", href: "/dashboard/students/registration", icon: BookOpen },
    { label: "Academic Progress", href: "/dashboard/students/progress", icon: TrendingUp },
    { label: "Student Attendance", href: "/dashboard/students/attendance", icon: CalendarCheck },
    { label: "Examination", href: "/dashboard/students/examination", icon: FileCheck2 },
    { label: "Results & GPA", href: "/dashboard/students/results", icon: BarChart3 },
    { label: "Transcript", href: "/dashboard/students/transcript", icon: ScrollText },

    { label: "Student Finance", href: "/dashboard/students/finance", icon: Wallet },
    { label: "Scholarships", href: "/dashboard/students/scholarships", icon: Award },
    { label: "Documents", href: "/dashboard/students/documents", icon: FolderOpen },
    { label: "Certificates", href: "/dashboard/students/certificates", icon: FileBadge },

    { label: "Requests", href: "/dashboard/students/requests", icon: Mail },
    { label: "Complaints", href: "/dashboard/students/complaints", icon: MessageSquareWarning },
    { label: "Disciplinary", href: "/dashboard/students/disciplinary", icon: Gavel },
    { label: "Leave & Absence", href: "/dashboard/students/leave", icon: CalendarX },

    { label: "Library Access", href: "/dashboard/students/library", icon: Library },
    { label: "Hostel Allocation", href: "/dashboard/students/hostel", icon: BedDouble },
    { label: "Transport", href: "/dashboard/students/transport", icon: Bus },
    { label: "Clubs & Activities", href: "/dashboard/students/clubs", icon: Trophy },

    { label: "Communication", href: "/dashboard/students/communication", icon: MessagesSquare },
    { label: "Student Portal Access", href: "/dashboard/students/student-portal", icon: Monitor },
    { label: "Guardian Portal Access", href: "/dashboard/students/guardian-portal", icon: Smartphone },

    { label: "Graduation", href: "/dashboard/students/graduation", icon: GraduationCap },
    { label: "Alumni Transition", href: "/dashboard/students/alumni", icon: Handshake },

    { label: "Student Analytics", href: "/dashboard/students/analytics", icon: LineChart },
];

const ROLE_NAV: Record<string, NavItem[]> = {
    super_admin: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        ...STUDENT_MODULE_NAV,
        ...ACADEMIC_MODULE_NAV,
        ...ADMINISTRATION_MODULE_NAV,
        { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
        { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
    ],
    admin: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        ...STUDENT_MODULE_NAV,
        ...ACADEMIC_MODULE_NAV,
        ...ADMINISTRATION_MODULE_NAV,
        { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
        { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
    ],
    registrar: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        ...STUDENT_MODULE_NAV,
        ...ACADEMIC_MODULE_NAV,
        { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
    ],
    dean: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        ...ACADEMIC_MODULE_NAV,
        { label: "Students", href: "/dashboard/students", icon: Users },
        { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
    ],
    hod: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        ...ACADEMIC_MODULE_NAV,
        { label: "Students", href: "/dashboard/students", icon: Users },
        { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
    ],
    faculty: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        ...FACULTY_PORTAL_NAV,
        { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
    ],
    student: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        ...STUDENT_PORTAL_NAV,
        { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
    ],
    guardian: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { label: "Results", href: "/dashboard/results", icon: BarChart3 },
        { label: "Attendance", href: "/dashboard/attendance", icon: CalendarCheck },
        { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
        { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
    ],
    admission_officer: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        ...STUDENT_MODULE_NAV,
        { label: "Programs", href: "/dashboard/programs", icon: GraduationCap },
        { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
    ],
    finance_officer: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { label: "Fee Structure", href: "/dashboard/finance/fee-structure", icon: FileSpreadsheet },
        { label: "Student Billing", href: "/dashboard/finance/student-billing", icon: FileText },
        { label: "Accounts Receivable", href: "/dashboard/finance/accounts-receivable", icon: Inbox },
        { label: "Payment Management", href: "/dashboard/finance/payments", icon: CreditCard },
        { label: "Refund Management", href: "/dashboard/finance/refunds", icon: Undo2 },
        { label: "Scholarship & Waiver", href: "/dashboard/finance/scholarships", icon: Award },
        { label: "Student Ledger", href: "/dashboard/finance/student-ledger", icon: BookMarked },
        { label: "General Accounting", href: "/dashboard/finance/general-accounting", icon: Calculator },
        { label: "Chart of Accounts", href: "/dashboard/finance/chart-of-accounts", icon: LayoutGrid },
        { label: "Journal & Ledger", href: "/dashboard/finance/journal-ledger", icon: BookText },
        { label: "Accounts Payable", href: "/dashboard/finance/accounts-payable", icon: Send },
        { label: "Vendor Management", href: "/dashboard/finance/vendor-management", icon: Building2 },
        { label: "Expense Management", href: "/dashboard/finance/expenses", icon: TrendingDown },
        { label: "Budget Management", href: "/dashboard/finance/budgets", icon: PieChart },
        { label: "Bank & Cash", href: "/dashboard/finance/bank-cash", icon: Landmark },
        { label: "Payroll", href: "/dashboard/finance/payroll", icon: Banknote },
        { label: "Tax & Statutory", href: "/dashboard/finance/tax", icon: Percent },
        { label: "Financial Reporting", href: "/dashboard/finance/reporting", icon: FileBarChart },
        { label: "Financial Dashboard", href: "/dashboard/finance", icon: Gauge },
        { label: "Reconciliation", href: "/dashboard/finance/reconciliation", icon: ClipboardCheck },
        { label: "Audit & Controls", href: "/dashboard/finance/audit", icon: SearchCheck },
        { label: "Finance Configuration", href: "/dashboard/finance/configuration", icon: Settings },
        { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
    ],
    accountant: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
        { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
    ],
    hr_officer: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
    ],
    examination_officer: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { label: "Exams", href: "/dashboard/exams", icon: FileCheck2 },
        { label: "Results", href: "/dashboard/results", icon: BarChart3 },
        { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
    ],
    librarian: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
    ],
    hostel_manager: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { label: "Students", href: "/dashboard/students", icon: Users },
        { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
    ],
    transport_manager: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { label: "Students", href: "/dashboard/students", icon: Users },
        { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
    ],
    it_admin: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        ...STUDENT_MODULE_NAV,
        ...ACADEMIC_MODULE_NAV,
        ...ADMINISTRATION_MODULE_NAV,
        { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
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

    "Fee Structure": "Student Finance",
    "Student Billing": "Student Finance",
    "Accounts Receivable": "Student Finance",
    "Payment Management": "Student Finance",
    "Refund Management": "Student Finance",
    "Scholarship & Waiver": "Student Finance",
    "Student Ledger": "Student Finance",

    "General Accounting": "Core Accounting",
    "Chart of Accounts": "Core Accounting",
    "Journal & Ledger": "Core Accounting",
    "Accounts Payable": "Core Accounting",
    "Vendor Management": "Core Accounting",
    "Expense Management": "Core Accounting",
    "Budget Management": "Core Accounting",

    "Bank & Cash": "Treasury & Payroll",
    "Payroll": "Treasury & Payroll",
    "Tax & Statutory": "Treasury & Payroll",

    "Financial Reporting": "Reports & Control",
    "Financial Dashboard": "Reports & Control",
    "Reconciliation": "Reports & Control",
    "Audit & Controls": "Reports & Control",
    "Finance Configuration": "Reports & Control",

    "Master Profile": "Profile & Identity",
    "Identity & IDs": "Profile & Identity",
    "Personal Info": "Profile & Identity",
    "Family & Guardian": "Profile & Identity",
    "Emergency Contact": "Profile & Identity",
    "Academic Profile": "Profile & Identity",
    "Program & Batch": "Profile & Identity",
    "Student Status": "Profile & Identity",

    "Admission History": "Academics & Progress",
    "Enrollment": "Academics & Progress",
    "Course Registration": "Academics & Progress",
    "Academic Progress": "Academics & Progress",
    "Student Attendance": "Academics & Progress",
    "Examination": "Academics & Progress",
    "Results & GPA": "Academics & Progress",
    "Transcript": "Academics & Progress",

    "Student Finance": "Finance & Documents",
    "Scholarships": "Finance & Documents",
    "Documents": "Finance & Documents",
    "Certificates": "Finance & Documents",

    "Requests": "Student Affairs",
    "Complaints": "Student Affairs",
    "Disciplinary": "Student Affairs",
    "Leave & Absence": "Student Affairs",

    "Library Access": "Facilities & Activities",
    "Hostel Allocation": "Facilities & Activities",
    "Transport": "Facilities & Activities",
    "Clubs & Activities": "Facilities & Activities",

    "Communication": "Portals & Communication",
    "Student Portal Access": "Portals & Communication",
    "Guardian Portal Access": "Portals & Communication",

    "Graduation": "Graduation & Analytics",
    "Alumni Transition": "Graduation & Analytics",
    "Student Analytics": "Graduation & Analytics",

    "My Master Profile": "My Profile",
    "My ID Card": "My Profile",
    "My Personal Info": "My Profile",
    "My Emergency Contact": "My Profile",
    "My Academic Profile": "My Profile",

    "Enrollment Status": "My Academics",
    "My Course Reg": "My Academics",
    "My Progress": "My Academics",
    "My Attendance": "My Academics",
    "Exam Schedule": "My Academics",
    "My Results": "My Academics",
    "Transcript Request": "My Academics",

    "My Finance": "Finance & Documents",
    "My Scholarships": "Finance & Documents",
    "My Documents": "Finance & Documents",
    "Certificate Requests": "Finance & Documents",

    "My Requests": "Student Affairs",
    "File a Complaint": "Student Affairs",
    "Leave Application": "Student Affairs",

    "Library Status": "Facilities & Activities",
    "Hostel Info": "Facilities & Activities",
    "Transport Pass": "Facilities & Activities",
    "My Clubs": "Facilities & Activities",


    "Institution Structure": "Institution & Structure",
    "Academic Year": "Institution & Structure",

    "Program Management": "Programs & Courses",
    "Course Management": "Programs & Courses",
    "Curriculum Management": "Programs & Courses",

    "Class Sections": "Scheduling & Classes",
    "Class Scheduling": "Scheduling & Classes",
    "Academic Calendar": "Scheduling & Classes",

    "Course Reg Setup": "Enrollment & Advising",
    "Academic Advising": "Enrollment & Advising",
    "Academic Requests": "Enrollment & Advising",

    "Attendance Record": "Assessment & Progress",
    "Assessment Setup": "Assessment & Progress",
    "Exam Management": "Assessment & Progress",
    "Result & Grading": "Assessment & Progress",
    "Student Progress": "Assessment & Progress",

    "Academic Documents": "Records & Analytics",
    "Academic Analytics": "Records & Analytics",


    "My Classes": "Scheduling & Classes",
    "My Schedule": "Scheduling & Classes",
    
    "Advisee Students": "Enrollment & Advising",
    
    "Attendance Entry": "Assessment & Progress",
    "Assessments Setup": "Assessment & Progress",
    "Exam Duties": "Assessment & Progress",
    "Marks Entry": "Assessment & Progress",
    
    "Faculty Analytics": "Records & Analytics",


    "Organization": "Org & Personnel",
    "Admin Staff": "Org & Personnel",
    "Offices & Depts": "Org & Personnel",

    "User Access": "Users & Access",
    "Security Settings": "Users & Access",
    "Compliance & Audit": "Users & Access",

    "Workflow Config": "Workflow & Comms",
    "Official Documents": "Workflow & Comms",
    "Correspondence": "Workflow & Comms",
    "Notices & Broadcasts": "Workflow & Comms",

    "Meeting Manager": "Meetings & Committees",
    "Committee Manager": "Meetings & Committees",

    "Facilities & Spaces": "Facilities & Assets",
    "Asset Registry": "Facilities & Assets",
    "Procurement": "Facilities & Assets",

    "Service Requests": "Settings & System",
    "Global Policies": "Settings & System",
    "Alert Configs": "Settings & System",
    "Reports": "Settings & System",
    "System Health": "Settings & System",

};
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<DemoUser | null>(null);
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
            try {
                setUser(JSON.parse(userData));
            } catch {
                // ignore
            }
        }
        setLoading(false);
    }, [router]);

    useEffect(() => {
        if (loading) return;
        if (!canAccessRoute(pathname)) {
            router.push("/dashboard");
        }
    }, [pathname, loading, router]);

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
                    <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-6">
                        {Object.entries(groupedItems).map(([group, items]) => (
                            <div key={group}>
                                <h3 className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-[0.12em] mb-2">
                                    {group}
                                </h3>
                                <div className="space-y-0.5">
                                    {items.map((item) => {
                                        const active = pathname === item.href;
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                aria-current={active ? "page" : undefined}
                                                className={`group relative flex items-center gap-3 pl-3 pr-3 py-2 rounded-md text-[13px] transition-colors duration-150 ${
                                                    active
                                                        ? "bg-slate-800/70 text-white font-medium"
                                                        : "text-slate-400 font-normal hover:bg-slate-800/40 hover:text-slate-100"
                                                }`}
                                            >
                                                <span
                                                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-r-full bg-indigo-400 transition-all duration-150 ${
                                                        active ? "h-5 opacity-100" : "h-0 opacity-0"
                                                    }`}
                                                />
                                                <Icon
                                                    size={16}
                                                    strokeWidth={active ? 2 : 1.75}
                                                    className={`shrink-0 transition-colors duration-150 ${
                                                        active ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"
                                                    }`}
                                                />
                                                <span className="truncate">{item.label}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>

                    {/* User */}
                    <div className="px-4 py-4 border-t border-slate-800">
                        <div className="flex items-center gap-3">
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-9 h-9 rounded-full object-cover border border-slate-700"
                                />
                            ) : (
                                <div className="w-9 h-9 gradient-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                </div>
                            )}
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
                                aria-label="Logout"
                            >
                                <LogOut size={18} strokeWidth={1.75} />
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
                                aria-label="Toggle navigation"
                            >
                                <Menu size={22} strokeWidth={1.75} className="text-slate-700" />
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
                                aria-label="Notifications"
                            >
                                <Bell size={18} strokeWidth={1.75} className="text-slate-600" />
                                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
                            </Link>
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-9 h-9 rounded-full object-cover border border-slate-200"
                                />
                            ) : (
                                <div className="w-9 h-9 gradient-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="px-4 sm:px-6 lg:px-8 py-8">{children}</main>
            </div>
        </div>
    );
}