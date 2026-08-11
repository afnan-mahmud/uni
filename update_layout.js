const fs = require('fs');
let content = fs.readFileSync('src/app/dashboard/layout.tsx', 'utf8');

const studentNav = `const STUDENT_MODULE_NAV: NavItem[] = [
    { label: "Master Profile", href: "/dashboard/students/master-profile", icon: "👤" },
    { label: "Identity & IDs", href: "/dashboard/students/identity", icon: "🪪" },
    { label: "Personal Info", href: "/dashboard/students/personal-info", icon: "📄" },
    { label: "Family & Guardian", href: "/dashboard/students/family", icon: "👨‍👩‍👧‍👦" },
    { label: "Emergency Contact", href: "/dashboard/students/emergency", icon: "🚑" },
    { label: "Academic Profile", href: "/dashboard/students/academic-profile", icon: "🎓" },
    { label: "Program & Batch", href: "/dashboard/students/program", icon: "🏛️" },
    { label: "Student Status", href: "/dashboard/students/status", icon: "🟢" },

    { label: "Admission History", href: "/dashboard/students/admission", icon: "📝" },
    { label: "Enrollment", href: "/dashboard/students/enrollment", icon: "✅" },
    { label: "Course Registration", href: "/dashboard/students/registration", icon: "📚" },
    { label: "Academic Progress", href: "/dashboard/students/progress", icon: "📈" },
    { label: "Student Attendance", href: "/dashboard/students/attendance", icon: "🕒" },
    { label: "Examination", href: "/dashboard/students/examination", icon: "📋" },
    { label: "Results & GPA", href: "/dashboard/students/results", icon: "📊" },
    { label: "Transcript", href: "/dashboard/students/transcript", icon: "📜" },

    { label: "Student Finance", href: "/dashboard/students/finance", icon: "💰" },
    { label: "Scholarships", href: "/dashboard/students/scholarships", icon: "🏅" },
    { label: "Documents", href: "/dashboard/students/documents", icon: "📁" },
    { label: "Certificates", href: "/dashboard/students/certificates", icon: "🎓" },

    { label: "Requests", href: "/dashboard/students/requests", icon: "✉️" },
    { label: "Complaints", href: "/dashboard/students/complaints", icon: "⚠️" },
    { label: "Disciplinary", href: "/dashboard/students/disciplinary", icon: "⚖️" },
    { label: "Leave & Absence", href: "/dashboard/students/leave", icon: "🌴" },

    { label: "Library Access", href: "/dashboard/students/library", icon: "📚" },
    { label: "Hostel Allocation", href: "/dashboard/students/hostel", icon: "🛏️" },
    { label: "Transport", href: "/dashboard/students/transport", icon: "🚌" },
    { label: "Clubs & Activities", href: "/dashboard/students/clubs", icon: "⚽" },

    { label: "Communication", href: "/dashboard/students/communication", icon: "💬" },
    { label: "Student Portal Access", href: "/dashboard/students/student-portal", icon: "💻" },
    { label: "Guardian Portal Access", href: "/dashboard/students/guardian-portal", icon: "👨‍👩‍👧" },

    { label: "Graduation", href: "/dashboard/students/graduation", icon: "🎓" },
    { label: "Alumni Transition", href: "/dashboard/students/alumni", icon: "🤝" },
    
    { label: "Student Analytics", href: "/dashboard/students/analytics", icon: "📈" },
];

const ROLE_NAV`;

content = content.replace('const ROLE_NAV', studentNav);

const rolesToUpdate = ['super_admin', 'admin', 'registrar', 'admission_officer'];
for (const role of rolesToUpdate) {
    const regex = new RegExp(`(${role}: \\[\\s*[\\s\\S]*?){ label: "Students", href: "/dashboard/students", icon: "👨‍🎓" },`, 'g');
    content = content.replace(regex, `$1...STUDENT_MODULE_NAV,`);
}

const groupMappingsStr = `
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
};`;

content = content.replace(/};\s*export default function DashboardLayout/g, groupMappingsStr + "\nexport default function DashboardLayout");

fs.writeFileSync('src/app/dashboard/layout.tsx', content);
console.log('Done');
