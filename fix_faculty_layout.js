const fs = require('fs');
let content = fs.readFileSync('src/app/dashboard/layout.tsx', 'utf8');

// 1. Define FACULTY_PORTAL_NAV after ACADEMIC_MODULE_NAV
const facultyPortalNav = `
const FACULTY_PORTAL_NAV: NavItem[] = [
    { label: "My Classes", href: "/dashboard/academics/section-management", icon: "🏫" },
    { label: "My Schedule", href: "/dashboard/academics/class-scheduling", icon: "⏰" },
    { label: "Academic Calendar", href: "/dashboard/academics/calendar", icon: "🗓️" },
    
    { label: "Advisee Students", href: "/dashboard/academics/advising", icon: "🤝" },
    
    { label: "Attendance Entry", href: "/dashboard/academics/attendance", icon: "✅" },
    { label: "Assessments Setup", href: "/dashboard/academics/assessment", icon: "📝" },
    { label: "Exam Duties", href: "/dashboard/academics/examination", icon: "📋" },
    { label: "Marks Entry", href: "/dashboard/academics/result-grading", icon: "📊" },
    
    { label: "Faculty Analytics", href: "/dashboard/academics/analytics", icon: "📉" }
];
`;

content = content.replace('const STUDENT_PORTAL_NAV', facultyPortalNav + '\nconst STUDENT_PORTAL_NAV');

// 2. Fix the super_admin duplicate ACADEMIC_MODULE_NAV
content = content.replace('...ACADEMIC_MODULE_NAV,\n        ...ACADEMIC_MODULE_NAV,', '...ACADEMIC_MODULE_NAV,');

// 3. Update the faculty role
const newFacultyRole = `faculty: [
        { label: "Overview", href: "/dashboard", icon: "📊" },
        ...FACULTY_PORTAL_NAV,
        { label: "Notifications", href: "/dashboard/notifications", icon: "🔔" },
    ],`;

content = content.replace(/faculty:\s*\[[\s\S]*?\],/, newFacultyRole);

// 4. Update GROUP_MAPPING with the new faculty labels
const facultyGroupMappings = `
    "My Classes": "Scheduling & Classes",
    "My Schedule": "Scheduling & Classes",
    
    "Advisee Students": "Enrollment & Advising",
    
    "Attendance Entry": "Assessment & Progress",
    "Assessments Setup": "Assessment & Progress",
    "Exam Duties": "Assessment & Progress",
    "Marks Entry": "Assessment & Progress",
    
    "Faculty Analytics": "Records & Analytics",
`;

// Inject into GROUP_MAPPING
content = content.replace(/};\s*export default function DashboardLayout/g, facultyGroupMappings + "\n};\nexport default function DashboardLayout");

// Also, clean up the spacing for other roles that got weird whitespaces
content = content.replace(/                                                                        \{ label: "Payments", href: "\/dashboard\/payments", icon: "💰" \},/g, '        { label: "Payments", href: "/dashboard/payments", icon: "💰" },');
content = content.replace(/                                \{ label: "Notifications", href: "\/dashboard\/notifications", icon: "🔔" \},/g, '        { label: "Notifications", href: "/dashboard/notifications", icon: "🔔" },');
content = content.replace(/                                        \{ label: "Notifications", href: "\/dashboard\/notifications", icon: "🔔" \},/g, '        { label: "Notifications", href: "/dashboard/notifications", icon: "🔔" },');

fs.writeFileSync('src/app/dashboard/layout.tsx', content);
console.log("Faculty portal updated");
