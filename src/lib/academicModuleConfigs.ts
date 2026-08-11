import { ModuleConfig } from "@/components/shared/GenericModuleView";

export const academicConfigs: Record<string, ModuleConfig> = {
  // Institution & Structure
  "institution-structure": {
    title: "Academic Institution Structure",
    description: "Manage hierarchical entities: Campuses, Faculties, Schools, and Departments.",
    primaryButton: "Add Academic Unit",
    kpis: [
      { label: "Total Campuses", value: "3", color: "border-l-indigo-500" },
      { label: "Active Faculties", value: "6", color: "border-l-emerald-500" },
      { label: "Departments", value: "24", color: "border-l-amber-500" }
    ],
    columns: ["Unit Name", "Type", "Parent Unit", "Head/Dean", "Status"],
    data: [
      ["Faculty of Engineering", "Faculty", "Main Campus", "Prof. Dr. Kamal", "Active"],
      ["Dept. of CSE", "Department", "Faculty of Engineering", "Dr. Salim", "Active"],
      ["School of Business", "School", "Main Campus", "Prof. Dr. Hasan", "Active"]
    ]
  },
  "academic-year": {
    title: "Academic Year & Semester",
    description: "Configure academic calendars, terms, and registration periods.",
    primaryButton: "Create Semester",
    kpis: [
      { label: "Current Term", value: "Fall 2026", color: "border-l-emerald-500" },
      { label: "Reg. Deadline", value: "Oct 15", color: "border-l-rose-500" }
    ],
    columns: ["Semester Name", "Start Date", "End Date", "Add/Drop Deadline", "Status"],
    data: [
      ["Fall 2026", "2026-09-01", "2026-12-30", "2026-09-15", "Active"],
      ["Spring 2027", "2027-01-10", "2027-05-30", "2027-01-25", "Draft"],
      ["Spring 2026", "2026-01-10", "2026-05-30", "2026-01-25", "Completed"]
    ]
  },

  // Programs & Courses
  "program-management": {
    title: "Program Management",
    description: "Define degree programs, major/minor requirements, and graduation rules.",
    primaryButton: "Add Program",
    kpis: [
      { label: "Active Programs", value: "45", color: "border-l-indigo-500" },
      { label: "New Programs (YTD)", value: "2", color: "border-l-emerald-500" }
    ],
    columns: ["Program Code", "Program Name", "Degree Type", "Total Credits", "Department", "Status"],
    data: [
      ["BCSE", "BSc in Computer Science & Eng.", "Undergraduate", "144", "CSE", "Active"],
      ["BBA", "Bachelor of Business Admin.", "Undergraduate", "130", "Business", "Active"],
      ["MBA", "Master of Business Admin.", "Graduate", "60", "Business", "Active"]
    ]
  },
  "course-management": {
    title: "Course Management",
    description: "Manage the central course catalog, credits, and prerequisites.",
    primaryButton: "Add Course",
    kpis: [
      { label: "Total Courses", value: "1,240", color: "border-l-indigo-500" },
      { label: "Active This Term", value: "450", color: "border-l-emerald-500" }
    ],
    columns: ["Course Code", "Course Title", "Credits", "Type", "Prerequisites", "Status"],
    data: [
      ["CSE301", "Database Systems", "3.0", "Core", "CSE201", "Active"],
      ["MTH201", "Calculus II", "3.0", "Core", "MTH101", "Active"],
      ["ENG101", "English Composition", "3.0", "General Ed", "None", "Active"]
    ]
  },
  "curriculum": {
    title: "Curriculum Management",
    description: "Map courses to programs, define electives, and version control curriculums.",
    primaryButton: "New Curriculum Version",
    kpis: [
      { label: "Active Curriculums", value: "52", color: "border-l-indigo-500" },
      { label: "Under Revision", value: "4", color: "border-l-amber-500" }
    ],
    columns: ["Program", "Version", "Effective Year", "Required Credits", "Elective Credits", "Status"],
    data: [
      ["BSc in CSE", "v2024.1", "2024", "120", "24", "Active"],
      ["BSc in CSE", "v2020.1", "2020", "120", "24", "Phasing Out"],
      ["BBA", "v2026.1", "2026", "100", "30", "Draft"]
    ]
  },

  // Scheduling & Classes
  "section-management": {
    title: "Class / Section Management",
    description: "Create course sections, assign faculty, and set capacities.",
    primaryButton: "Create Section",
    kpis: [
      { label: "Total Sections", value: "850", color: "border-l-indigo-500" },
      { label: "Avg Class Size", value: "35", color: "border-l-emerald-500" }
    ],
    columns: ["Course", "Section", "Faculty", "Capacity", "Enrolled", "Status"],
    data: [
      ["CSE301", "A", "Dr. Salim", "40", "38", "Open"],
      ["CSE301", "B", "Dr. Kamal", "40", "40", "Full"],
      ["ENG101", "C", "Prof. Rahman", "35", "12", "Open"]
    ]
  },
  "class-scheduling": {
    title: "Class Scheduling",
    description: "Manage timetables, room allocation, and detect conflicts.",
    primaryButton: "Generate Timetable",
    kpis: [
      { label: "Conflicts Detected", value: "0", color: "border-l-emerald-500" },
      { label: "Room Utilization", value: "78%", color: "border-l-indigo-500" }
    ],
    columns: ["Course", "Section", "Day", "Time", "Room", "Faculty"],
    data: [
      ["CSE301", "A", "Mon/Wed", "10:00 AM - 11:30 AM", "Room 401", "Dr. Salim"],
      ["CSE301", "B", "Tue/Thu", "02:00 PM - 03:30 PM", "Room 402", "Dr. Kamal"],
      ["MTH201", "A", "Sun/Tue", "11:30 AM - 01:00 PM", "Hall C", "Dr. Anis"]
    ]
  },
  "calendar": {
    title: "Academic Calendar",
    description: "University-wide event scheduling including holidays and exams.",
    primaryButton: "Add Event",
    kpis: [
      { label: "Teaching Days", value: "90", color: "border-l-indigo-500" },
      { label: "Upcoming Holidays", value: "3", color: "border-l-amber-500" }
    ],
    columns: ["Event Name", "Category", "Start Date", "End Date", "Visibility"],
    data: [
      ["Fall 2026 Classes Begin", "Academic", "2026-09-01", "2026-09-01", "Public"],
      ["Eid-ul-Fitr Vacation", "Holiday", "2026-10-12", "2026-10-18", "Public"],
      ["Midterm Examinations", "Exam", "2026-10-20", "2026-10-30", "Public"]
    ]
  },

  // Enrollment & Advising
  "registration": {
    title: "Course Registration",
    description: "Monitor student course selection, credit limits, and add/drop.",
    primaryButton: "Open Registration",
    kpis: [
      { label: "Registered", value: "85%", color: "border-l-emerald-500" },
      { label: "Pending Approval", value: "1,240", color: "border-l-amber-500" }
    ],
    columns: ["Student", "Program", "Total Credits", "Advisor", "Registration Status"],
    data: [
      ["Afnan Mahmud", "BSc CSE", "15", "Dr. Kamal", "Approved"],
      ["Sabrina Akter", "BBA", "18", "Prof. Hasan", "Pending"],
      ["Imran Hossain", "LLB", "9", "Ms. Salma", "Draft"]
    ]
  },
  "advising": {
    title: "Academic Advising",
    description: "Assign advisors, track advising sessions, and handle interventions.",
    primaryButton: "Auto-Assign Advisors",
    kpis: [
      { label: "Students Advised", value: "92%", color: "border-l-emerald-500" },
      { label: "At-Risk Interventions", value: "45", color: "border-l-rose-500" }
    ],
    columns: ["Advisor Name", "Department", "Advisees", "Pending Approvals", "Last Session"],
    data: [
      ["Dr. Kamal", "CSE", "45", "0", "2026-08-10"],
      ["Prof. Hasan", "Business", "60", "12", "2026-08-09"],
      ["Ms. Salma", "Law", "35", "5", "2026-08-11"]
    ]
  },
  "requests": {
    title: "Academic Requests",
    description: "Manage course withdrawals, grade reviews, and program transfers.",
    primaryButton: "Review Requests",
    kpis: [
      { label: "Pending Requests", value: "34", color: "border-l-amber-500" },
      { label: "Processed Today", value: "12", color: "border-l-emerald-500" }
    ],
    columns: ["Request ID", "Student", "Type", "Submission Date", "Status"],
    data: [
      ["REQ-001", "Afnan Mahmud", "Grade Review (CSE301)", "2026-08-10", "Pending HOD"],
      ["REQ-002", "Sabrina Akter", "Course Withdrawal", "2026-08-11", "Approved"],
      ["REQ-003", "Imran Hossain", "Program Transfer", "2026-08-05", "In Review"]
    ]
  },

  // Assessment & Progress
  "attendance": {
    title: "Attendance Management",
    description: "Monitor class attendance, faculty attendance, and excused absences.",
    primaryButton: "Generate Report",
    kpis: [
      { label: "Avg Attendance", value: "88%", color: "border-l-emerald-500" },
      { label: "Low Attendance Flags", value: "124", color: "border-l-rose-500" }
    ],
    columns: ["Course", "Section", "Total Classes", "Avg Attendance", "Last Updated"],
    data: [
      ["CSE301", "A", "24", "92%", "Today 11:30 AM"],
      ["MTH201", "A", "24", "75%", "Yesterday 01:00 PM"],
      ["ENG101", "C", "24", "88%", "Today 09:00 AM"]
    ]
  },
  "assessment": {
    title: "Assessment Configuration",
    description: "Define assessment weights (Quizzes, Midterms, Assignments, Finals).",
    primaryButton: "Global Config",
    kpis: [
      { label: "Assessments Created", value: "1,450", color: "border-l-indigo-500" }
    ],
    columns: ["Course", "Section", "Assessment Component", "Weightage", "Status"],
    data: [
      ["CSE301", "A", "Midterm", "30%", "Completed"],
      ["CSE301", "A", "Final", "40%", "Pending"],
      ["CSE301", "A", "Quizzes (Best 3)", "20%", "Ongoing"]
    ]
  },
  "examination": {
    title: "Examination Management",
    description: "Manage exam schedules, seat plans, and invigilation duties.",
    primaryButton: "Generate Seat Plan",
    kpis: [
      { label: "Exams Scheduled", value: "45", color: "border-l-indigo-500" },
      { label: "Invigilators Assigned", value: "120", color: "border-l-emerald-500" }
    ],
    columns: ["Exam Title", "Date", "Time", "Courses Involved", "Rooms", "Status"],
    data: [
      ["Midterm Week 1", "2026-10-20", "10:00 AM", "CSE301, MTH201", "401, 402, C", "Scheduled"],
      ["Midterm Week 1", "2026-10-20", "02:00 PM", "BBA201, LAW101", "301, 302, A", "Scheduled"]
    ]
  },
  "progress": {
    title: "Academic Progress",
    description: "Track student credit completion, probation, and graduation eligibility.",
    primaryButton: "Run Audit",
    kpis: [
      { label: "Graduation Eligible", value: "1,240", color: "border-l-indigo-500" },
      { label: "On Probation", value: "45", color: "border-l-rose-500" }
    ],
    columns: ["Student", "Program", "Credits Earned", "Required", "CGPA", "Academic Standing"],
    data: [
      ["Afnan Mahmud", "BSc CSE", "135", "144", "3.85", "Good Standing"],
      ["Sabrina Akter", "BBA", "45", "130", "1.95", "Probation"],
      ["Imran Hossain", "LLB", "120", "135", "3.45", "Good Standing"]
    ]
  },

  // Records
  "documents": {
    title: "Academic Documents",
    description: "Issue official transcripts, grade sheets, and certificates.",
    primaryButton: "Print Queue",
    kpis: [
      { label: "Pending Prints", value: "18", color: "border-l-amber-500" },
      { label: "Issued (YTD)", value: "5,430", color: "border-l-emerald-500" }
    ],
    columns: ["Document ID", "Student", "Document Type", "Requested Date", "Status"],
    data: [
      ["DOC-1001", "Afnan Mahmud", "Official Transcript", "2026-08-10", "Ready for Pickup"],
      ["DOC-1002", "Sabrina Akter", "Grade Sheet (Spring 2026)", "2026-08-11", "Processing"],
      ["DOC-1003", "Imran Hossain", "Provisional Certificate", "2026-08-05", "Issued"]
    ]
  }
};
