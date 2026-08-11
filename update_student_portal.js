const fs = require('fs');
let content = fs.readFileSync('src/app/dashboard/layout.tsx', 'utf8');

const studentPortalNav = `
const STUDENT_PORTAL_NAV: NavItem[] = [
    { label: "My Master Profile", href: "/dashboard/students/master-profile", icon: "👤" },
    { label: "My ID Card", href: "/dashboard/students/identity", icon: "🪪" },
    { label: "Personal Info", href: "/dashboard/students/personal-info", icon: "📄" },
    { label: "Emergency Contact", href: "/dashboard/students/emergency", icon: "🚑" },
    { label: "Academic Profile", href: "/dashboard/students/academic-profile", icon: "🎓" },

    { label: "Enrollment Status", href: "/dashboard/students/enrollment", icon: "✅" },
    { label: "Course Registration", href: "/dashboard/students/registration", icon: "📚" },
    { label: "My Progress", href: "/dashboard/students/progress", icon: "📈" },
    { label: "My Attendance", href: "/dashboard/students/attendance", icon: "🕒" },
    { label: "Exam Schedule", href: "/dashboard/students/examination", icon: "📋" },
    { label: "My Results", href: "/dashboard/students/results", icon: "📊" },
    { label: "Transcript Request", href: "/dashboard/students/transcript", icon: "📜" },

    { label: "My Finance", href: "/dashboard/students/finance", icon: "💰" },
    { label: "My Scholarships", href: "/dashboard/students/scholarships", icon: "🏅" },
    { label: "My Documents", href: "/dashboard/students/documents", icon: "📁" },
    { label: "Certificate Requests", href: "/dashboard/students/certificates", icon: "🎓" },

    { label: "My Requests", href: "/dashboard/students/requests", icon: "✉️" },
    { label: "File a Complaint", href: "/dashboard/students/complaints", icon: "⚠️" },
    { label: "Leave Application", href: "/dashboard/students/leave", icon: "🌴" },

    { label: "Library Status", href: "/dashboard/students/library", icon: "📚" },
    { label: "Hostel Info", href: "/dashboard/students/hostel", icon: "🛏️" },
    { label: "Transport Pass", href: "/dashboard/students/transport", icon: "🚌" },
    { label: "My Clubs", href: "/dashboard/students/clubs", icon: "⚽" },
];
`;

content = content.replace('const STUDENT_MODULE_NAV: NavItem[] = [', studentPortalNav + '\nconst STUDENT_MODULE_NAV: NavItem[] = [');

const studentRoleReplacement = `student: [
        { label: "Overview", href: "/dashboard", icon: "📊" },
        ...STUDENT_PORTAL_NAV,
        { label: "Notifications", href: "/dashboard/notifications", icon: "🔔" },
    ],`;

content = content.replace(/student:\s*\[[\s\S]*?\],/, studentRoleReplacement);

const newGroupMappings = `
    "My Master Profile": "My Profile",
    "My ID Card": "My Profile",
    "Personal Info": "My Profile",
    "Emergency Contact": "My Profile",
    "Academic Profile": "My Profile",

    "Enrollment Status": "My Academics",
    "Course Registration": "My Academics",
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
`;

// Inject into GROUP_MAPPING at the end
content = content.replace(/};\s*export default function DashboardLayout/g, newGroupMappings + "\n};\nexport default function DashboardLayout");

fs.writeFileSync('src/app/dashboard/layout.tsx', content);
console.log("Student portal updated");
