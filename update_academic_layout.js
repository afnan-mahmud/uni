const fs = require('fs');
let content = fs.readFileSync('src/app/dashboard/layout.tsx', 'utf8');

const academicNav = `const ACADEMIC_MODULE_NAV: NavItem[] = [
    { label: "Institution Structure", href: "/dashboard/academics/institution-structure", icon: "🏛️" },
    { label: "Academic Year", href: "/dashboard/academics/academic-year", icon: "📅" },

    { label: "Program Management", href: "/dashboard/academics/program-management", icon: "🎓" },
    { label: "Course Management", href: "/dashboard/academics/course-management", icon: "📚" },
    { label: "Curriculum Management", href: "/dashboard/academics/curriculum", icon: "📜" },

    { label: "Class Sections", href: "/dashboard/academics/section-management", icon: "🏫" },
    { label: "Class Scheduling", href: "/dashboard/academics/class-scheduling", icon: "⏰" },
    { label: "Academic Calendar", href: "/dashboard/academics/calendar", icon: "🗓️" },

    { label: "Course Reg Setup", href: "/dashboard/academics/registration", icon: "📝" },
    { label: "Academic Advising", href: "/dashboard/academics/advising", icon: "🤝" },
    { label: "Academic Requests", href: "/dashboard/academics/requests", icon: "✉️" },

    { label: "Attendance Record", href: "/dashboard/academics/attendance", icon: "✅" },
    { label: "Assessment Setup", href: "/dashboard/academics/assessment", icon: "📝" },
    { label: "Exam Management", href: "/dashboard/academics/examination", icon: "📋" },
    { label: "Result & Grading", href: "/dashboard/academics/result-grading", icon: "📊" },
    { label: "Student Progress", href: "/dashboard/academics/progress", icon: "📈" },

    { label: "Academic Documents", href: "/dashboard/academics/documents", icon: "📄" },
    { label: "Academic Analytics", href: "/dashboard/academics/analytics", icon: "📉" }
];

const STUDENT_PORTAL_NAV`;

content = content.replace('const STUDENT_PORTAL_NAV', academicNav);

// Inject into admin, registrar, dean, hod
const rolesToUpdate = ['super_admin', 'admin', 'registrar', 'dean', 'hod'];
for (const role of rolesToUpdate) {
    // Find where the old academic stuff was (Departments, Programs, Courses, Semesters, Registrations, Attendance, Exams, Results)
    // Actually, to make it cleaner, let's just prepend ...ACADEMIC_MODULE_NAV, and then remove the old ones.
    const roleRegex = new RegExp(`(${role}: \\[\\s*[\\s\\S]*?)(?:\\{ label: "Departments"|\\{ label: "Programs"|\\{ label: "Courses"|\\{ label: "Semesters"|\\{ label: "Registrations"|\\{ label: "Attendance"|\\{ label: "Exams"|\\{ label: "Results")[\\s\\S]*?\\{ label: "Payments"`, 'g');
    
    // We will do a simpler approach: just find `...STUDENT_MODULE_NAV,` and insert `...ACADEMIC_MODULE_NAV,` right after it.
    // We also need to remove the old ones like "Courses", "Semesters" etc to avoid duplication/clutter.
}

// Let's do it simply by reading the arrays for each role and rewriting them.
// This is much safer using a basic replace.
const replaceInRole = (roleContent) => {
    // Remove old academic items
    let updated = roleContent.replace(/\{ label: "(Departments|Programs|Courses|Semesters|Registrations|Attendance|Exams|Results)".*\n/g, '');
    // Insert ACADEMIC_MODULE_NAV after STUDENT_MODULE_NAV or Overview
    if (updated.includes('...STUDENT_MODULE_NAV,')) {
        updated = updated.replace('...STUDENT_MODULE_NAV,', '...STUDENT_MODULE_NAV,\n        ...ACADEMIC_MODULE_NAV,');
    } else {
        updated = updated.replace('{ label: "Overview", href: "/dashboard", icon: "📊" },', '{ label: "Overview", href: "/dashboard", icon: "📊" },\n        ...ACADEMIC_MODULE_NAV,');
    }
    return updated;
};

// We will regex match each role array
const roleMatches = ['super_admin', 'admin', 'registrar', 'dean', 'hod'];
for (const r of roleMatches) {
    const reg = new RegExp(`(${r}: \\[[\\s\\S]*?\\],)`, 'g');
    content = content.replace(reg, (match) => replaceInRole(match));
}


const academicGroupMappings = `
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
`;

// Inject into GROUP_MAPPING
content = content.replace(/};\s*export default function DashboardLayout/g, academicGroupMappings + "\n};\nexport default function DashboardLayout");

fs.writeFileSync('src/app/dashboard/layout.tsx', content);
console.log("Layout updated for academics.");
