import { ModuleConfig } from "@/components/shared/GenericModuleView";

export const studentConfigs: Record<string, ModuleConfig> = {
  // Identity & Profile
  "identity": {
    title: "Student Identity & IDs",
    description: "Manage student ID cards, RFID tags, and biometric data.",
    primaryButton: "Print ID Cards",
    kpis: [
      { label: "Active IDs", value: "12,450", color: "border-l-indigo-500" },
      { label: "Pending Print", value: "124", color: "border-l-amber-500" },
      { label: "Lost/Reissued", value: "45", color: "border-l-rose-500" }
    ],
    columns: ["Student ID", "Name", "Card Type", "RFID Tag", "Status"],
    data: [
      ["191-15-12345", "Afnan Mahmud", "Smart Card (NFC)", "E280689", "Active"],
      ["192-15-67890", "Sabrina Akter", "Smart Card (NFC)", "E280690", "Pending Print"],
      ["201-15-54321", "Imran Hossain", "Standard ID", "E280691", "Blocked (Lost)"]
    ]
  },
  "personal-info": {
    title: "Personal Information",
    description: "Update and verify student demographic and personal data.",
    primaryButton: "Request Update",
    kpis: [
      { label: "Profiles Updated", value: "89%", color: "border-l-emerald-500" },
      { label: "Pending Verification", value: "15", color: "border-l-amber-500" }
    ],
    columns: ["Student ID", "Name", "DOB", "Blood Group", "Nationality", "Verification"],
    data: [
      ["191-15-12345", "Afnan Mahmud", "1998-05-14", "O+", "Bangladeshi", "Verified"],
      ["192-15-67890", "Sabrina Akter", "1999-11-22", "A+", "Bangladeshi", "Pending"],
      ["201-15-54321", "John Smith", "2000-01-10", "B-", "American", "Verified"]
    ]
  },
  "family": {
    title: "Family & Guardian",
    description: "Manage guardian portals, contact info, and relationships.",
    primaryButton: "Link Guardian",
    kpis: [
      { label: "Linked Guardians", value: "11,200", color: "border-l-indigo-500" },
      { label: "Active Portals", value: "5,430", color: "border-l-emerald-500" }
    ],
    columns: ["Student", "Guardian Name", "Relation", "Contact", "Portal Access"],
    data: [
      ["Afnan Mahmud", "Mohammad Mahmud", "Father", "+8801711...", "Active"],
      ["Sabrina Akter", "Rokeya Begum", "Mother", "+8801911...", "Inactive"],
      ["Imran Hossain", "Kamal Hossain", "Uncle", "+8801811...", "Active"]
    ]
  },
  "emergency": {
    title: "Emergency Contact",
    description: "Critical medical and emergency contact information.",
    primaryButton: "Export Emergency List",
    kpis: [
      { label: "Missing Contacts", value: "45", color: "border-l-rose-500" },
      { label: "Medical Alerts", value: "12", color: "border-l-amber-500" }
    ],
    columns: ["Student ID", "Name", "Emergency Contact", "Relation", "Phone", "Medical Alert"],
    data: [
      ["191-15-12345", "Afnan Mahmud", "Mohammad Mahmud", "Father", "017...", "Asthma"],
      ["192-15-67890", "Sabrina Akter", "Rokeya Begum", "Mother", "019...", "None"],
      ["201-15-54321", "Imran Hossain", "Kamal Hossain", "Uncle", "018...", "Peanut Allergy"]
    ]
  },
  "academic-profile": {
    title: "Academic Profile",
    description: "Previous education history and qualification verification.",
    primaryButton: "Verify Certificates",
    kpis: [
      { label: "HSC/A-Level Verified", value: "98%", color: "border-l-emerald-500" },
      { label: "Pending Board Verify", value: "245", color: "border-l-amber-500" }
    ],
    columns: ["Student", "Previous Degree", "Board/University", "Passing Year", "GPA/Result", "Verification"],
    data: [
      ["Afnan Mahmud", "HSC (Science)", "Dhaka Board", "2018", "5.00", "Verified"],
      ["Sabrina Akter", "A-Levels", "Edexcel", "2019", "3A*", "Pending"],
      ["Imran Hossain", "Diploma in Eng.", "BTEB", "2020", "3.85", "Verified"]
    ]
  },
  "program": {
    title: "Program & Batch",
    description: "Assign and track students by department, program, and batch.",
    primaryButton: "Change Program",
    secondaryButton: "Batch Transfer",
    kpis: [
      { label: "Total Programs", value: "24", color: "border-l-indigo-500" },
      { label: "Active Batches", value: "142", color: "border-l-emerald-500" }
    ],
    columns: ["Student ID", "Name", "Department", "Program", "Batch", "Section"],
    data: [
      ["191-15-12345", "Afnan Mahmud", "CSE", "BSc in CSE", "Fall 2019", "A"],
      ["192-15-67890", "Sabrina Akter", "Business", "BBA", "Spring 2020", "B"],
      ["201-15-54321", "Imran Hossain", "Law", "LLB", "Fall 2020", "A"]
    ]
  },
  "status": {
    title: "Student Status",
    description: "Manage active, inactive, suspended, and graduated statuses.",
    primaryButton: "Update Status",
    kpis: [
      { label: "Active Students", value: "12,450", color: "border-l-emerald-500" },
      { label: "Suspended", value: "14", color: "border-l-rose-500" },
      { label: "Dropouts", value: "85", color: "border-l-amber-500" }
    ],
    columns: ["Student ID", "Name", "Current Status", "Reason", "Date Changed"],
    data: [
      ["191-15-12345", "Afnan Mahmud", "Active", "Registered for Fall", "2026-08-01"],
      ["192-15-67890", "Sabrina Akter", "Suspended", "Disciplinary Action", "2026-07-15"],
      ["201-15-54321", "Imran Hossain", "Inactive (Drop)", "Financial Issues", "2026-05-20"]
    ]
  },

  // Academics & Progress
  "admission": {
    title: "Admission History",
    description: "Track the entire admission lifecycle and test scores.",
    primaryButton: "View Merit List",
    kpis: [
      { label: "Fall 2026 Intakes", value: "1,240", color: "border-l-indigo-500" },
      { label: "Acceptance Rate", value: "45%", color: "border-l-emerald-500" }
    ],
    columns: ["Applicant ID", "Name", "Admission Test Score", "Interview", "Merit Position", "Status"],
    data: [
      ["APP-2026-001", "Tanvir Ahmed", "85/100", "Passed", "12", "Admitted"],
      ["APP-2026-002", "Nusrat Jahan", "78/100", "Passed", "45", "Admitted"],
      ["APP-2026-003", "Rakib Hasan", "45/100", "Failed", "-", "Rejected"]
    ]
  },
  "enrollment": {
    title: "Enrollment Management",
    description: "Semester-wise enrollment tracking and fee clearance.",
    primaryButton: "Open Enrollment",
    kpis: [
      { label: "Enrolled (Fall '26)", value: "11,500", color: "border-l-emerald-500" },
      { label: "Pending Clearance", value: "950", color: "border-l-amber-500" }
    ],
    columns: ["Student ID", "Name", "Semester", "Financial Clearance", "Advising", "Enrollment Status"],
    data: [
      ["191-15-12345", "Afnan Mahmud", "Fall 2026", "Cleared", "Completed", "Enrolled"],
      ["192-15-67890", "Sabrina Akter", "Fall 2026", "Pending (৳ 15,000)", "Completed", "Pending"],
      ["201-15-54321", "Imran Hossain", "Fall 2026", "Cleared", "Pending", "Pending"]
    ]
  },
  "registration": {
    title: "Course Registration",
    description: "Course advising, add/drop, and section allocations.",
    primaryButton: "Allow Add/Drop",
    kpis: [
      { label: "Registered Students", value: "11,200", color: "border-l-indigo-500" },
      { label: "Avg Credits/Student", value: "13.5", color: "border-l-emerald-500" }
    ],
    columns: ["Student", "Total Credits", "Courses", "Advisor Approval", "Status"],
    data: [
      ["Afnan Mahmud", "15", "CSE301, CSE302, MTH201...", "Approved", "Registered"],
      ["Sabrina Akter", "12", "MGT201, ACC101, ENG101...", "Approved", "Registered"],
      ["Imran Hossain", "18", "LAW301, LAW302, LAW303...", "Pending", "Draft"]
    ]
  },
  "progress": {
    title: "Academic Progress",
    description: "Credit completion tracking and degree auditing.",
    primaryButton: "Run Degree Audit",
    kpis: [
      { label: "On Track", value: "85%", color: "border-l-emerald-500" },
      { label: "At Risk (Probation)", value: "5%", color: "border-l-rose-500" }
    ],
    columns: ["Student", "Program", "Credits Completed", "Credits Required", "CGPA", "Status"],
    data: [
      ["Afnan Mahmud", "BSc CSE", "105", "144", "3.85", "On Track"],
      ["Sabrina Akter", "BBA", "45", "130", "2.10", "Probation"],
      ["Imran Hossain", "LLB", "120", "135", "3.45", "Nearing Graduation"]
    ]
  },
  "attendance": {
    title: "Student Attendance",
    description: "Monitor daily attendance, absences, and warning letters.",
    primaryButton: "Send Warnings",
    kpis: [
      { label: "Avg Campus Attendance", value: "82%", color: "border-l-emerald-500" },
      { label: "Below 60% (At Risk)", value: "450", color: "border-l-rose-500" }
    ],
    columns: ["Student", "Course", "Total Classes", "Attended", "Percentage", "Status"],
    data: [
      ["Afnan Mahmud", "CSE301", "24", "22", "91%", "Good"],
      ["Sabrina Akter", "MGT201", "24", "12", "50%", "Warning Sent"],
      ["Imran Hossain", "LAW301", "24", "20", "83%", "Good"]
    ]
  },
  "examination": {
    title: "Examination",
    description: "Exam schedules, admit cards, and seat plans.",
    primaryButton: "Generate Seat Plan",
    secondaryButton: "Issue Admit Cards",
    kpis: [
      { label: "Upcoming Exams", value: "14", color: "border-l-indigo-500" },
      { label: "Admit Cards Issued", value: "11,200", color: "border-l-emerald-500" }
    ],
    columns: ["Course", "Exam Type", "Date", "Time", "Room", "Invigilator"],
    data: [
      ["CSE301", "Midterm", "2026-10-15", "10:00 AM", "Room 401", "Dr. Kamal"],
      ["MGT201", "Midterm", "2026-10-16", "02:00 PM", "Room 302", "Prof. Anis"],
      ["LAW301", "Final", "2026-12-10", "10:00 AM", "Hall A", "Ms. Salma"]
    ]
  },
  "results": {
    title: "Results & GPA/CGPA",
    description: "Publish grades, handle re-evaluations, and calculate CGPA.",
    primaryButton: "Publish Results",
    kpis: [
      { label: "Avg University CGPA", value: "3.24", color: "border-l-indigo-500" },
      { label: "Dean's List", value: "850", color: "border-l-emerald-500" }
    ],
    columns: ["Student", "Semester", "SGPA", "CGPA", "Credits Earned", "Status"],
    data: [
      ["Afnan Mahmud", "Spring 2026", "3.90", "3.85", "15", "Dean's List"],
      ["Sabrina Akter", "Spring 2026", "2.00", "2.10", "9", "Passed"],
      ["Imran Hossain", "Spring 2026", "3.50", "3.45", "18", "Passed"]
    ]
  },
  "transcript": {
    title: "Transcript Generation",
    description: "Generate official and unofficial academic transcripts.",
    primaryButton: "Generate Bulk",
    kpis: [
      { label: "Requests Today", value: "45", color: "border-l-amber-500" },
      { label: "Printed (YTD)", value: "1,240", color: "border-l-indigo-500" }
    ],
    columns: ["Request ID", "Student", "Type", "Purpose", "Payment", "Status"],
    data: [
      ["TRN-101", "Afnan Mahmud", "Official", "Higher Study", "Paid", "Ready for Pickup"],
      ["TRN-102", "Sabrina Akter", "Unofficial", "Internship", "Free", "Emailed"],
      ["TRN-103", "Imran Hossain", "Official", "Job App", "Pending", "Processing"]
    ]
  },

  // Finance & Docs
  "finance": {
    title: "Student Finance",
    description: "Quick view of student financial standing (redirects to main Finance for deep dives).",
    primaryButton: "Go to Finance Hub",
    kpis: [],
    columns: ["Student", "Total Billed", "Total Paid", "Due", "Clearance Status"],
    data: [
      ["Afnan Mahmud", "৳ 350,000", "৳ 350,000", "৳ 0", "Cleared"],
      ["Sabrina Akter", "৳ 420,000", "৳ 380,000", "৳ 40,000", "Uncleared"]
    ]
  },
  "scholarships": {
    title: "Scholarship & Waiver",
    description: "Manage student waivers (Integrated with Finance Module).",
    primaryButton: "View in Finance",
    kpis: [],
    columns: ["Student", "Waiver Type", "Percentage", "Active Semester"],
    data: [
      ["Afnan Mahmud", "Merit (GPA 5.0)", "50%", "All"],
      ["Nusrat Jahan", "Freedom Fighter", "100%", "All"]
    ]
  },
  "documents": {
    title: "Document Vault",
    description: "Secure storage for student NID, birth certificates, and past transcripts.",
    primaryButton: "Upload Document",
    kpis: [
      { label: "Total Documents", value: "45,200", color: "border-l-indigo-500" },
      { label: "Storage Used", value: "124 GB", color: "border-l-emerald-500" }
    ],
    columns: ["Student", "Document Type", "File Size", "Uploaded Date", "Verified By"],
    data: [
      ["Afnan Mahmud", "HSC Certificate.pdf", "1.2 MB", "2019-08-10", "Admin"],
      ["Sabrina Akter", "NID_Scan.jpg", "2.4 MB", "2020-01-15", "Admin"],
      ["Imran Hossain", "Photo_Passport.png", "500 KB", "2020-08-10", "Admin"]
    ]
  },
  "certificates": {
    title: "Certificates",
    description: "Issue provisional, character, and migration certificates.",
    primaryButton: "Issue Certificate",
    kpis: [
      { label: "Pending Requests", value: "18", color: "border-l-amber-500" },
      { label: "Issued Today", value: "5", color: "border-l-emerald-500" }
    ],
    columns: ["Student", "Certificate Type", "Request Date", "Issue Date", "Status"],
    data: [
      ["Afnan Mahmud", "Provisional Certificate", "2026-08-10", "-", "Processing"],
      ["Sabrina Akter", "Character Certificate", "2026-08-09", "2026-08-10", "Issued"],
      ["Imran Hossain", "Migration Certificate", "2026-08-05", "2026-08-07", "Issued"]
    ]
  },

  // Student Affairs
  "requests": {
    title: "Student Requests",
    description: "Handle general applications (e.g. section change, makeup exam).",
    primaryButton: "Review Pending",
    kpis: [
      { label: "New Requests", value: "32", color: "border-l-indigo-500" },
      { label: "Avg Resolution Time", value: "2.4 Days", color: "border-l-emerald-500" }
    ],
    columns: ["Req ID", "Student", "Category", "Date", "Status"],
    data: [
      ["REQ-001", "Afnan Mahmud", "Makeup Exam", "2026-08-10", "Pending Dean Approval"],
      ["REQ-002", "Sabrina Akter", "Section Change", "2026-08-11", "Approved"],
      ["REQ-003", "Imran Hossain", "Credit Transfer", "2026-08-01", "In Review"]
    ]
  },
  "complaints": {
    title: "Complaints & Support",
    description: "Confidential grievance redressal and support tickets.",
    primaryButton: "Open Tickets",
    kpis: [
      { label: "Active Tickets", value: "8", color: "border-l-rose-500" },
      { label: "Resolved (This Month)", value: "45", color: "border-l-emerald-500" }
    ],
    columns: ["Ticket ID", "Category", "Priority", "Assigned To", "Status"],
    data: [
      ["TKT-991", "Facility (AC broken)", "High", "Maintenance", "Open"],
      ["TKT-992", "Academic Grievance", "Critical", "Proctor", "Investigating"],
      ["TKT-993", "IT Issue (WiFi)", "Low", "IT Admin", "Resolved"]
    ]
  },
  "disciplinary": {
    title: "Disciplinary Records",
    description: "Track proctorial actions, show-cause notices, and suspensions.",
    primaryButton: "Issue Notice",
    kpis: [
      { label: "Active Cases", value: "4", color: "border-l-rose-500" },
      { label: "Hearings Scheduled", value: "2", color: "border-l-amber-500" }
    ],
    columns: ["Case ID", "Student", "Offense Type", "Date of Incident", "Action Taken"],
    data: [
      ["DIS-26-01", "Sabrina Akter", "Plagiarism", "2026-07-10", "Course F, Warning"],
      ["DIS-26-02", "Unknown (ID: 195...)", "Vandalism", "2026-08-05", "Pending Hearing"]
    ]
  },
  "leave": {
    title: "Leave / Absence",
    description: "Manage medical leaves and authorized long-term absences.",
    primaryButton: "Approve Leaves",
    kpis: [
      { label: "Pending Approval", value: "12", color: "border-l-amber-500" },
      { label: "Currently on Leave", value: "45", color: "border-l-indigo-500" }
    ],
    columns: ["Student", "Leave Type", "Start Date", "End Date", "Documents", "Status"],
    data: [
      ["Afnan Mahmud", "Medical (Dengue)", "2026-08-01", "2026-08-15", "Medical Cert. Attached", "Approved"],
      ["Imran Hossain", "Personal", "2026-08-10", "2026-08-12", "None", "Pending"]
    ]
  },

  // Facilities
  "library": {
    title: "Library Access",
    description: "View student library fines and borrowing history.",
    primaryButton: "Clear Dues",
    kpis: [],
    columns: ["Student", "Books Borrowed", "Overdue Books", "Fine Due", "Status"],
    data: [
      ["Afnan Mahmud", "2", "0", "৳ 0", "Clear"],
      ["Sabrina Akter", "4", "1", "৳ 150", "Blocked until Paid"]
    ]
  },
  "hostel": {
    title: "Hostel Allocation",
    description: "Manage student dorms, room allocation, and hostel fees.",
    primaryButton: "Allocate Room",
    kpis: [
      { label: "Occupancy Rate", value: "92%", color: "border-l-emerald-500" },
      { label: "Available Beds", value: "45", color: "border-l-indigo-500" }
    ],
    columns: ["Student", "Building", "Room No", "Bed", "Fee Status"],
    data: [
      ["Imran Hossain", "South Hall", "304", "B", "Paid"],
      ["Rakib Hasan", "South Hall", "304", "A", "Due"]
    ]
  },
  "transport": {
    title: "Transport",
    description: "Manage bus routes, passes, and transport fees.",
    primaryButton: "Issue Pass",
    kpis: [
      { label: "Active Passes", value: "2,450", color: "border-l-indigo-500" }
    ],
    columns: ["Student", "Route", "Bus No", "Pass Validity", "Status"],
    data: [
      ["Afnan Mahmud", "Mirpur Route", "B-12", "Fall 2026", "Active"],
      ["Sabrina Akter", "Uttara Route", "B-05", "Fall 2026", "Active"]
    ]
  },
  "clubs": {
    title: "Clubs & Activities",
    description: "Track student extracurricular involvement and leadership.",
    primaryButton: "Add Activity",
    kpis: [
      { label: "Active Clubs", value: "24", color: "border-l-indigo-500" },
      { label: "Total Members", value: "3,200", color: "border-l-emerald-500" }
    ],
    columns: ["Club Name", "President", "Members", "Next Event", "Status"],
    data: [
      ["Computer Club", "Afnan Mahmud", "450", "Hackathon 2026", "Active"],
      ["Debate Society", "Nusrat Jahan", "120", "Inter-Uni Debate", "Active"]
    ]
  },

  // Portals & Comms
  "communication": {
    title: "Communication",
    description: "Send bulk SMS, emails, and push notifications to students.",
    primaryButton: "New Broadcast",
    kpis: [
      { label: "Messages Sent (Month)", value: "45,200", color: "border-l-indigo-500" },
      { label: "Delivery Rate", value: "99.2%", color: "border-l-emerald-500" }
    ],
    columns: ["Campaign", "Target Audience", "Channel", "Sent Date", "Status"],
    data: [
      ["Fall 2026 Reg Deadline", "All Active Students", "SMS & Email", "2026-08-10", "Delivered"],
      ["Hostel Fee Reminder", "Hostel Residents", "SMS", "2026-08-05", "Delivered"]
    ]
  },
  "student-portal": {
    title: "Student Portal Settings",
    description: "Configure portal features, maintenance modes, and access.",
    primaryButton: "Portal Settings",
    kpis: [
      { label: "Active Sessions", value: "1,204", color: "border-l-emerald-500" }
    ],
    columns: ["Feature", "Status", "Last Updated", "Updated By"],
    data: [
      ["Course Registration Module", "Enabled", "2026-08-01", "Admin"],
      ["Result Publishing", "Disabled", "2026-06-15", "Admin"],
      ["Payment Gateway Integration", "Enabled", "2025-01-10", "System"]
    ]
  },
  "guardian-portal": {
    title: "Guardian Portal Settings",
    description: "Configure guardian access to results, attendance, and finance.",
    primaryButton: "Portal Settings",
    kpis: [],
    columns: ["Feature", "Visibility", "Status"],
    data: [
      ["Student Attendance", "Visible", "Enabled"],
      ["Financial Statements", "Visible", "Enabled"],
      ["Disciplinary Records", "Hidden", "Disabled"]
    ]
  },

  // Graduation
  "graduation": {
    title: "Graduation",
    description: "Convocation planning, degree awards, and final clearance.",
    primaryButton: "Convocation Setup",
    kpis: [
      { label: "Eligible Graduates", value: "1,450", color: "border-l-indigo-500" },
      { label: "Cleared", value: "1,200", color: "border-l-emerald-500" }
    ],
    columns: ["Student", "Program", "CGPA", "Clearance Status", "Degree Awarded"],
    data: [
      ["Afnan Mahmud", "BSc CSE", "3.85", "Cleared", "Pending Convocation"],
      ["Imran Hossain", "LLB", "3.45", "Pending Library", "Pending Convocation"]
    ]
  },
  "alumni": {
    title: "Alumni Transition",
    description: "Transfer graduated students to the Alumni network.",
    primaryButton: "Migrate to Alumni DB",
    kpis: [
      { label: "Total Alumni", value: "24,500", color: "border-l-indigo-500" }
    ],
    columns: ["Alumni Name", "Graduation Year", "Current Employer", "Email", "Status"],
    data: [
      ["Rahim Islam", "2020", "Google", "rahim@example.com", "Active Member"],
      ["Sadia Zaman", "2021", "Grameenphone", "sadia@example.com", "Active Member"]
    ]
  }
};
