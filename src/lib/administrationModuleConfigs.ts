import { ModuleConfig } from "@/components/shared/GenericModuleView";

export const administrationConfigs: Record<string, ModuleConfig> = {
  // Org & Personnel
  "organization-management": {
    title: "Organization Management",
    description: "Manage global university structure, campuses, faculties, and internal committees.",
    primaryButton: "Add Entity",
    kpis: [
      { label: "Total Campuses", value: "3", color: "border-l-indigo-500" },
      { label: "Active Faculties", value: "8", color: "border-l-emerald-500" },
      { label: "Standing Committees", value: "14", color: "border-l-amber-500" }
    ],
    columns: ["Entity Name", "Type", "Parent", "Head/Chair", "Status"],
    data: [
      ["Main Campus", "Campus", "Northern University", "Vice Chancellor", "Active"],
      ["Faculty of Science", "Faculty", "Main Campus", "Dr. A. Rahman", "Active"],
      ["Disciplinary Board", "Committee", "Northern University", "Registrar", "Active"]
    ]
  },
  "admin-staff": {
    title: "Administration Staff",
    description: "Manage non-academic staff profiles, designations, and service history.",
    primaryButton: "Add Staff Member",
    kpis: [
      { label: "Total Admin Staff", value: "342", color: "border-l-indigo-500" },
      { label: "On Leave", value: "12", color: "border-l-rose-500" }
    ],
    columns: ["Employee ID", "Name", "Designation", "Office/Dept", "Status"],
    data: [
      ["EMP-1001", "Md. Shafiqul Islam", "Senior IT Officer", "IT Helpdesk", "Active"],
      ["EMP-1045", "Ayesha Siddiqua", "HR Executive", "Human Resources", "Active"],
      ["EMP-1102", "Kamrul Hasan", "Accounts Officer", "Finance Division", "On Leave"]
    ]
  },
  "office-department": {
    title: "Office & Department Management",
    description: "Configure administrative offices, service desks, and working hours.",
    primaryButton: "Create Office",
    kpis: [
      { label: "Total Offices", value: "45", color: "border-l-indigo-500" },
      { label: "Service Desks", value: "18", color: "border-l-emerald-500" }
    ],
    columns: ["Office Name", "Location", "Working Hours", "Head of Office", "Status"],
    data: [
      ["Registrar Office", "Admin Building, L2", "09:00 AM - 05:00 PM", "Md. Abu Taher", "Open"],
      ["IT Helpdesk", "Library Block, L1", "08:00 AM - 08:00 PM", "Shafiqul Islam", "Open"],
      ["Finance Division", "Admin Building, L3", "09:00 AM - 05:00 PM", "Tania Akter", "Open"]
    ]
  },

  // Workflow & Comms
  "workflow-management": {
    title: "Workflow Management",
    description: "Design approval workflows, escalation paths, and routing rules.",
    primaryButton: "Create Workflow",
    kpis: [
      { label: "Active Workflows", value: "86", color: "border-l-indigo-500" },
      { label: "Pending Approvals", value: "412", color: "border-l-amber-500" }
    ],
    columns: ["Workflow Name", "Trigger", "Steps", "Current Bottleneck", "Status"],
    data: [
      ["Purchase Request > 50k", "Form Submission", "4 (HOD -> Finance -> VC)", "Finance Div", "Active"],
      ["Student Leave App", "Student Portal", "2 (Advisor -> HOD)", "Advisor", "Active"],
      ["Faculty Travel Grant", "Staff Portal", "3 (HOD -> Dean -> HR)", "None", "Active"]
    ]
  },
  "document-record": {
    title: "Document & Record Management",
    description: "Manage official document registries, versions, and retention policies.",
    primaryButton: "Upload Document",
    kpis: [
      { label: "Total Documents", value: "14.5k", color: "border-l-indigo-500" },
      { label: "Pending Archive", value: "124", color: "border-l-amber-500" }
    ],
    columns: ["Document ID", "Title", "Category", "Version", "Retention Date", "Status"],
    data: [
      ["DOC-2026-001", "University Trust Deed", "Legal", "v1.0", "Permanent", "Archived"],
      ["POL-HR-004", "Employee Leave Policy", "Policy", "v2.1", "Until Superseded", "Active"],
      ["CIR-2026-089", "Eid Vacation Notice", "Notice", "v1.0", "2027-01-01", "Active"]
    ]
  },
  "correspondence": {
    title: "Correspondence Management",
    description: "Track incoming and outgoing physical and digital official mails.",
    primaryButton: "Log New Mail",
    kpis: [
      { label: "Unread/Pending Mails", value: "45", color: "border-l-rose-500" },
      { label: "Dispatched Today", value: "120", color: "border-l-emerald-500" }
    ],
    columns: ["Mail ID", "Type", "Subject", "Sender/Recipient", "Date", "Status"],
    data: [
      ["IN-8932", "Incoming", "UGC Grant Approval", "UGC Head Office", "Today 10:30 AM", "Pending Review"],
      ["OUT-4122", "Outgoing", "Transcripts Dispatch", "WES Canada", "Yesterday", "Dispatched"],
      ["IN-8931", "Incoming", "Vendor Invoice", "TechCorp Ltd", "Yesterday", "Forwarded to Finance"]
    ]
  },
  "notice-communication": {
    title: "Notice & Communication",
    description: "Broadcast circulars, announcements, SMS, and emails to groups.",
    primaryButton: "New Broadcast",
    kpis: [
      { label: "Active Notices", value: "8", color: "border-l-emerald-500" },
      { label: "SMS Sent (MTD)", value: "45k", color: "border-l-indigo-500" }
    ],
    columns: ["Title", "Channel", "Target Audience", "Published By", "Date", "Status"],
    data: [
      ["Fall 2026 Registration Open", "Email, Portal", "All Students", "Registrar", "2026-08-10", "Published"],
      ["Server Maintenance", "SMS, Portal", "All Users", "IT Division", "2026-08-11", "Draft"],
      ["Faculty Meeting", "Email", "Faculty of Science", "Dean", "2026-08-09", "Published"]
    ]
  },

  // Meetings & Committees
  "meeting-management": {
    title: "Meeting Management",
    description: "Schedule official meetings, distribute agendas, and log minutes.",
    primaryButton: "Schedule Meeting",
    kpis: [
      { label: "Upcoming Meetings", value: "12", color: "border-l-amber-500" },
      { label: "Pending Minutes", value: "3", color: "border-l-rose-500" }
    ],
    columns: ["Meeting Title", "Date & Time", "Location/Link", "Organizer", "Status"],
    data: [
      ["Academic Council Q3", "2026-08-15 10:00 AM", "Board Room", "Vice Chancellor", "Scheduled"],
      ["IT Procurement Review", "2026-08-12 02:00 PM", "Meeting Room B", "Director IT", "Scheduled"],
      ["Disciplinary Hearing", "2026-08-10 11:00 AM", "Room 401", "Registrar", "Awaiting Minutes"]
    ]
  },
  "committee-management": {
    title: "Committee Management",
    description: "Manage committee members, tenures, and decision logs.",
    primaryButton: "Form Committee",
    kpis: [
      { label: "Active Committees", value: "24", color: "border-l-indigo-500" },
      { label: "Expiring Tenures", value: "5", color: "border-l-amber-500" }
    ],
    columns: ["Committee Name", "Type", "Chairperson", "Members", "Tenure Ends", "Status"],
    data: [
      ["Tender Evaluation Comm.", "Ad-hoc", "Director Finance", "5", "2026-12-31", "Active"],
      ["Academic Routine Comm.", "Standing", "Registrar", "8", "2027-06-30", "Active"],
      ["Convocation Prep Comm.", "Ad-hoc", "Pro-VC", "12", "2026-09-30", "Active"]
    ]
  },

  // Facilities & Assets
  "facility-resource": {
    title: "Facility & Resource Admin",
    description: "Manage buildings, rooms, labs, and resource bookings.",
    primaryButton: "Add Resource",
    kpis: [
      { label: "Total Rooms/Labs", value: "340", color: "border-l-indigo-500" },
      { label: "Current Bookings", value: "18", color: "border-l-amber-500" }
    ],
    columns: ["Resource Name", "Type", "Building", "Capacity", "Status"],
    data: [
      ["Auditorium 1", "Hall", "Main Block", "500", "Available"],
      ["Computer Lab A", "Lab", "IT Building", "60", "In Use"],
      ["Meeting Room C", "Room", "Admin Block", "15", "Booked (10 AM - 12 PM)"]
    ]
  },
  "asset-administration": {
    title: "Asset Administration",
    description: "Track the asset registry, allocations, and maintenance schedules.",
    primaryButton: "Register Asset",
    kpis: [
      { label: "Total Assets Value", value: "৳ 45.2Cr", color: "border-l-emerald-500" },
      { label: "Needs Maintenance", value: "34", color: "border-l-rose-500" }
    ],
    columns: ["Asset ID", "Asset Name", "Category", "Assigned To / Location", "Condition", "Status"],
    data: [
      ["AST-IT-1024", "Dell PowerEdge Server", "IT Equipment", "Data Center", "Good", "Active"],
      ["AST-VEH-012", "University Bus (Dhaka Metro-B-11)", "Vehicle", "Transport Pool", "Needs Repair", "Maintenance"],
      ["AST-FUR-5011", "Executive Desk", "Furniture", "VC Office", "Excellent", "Allocated"]
    ]
  },
  "procurement": {
    title: "Procurement Administration",
    description: "Manage purchase requests, vendors, and purchase orders.",
    primaryButton: "New PO",
    kpis: [
      { label: "Pending PRs", value: "18", color: "border-l-amber-500" },
      { label: "Active Vendors", value: "124", color: "border-l-indigo-500" }
    ],
    columns: ["PO Number", "Request Title", "Vendor", "Amount", "Expected Delivery", "Status"],
    data: [
      ["PO-2026-089", "Lab Computers (x40)", "TechCorp Ltd", "৳ 2,400,000", "2026-08-20", "Approved"],
      ["PO-2026-090", "Library Books", "Oxford Pub.", "৳ 150,000", "2026-08-15", "Delivered"],
      ["PR-2026-112", "Office Stationery", "Pending Select", "৳ 45,000", "-", "Pending Approval"]
    ]
  },

  // Settings & System
  "service-request": {
    title: "Service Request Management",
    description: "Central helpdesk for IT, facility, and administrative tickets.",
    primaryButton: "View Tickets",
    kpis: [
      { label: "Open Tickets", value: "86", color: "border-l-rose-500" },
      { label: "Avg Resolution Time", value: "4.5 Hrs", color: "border-l-emerald-500" }
    ],
    columns: ["Ticket ID", "Requester", "Category", "Priority", "Assigned To", "Status"],
    data: [
      ["TKT-9012", "Afnan Mahmud", "IT / WiFi", "High", "Network Team", "Open"],
      ["TKT-9013", "Dr. Kamal", "Facility / AC Repair", "Medium", "Maintenance Dept", "In Progress"],
      ["TKT-9005", "Sabrina Akter", "Admin / ID Card", "Low", "Registrar Office", "Resolved"]
    ]
  },
  "policy-configuration": {
    title: "Policy & Configuration",
    description: "Define global rules, numbering formats, and system variables.",
    primaryButton: "Add Policy",
    kpis: [
      { label: "Active Policies", value: "145", color: "border-l-indigo-500" }
    ],
    columns: ["Config Key", "Category", "Description", "Last Updated", "Status"],
    data: [
      ["FEE_LATE_FINE", "Finance Rules", "Standard late fee fine amount", "2026-01-01", "Active"],
      ["ID_FORMAT_STU", "Numbering", "Student ID generation format", "2024-05-12", "Active"],
      ["MAX_CREDIT_LIMIT", "Academic Rules", "Max credits a student can take", "2025-08-20", "Active"]
    ]
  },
  "compliance-audit": {
    title: "Compliance & Audit",
    description: "Monitor system access logs, data changes, and compliance rules.",
    primaryButton: "Export Audit Log",
    kpis: [
      { label: "Critical Flags", value: "2", color: "border-l-rose-500" },
      { label: "Total Logs (24h)", value: "124.5k", color: "border-l-indigo-500" }
    ],
    columns: ["Log ID", "Timestamp", "User", "Action", "IP Address", "Severity"],
    data: [
      ["LOG-9921", "10 mins ago", "admin_shafiq", "Modified Grade (CSE301)", "192.168.1.45", "High"],
      ["LOG-9920", "15 mins ago", "std_afnan", "Failed Login Attempt (x3)", "103.11.22.44", "Medium"],
      ["LOG-9919", "1 hour ago", "sys_cron", "Database Backup Successful", "127.0.0.1", "Info"]
    ]
  },
  "security-administration": {
    title: "Security Administration",
    description: "Configure MFA, session timeouts, and IP whitelisting.",
    primaryButton: "Security Settings",
    kpis: [
      { label: "MFA Adoption", value: "98%", color: "border-l-emerald-500" },
      { label: "Blocked IPs", value: "412", color: "border-l-rose-500" }
    ],
    columns: ["Policy Name", "Target Role", "Condition", "Action", "Status"],
    data: [
      ["Require MFA", "Super Admin, Admin", "Always", "Enforce", "Active"],
      ["Session Timeout", "All Users", "Idle > 30 mins", "Logout", "Active"],
      ["Block Geo-IP", "All Users", "Outside BD/USA", "Block Access", "Disabled"]
    ]
  },
  "notification-configuration": {
    title: "Notification Configuration",
    description: "Manage Email/SMS templates and automated trigger rules.",
    primaryButton: "Create Template",
    kpis: [
      { label: "Active Triggers", value: "45", color: "border-l-indigo-500" }
    ],
    columns: ["Template Name", "Channel", "Trigger Event", "Success Rate", "Status"],
    data: [
      ["Fee Payment Success", "Email, SMS", "Payment Received", "99.9%", "Active"],
      ["Result Published", "Push, Email", "Result Approved", "98.5%", "Active"],
      ["OTP Verification", "SMS", "Login / Action", "99.1%", "Active"]
    ]
  },
  "reporting": {
    title: "Administrative Reporting",
    description: "Generate global operational, compliance, and user reports.",
    primaryButton: "Create Report",
    kpis: [
      { label: "Scheduled Reports", value: "12", color: "border-l-emerald-500" }
    ],
    columns: ["Report Name", "Category", "Frequency", "Last Run", "Next Run"],
    data: [
      ["Daily Server Health", "Operational", "Daily (Midnight)", "Today 00:00", "Tomorrow 00:00"],
      ["Monthly Audit Log", "Compliance", "Monthly (1st)", "Aug 1, 2026", "Sep 1, 2026"],
      ["Active Users Sync", "User Reports", "Weekly (Sunday)", "Aug 9, 2026", "Aug 16, 2026"]
    ]
  }
};
