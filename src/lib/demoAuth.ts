// Client-side auth helpers for the demo/visualization build.
// No real backend enforcement; this scopes the UI per demo role.

export type UserRole =
  | "super_admin"
  | "admin"
  | "registrar"
  | "dean"
  | "hod"
  | "faculty"
  | "student"
  | "guardian"
  | "admission_officer"
  | "finance_officer"
  | "accountant"
  | "hr_officer"
  | "examination_officer"
  | "librarian"
  | "hostel_manager"
  | "transport_manager"
  | "it_admin";

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  department?: string;
  designation?: string;
  program?: string;
  studentId?: string;
  semester?: string;
  wardStudentId?: string; // for guardian demo
}

export const DEMO_ACCOUNTS: Record<string, DemoUser> = {
  "admin@erp.com": {
    id: "demo-admin",
    name: "Md. Shafiqul Islam",
    email: "admin@erp.com",
    role: "admin",
    avatar: "https://ui-avatars.com/api/?name=Md+Shafiqul+Islam&background=4f46e5&color=fff&size=128",
    phone: "+8801712345678",
    designation: "System Administrator",
    department: "Administration",
  },
  "student@erp.com": {
    id: "demo-student",
    name: "Afnan Mahmud",
    email: "student@erp.com",
    role: "student",
    avatar: "https://ui-avatars.com/api/?name=Afnan+Mahmud&background=0ea5e9&color=fff&size=128",
    phone: "+8801812345678",
    program: "BSc in Computer Science & Engineering",
    studentId: "191-15-12345",
    semester: "Fall 2026 (8th)",
    department: "Computer Science",
  },
  "faculty@erp.com": {
    id: "demo-faculty",
    name: "Dr. Kamal Uddin",
    email: "faculty@erp.com",
    role: "faculty",
    avatar: "https://ui-avatars.com/api/?name=Dr+Kamal+Uddin&background=10b981&color=fff&size=128",
    phone: "+8801912345678",
    designation: "Professor",
    department: "Computer Science",
  },
  "finance@erp.com": {
    id: "demo-finance",
    name: "Tania Akter",
    email: "finance@erp.com",
    role: "finance_officer",
    avatar: "https://ui-avatars.com/api/?name=Tania+Akter&background=f59e0b&color=fff&size=128",
    phone: "+8801612345678",
    designation: "Finance Officer",
    department: "Finance Division",
  },
};

export const DEFAULT_PASSWORD = "password";

export function getStoredUser(): DemoUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DemoUser;
  } catch {
    return null;
  }
}

export function getCurrentRole(): UserRole | null {
  return getStoredUser()?.role ?? null;
}

export function isDemoAccount(email: string, password: string): boolean {
  return Boolean(DEMO_ACCOUNTS[email]) && password === DEFAULT_PASSWORD;
}

export function getDemoUser(email: string): DemoUser | undefined {
  return DEMO_ACCOUNTS[email];
}

export function hasRole(allowed: UserRole[]): boolean {
  const role = getCurrentRole();
  return role ? allowed.includes(role) : false;
}

export function isAdminLike(): boolean {
  const role = getCurrentRole();
  return role ? ["super_admin", "admin", "it_admin"].includes(role) : false;
}

export function isStudent(): boolean {
  return getCurrentRole() === "student";
}

export function isFaculty(): boolean {
  return getCurrentRole() === "faculty";
}

export function isFinance(): boolean {
  const role = getCurrentRole();
  return role ? ["finance_officer", "accountant"].includes(role) : false;
}

export function isGuardian(): boolean {
  return getCurrentRole() === "guardian";
}

export function isManagement(): boolean {
  const role = getCurrentRole();
  return role
    ? ["registrar", "dean", "hod", "admission_officer", "examination_officer", "hostel_manager", "transport_manager", "hr_officer", "librarian"].includes(role)
    : false;
}

// Route-level access control (frontend only, for visualization)
export const ROUTE_ACCESS: Record<string, UserRole[]> = {
  // Student self-service pages
  "/dashboard/students": ["super_admin", "admin", "registrar", "admission_officer", "hostel_manager", "transport_manager", "it_admin"],
  "/dashboard/students/master-profile": ["super_admin", "admin", "registrar", "admission_officer", "student", "it_admin"],
  "/dashboard/students/identity": ["super_admin", "admin", "registrar", "admission_officer", "student", "it_admin"],
  "/dashboard/students/personal-info": ["super_admin", "admin", "registrar", "admission_officer", "student", "it_admin"],
  "/dashboard/students/emergency": ["super_admin", "admin", "registrar", "admission_officer", "student", "it_admin"],
  "/dashboard/students/academic-profile": ["super_admin", "admin", "registrar", "admission_officer", "student", "it_admin"],
  "/dashboard/students/enrollment": ["super_admin", "admin", "registrar", "admission_officer", "student", "it_admin"],
  "/dashboard/students/registration": ["super_admin", "admin", "registrar", "admission_officer", "student", "it_admin"],
  "/dashboard/students/progress": ["super_admin", "admin", "registrar", "admission_officer", "student", "it_admin"],
  "/dashboard/students/attendance": ["super_admin", "admin", "registrar", "admission_officer", "faculty", "student", "it_admin"],
  "/dashboard/students/examination": ["super_admin", "admin", "registrar", "admission_officer", "student", "it_admin"],
  "/dashboard/students/results": ["super_admin", "admin", "registrar", "admission_officer", "student", "it_admin"],
  "/dashboard/students/transcript": ["super_admin", "admin", "registrar", "admission_officer", "student", "it_admin"],
  "/dashboard/students/finance": ["super_admin", "admin", "registrar", "admission_officer", "finance_officer", "accountant", "student", "it_admin"],
  "/dashboard/students/scholarships": ["super_admin", "admin", "registrar", "admission_officer", "finance_officer", "student", "it_admin"],
  "/dashboard/students/documents": ["super_admin", "admin", "registrar", "admission_officer", "student", "it_admin"],
  "/dashboard/students/certificates": ["super_admin", "admin", "registrar", "admission_officer", "student", "it_admin"],
  "/dashboard/students/requests": ["super_admin", "admin", "registrar", "admission_officer", "student", "it_admin"],
  "/dashboard/students/complaints": ["super_admin", "admin", "registrar", "admission_officer", "student", "it_admin"],
  "/dashboard/students/leave": ["super_admin", "admin", "registrar", "admission_officer", "student", "it_admin"],
  "/dashboard/students/library": ["super_admin", "admin", "registrar", "admission_officer", "librarian", "student", "it_admin"],
  "/dashboard/students/hostel": ["super_admin", "admin", "registrar", "admission_officer", "hostel_manager", "student", "it_admin"],
  "/dashboard/students/transport": ["super_admin", "admin", "registrar", "admission_officer", "transport_manager", "student", "it_admin"],
  "/dashboard/students/clubs": ["super_admin", "admin", "registrar", "admission_officer", "student", "it_admin"],

  // Faculty pages
  "/dashboard/academics": ["super_admin", "admin", "registrar", "dean", "hod", "faculty", "it_admin"],
  "/dashboard/academics/section-management": ["super_admin", "admin", "registrar", "dean", "hod", "faculty", "it_admin"],
  "/dashboard/academics/class-scheduling": ["super_admin", "admin", "registrar", "dean", "hod", "faculty", "it_admin"],
  "/dashboard/academics/advising": ["super_admin", "admin", "registrar", "dean", "hod", "faculty", "it_admin"],
  "/dashboard/academics/attendance": ["super_admin", "admin", "registrar", "dean", "hod", "faculty", "it_admin"],
  "/dashboard/academics/assessment": ["super_admin", "admin", "registrar", "dean", "hod", "faculty", "it_admin"],
  "/dashboard/academics/examination": ["super_admin", "admin", "registrar", "dean", "hod", "faculty", "examination_officer", "it_admin"],
  "/dashboard/academics/result-grading": ["super_admin", "admin", "registrar", "dean", "hod", "faculty", "examination_officer", "it_admin"],

  // Finance pages
  "/dashboard/finance": ["super_admin", "admin", "finance_officer", "accountant", "it_admin"],
  "/dashboard/finance/fee-structure": ["super_admin", "admin", "finance_officer", "accountant", "it_admin"],
  "/dashboard/finance/student-billing": ["super_admin", "admin", "finance_officer", "accountant", "it_admin"],
  "/dashboard/finance/accounts-receivable": ["super_admin", "admin", "finance_officer", "accountant", "it_admin"],
  "/dashboard/finance/payments": ["super_admin", "admin", "finance_officer", "accountant", "it_admin"],
  "/dashboard/finance/refunds": ["super_admin", "admin", "finance_officer", "accountant", "it_admin"],
  "/dashboard/finance/scholarships": ["super_admin", "admin", "finance_officer", "accountant", "it_admin"],
  "/dashboard/finance/student-ledger": ["super_admin", "admin", "finance_officer", "accountant", "it_admin"],
  "/dashboard/finance/general-accounting": ["super_admin", "admin", "finance_officer", "accountant", "it_admin"],
  "/dashboard/finance/payroll": ["super_admin", "admin", "finance_officer", "accountant", "hr_officer", "it_admin"],
  "/dashboard/finance/expenses": ["super_admin", "admin", "finance_officer", "accountant", "it_admin"],

  // Admin pages
  "/dashboard/administration": ["super_admin", "admin", "it_admin"],
  "/dashboard/administration/user-access": ["super_admin", "admin", "it_admin"],
  "/dashboard/administration/system-administration": ["super_admin", "admin", "it_admin"],

  // Shared pages
  "/dashboard/results": ["super_admin", "admin", "registrar", "dean", "hod", "faculty", "examination_officer", "student", "guardian", "it_admin"],
  "/dashboard/attendance": ["super_admin", "admin", "registrar", "dean", "hod", "faculty", "student", "guardian", "it_admin"],
  "/dashboard/payments": ["super_admin", "admin", "finance_officer", "accountant", "student", "guardian", "it_admin"],
  "/dashboard/exams": ["super_admin", "admin", "registrar", "dean", "hod", "faculty", "examination_officer", "student", "it_admin"],
  "/dashboard/notifications": [], // all authenticated
};

export function canAccessRoute(pathname: string): boolean {
  // Notifications open to all authenticated users
  if (ROUTE_ACCESS[pathname]?.length === 0) return true;

  const role = getCurrentRole();
  if (!role) return false;

  // Dashboard landing page always allowed
  if (pathname === "/dashboard") return true;

  // Find the most specific matching prefix
  const matchingPaths = Object.keys(ROUTE_ACCESS)
    .filter((path) => pathname.startsWith(path))
    .sort((a, b) => b.length - a.length);

  if (matchingPaths.length === 0) return true; // unknown route, allow

  return ROUTE_ACCESS[matchingPaths[0]].includes(role);
}
