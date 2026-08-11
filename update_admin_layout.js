const fs = require('fs');
let content = fs.readFileSync('src/app/dashboard/layout.tsx', 'utf8');

const administrationNav = `const ADMINISTRATION_MODULE_NAV: NavItem[] = [
    { label: "Organization", href: "/dashboard/administration/organization-management", icon: "🏛️" },
    { label: "Admin Staff", href: "/dashboard/administration/admin-staff", icon: "🧑‍💼" },
    { label: "Offices & Depts", href: "/dashboard/administration/office-department", icon: "🏢" },

    { label: "User Access", href: "/dashboard/administration/user-access", icon: "🔐" },
    { label: "Security Settings", href: "/dashboard/administration/security-administration", icon: "🛡️" },
    { label: "Compliance & Audit", href: "/dashboard/administration/compliance-audit", icon: "📋" },

    { label: "Workflow Config", href: "/dashboard/administration/workflow-management", icon: "⚙️" },
    { label: "Official Documents", href: "/dashboard/administration/document-record", icon: "📁" },
    { label: "Correspondence", href: "/dashboard/administration/correspondence", icon: "✉️" },
    { label: "Notices & Broadcasts", href: "/dashboard/administration/notice-communication", icon: "📢" },

    { label: "Meeting Manager", href: "/dashboard/administration/meeting-management", icon: "🤝" },
    { label: "Committee Manager", href: "/dashboard/administration/committee-management", icon: "👥" },

    { label: "Facilities & Spaces", href: "/dashboard/administration/facility-resource", icon: "🏫" },
    { label: "Asset Registry", href: "/dashboard/administration/asset-administration", icon: "💻" },
    { label: "Procurement", href: "/dashboard/administration/procurement", icon: "🛒" },

    { label: "Service Requests", href: "/dashboard/administration/service-request", icon: "🎫" },
    { label: "Global Policies", href: "/dashboard/administration/policy-configuration", icon: "📜" },
    { label: "Alert Configs", href: "/dashboard/administration/notification-configuration", icon: "🔔" },
    { label: "Reports", href: "/dashboard/administration/reporting", icon: "📊" },
    { label: "System Health", href: "/dashboard/administration/system-administration", icon: "💻" }
];

const STUDENT_PORTAL_NAV`;

content = content.replace('const STUDENT_PORTAL_NAV', administrationNav);

// Inject into super_admin and admin only
const rolesToUpdate = ['super_admin', 'admin'];

const replaceInRole = (roleContent) => {
    // Insert ADMINISTRATION_MODULE_NAV after ACADEMIC_MODULE_NAV
    if (roleContent.includes('...ACADEMIC_MODULE_NAV,')) {
        return roleContent.replace('...ACADEMIC_MODULE_NAV,', '...ACADEMIC_MODULE_NAV,\n        ...ADMINISTRATION_MODULE_NAV,');
    }
    return roleContent;
};

for (const r of rolesToUpdate) {
    const reg = new RegExp(`(${r}: \\[[\\s\\S]*?\\],)`, 'g');
    content = content.replace(reg, (match) => replaceInRole(match));
}


const adminGroupMappings = `
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
`;

// Inject into GROUP_MAPPING
content = content.replace(/};\s*export default function DashboardLayout/g, adminGroupMappings + "\n};\nexport default function DashboardLayout");

fs.writeFileSync('src/app/dashboard/layout.tsx', content);
console.log("Layout updated for administration.");
