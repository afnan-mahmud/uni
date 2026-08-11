import { ModuleConfig } from "@/components/shared/GenericModuleView";
import { isAdminLike, isFinance, isManagement, isStudent, isGuardian } from "@/lib/demoAuth";
import { CURRENT_STUDENT } from "@/lib/demoData";

const S = CURRENT_STUDENT;
const isSelfService = () => isStudent() || isGuardian();
const isAdminView = () => isAdminLike() || isFinance() || isManagement();

export function getStudentConfig(module: string): ModuleConfig | undefined {
  switch (module) {
    // ---------- Identity & Profile ----------
    case "identity":
      return isSelfService()
        ? {
            title: "My Identity & IDs",
            description: "Your student ID card, RFID tag, and biometric information.",
            primaryButton: "Download ID Card",
            kpis: [
              { label: "Card Status", value: "Active", color: "border-l-emerald-500" },
              { label: "RFID Tag", value: "E280689", color: "border-l-indigo-500" },
            ],
            columns: ["Document", "Number/ID", "Issue Date", "Expiry", "Status"],
            data: [
              ["Student Smart Card", S.studentId, "2019-09-01", "2027-09-01", "Active"],
              ["Library Card", "LIB-" + S.studentId, "2019-09-01", "2027-09-01", "Active"],
              ["Transport Pass", "TP-B12-F26", "2026-09-01", "2026-12-30", "Active"],
            ],
          }
        : {
            title: "Student Identity & IDs",
            description: "Manage student ID cards, RFID tags, and biometric data.",
            primaryButton: "Print ID Cards",
            kpis: [
              { label: "Active IDs", value: "12,450", color: "border-l-indigo-500" },
              { label: "Pending Print", value: "124", color: "border-l-amber-500" },
              { label: "Lost/Reissued", value: "45", color: "border-l-rose-500" },
            ],
            columns: ["Student ID", "Name", "Card Type", "RFID Tag", "Status"],
            data: [
              ["191-15-12345", "Afnan Mahmud", "Smart Card (NFC)", "E280689", "Active"],
              ["192-15-67890", "Sabrina Akter", "Smart Card (NFC)", "E280690", "Pending Print"],
              ["201-15-54321", "Imran Hossain", "Standard ID", "E280691", "Blocked (Lost)"],
            ],
          };

    case "personal-info":
      return isSelfService()
        ? {
            title: "My Personal Information",
            description: "Your demographic and contact details as stored in the university records.",
            primaryButton: "Request Update",
            kpis: [
              { label: "Verification", value: "Verified", color: "border-l-emerald-500" },
              { label: "Last Updated", value: "2026-05-12", color: "border-l-indigo-500" },
            ],
            columns: ["Field", "Value", "Status"],
            data: [
              ["Full Name", S.name, "Verified"],
              ["Date of Birth", S.dob, "Verified"],
              ["Blood Group", S.bloodGroup, "Verified"],
              ["Nationality", S.nationality, "Verified"],
              ["NID Number", S.nid, "Verified"],
              ["Phone", S.phone, "Verified"],
              ["Email", S.email, "Verified"],
              ["Present Address", S.presentAddress, "Verified"],
              ["Permanent Address", S.permanentAddress, "Verified"],
            ],
          }
        : {
            title: "Personal Information",
            description: "Update and verify student demographic and personal data.",
            primaryButton: "Request Update",
            kpis: [
              { label: "Profiles Updated", value: "89%", color: "border-l-emerald-500" },
              { label: "Pending Verification", value: "15", color: "border-l-amber-500" },
            ],
            columns: ["Student ID", "Name", "DOB", "Blood Group", "Nationality", "Verification"],
            data: [
              ["191-15-12345", "Afnan Mahmud", "1998-05-14", "O+", "Bangladeshi", "Verified"],
              ["192-15-67890", "Sabrina Akter", "1999-11-22", "A+", "Bangladeshi", "Pending"],
              ["201-15-54321", "John Smith", "2000-01-10", "B-", "American", "Verified"],
            ],
          };

    case "family":
      return isSelfService()
        ? {
            title: "My Family & Guardian",
            description: "Your guardian and family contact information.",
            primaryButton: "Update Guardian",
            kpis: [
              { label: "Guardian Linked", value: "Yes", color: "border-l-emerald-500" },
              { label: "Portal Access", value: "Active", color: "border-l-indigo-500" },
            ],
            columns: ["Relation", "Name", "Phone", "Occupation"],
            data: [
              ["Father", S.guardian.father, S.guardian.fatherPhone, S.guardian.fatherOccupation],
              ["Mother", S.guardian.mother, S.guardian.motherPhone, S.guardian.motherOccupation],
            ],
          }
        : {
            title: "Family & Guardian",
            description: "Manage guardian portals, contact info, and relationships.",
            primaryButton: "Link Guardian",
            kpis: [
              { label: "Linked Guardians", value: "11,200", color: "border-l-indigo-500" },
              { label: "Active Portals", value: "5,430", color: "border-l-emerald-500" },
            ],
            columns: ["Student", "Guardian Name", "Relation", "Contact", "Portal Access"],
            data: [
              ["Afnan Mahmud", "Mohammad Mahmud", "Father", "+8801711...", "Active"],
              ["Sabrina Akter", "Rokeya Begum", "Mother", "+8801911...", "Inactive"],
              ["Imran Hossain", "Kamal Hossain", "Uncle", "+8801811...", "Active"],
            ],
          };

    case "emergency":
      return isSelfService()
        ? {
            title: "My Emergency Contact",
            description: "Your critical medical and emergency contact information.",
            primaryButton: "Update Contact",
            kpis: [
              { label: "Medical Alert", value: S.emergency.medicalAlert, color: "border-l-emerald-500" },
              { label: "Contact Verified", value: "Yes", color: "border-l-indigo-500" },
            ],
            columns: ["Field", "Value"],
            data: [
              ["Emergency Contact Name", S.emergency.name],
              ["Relation", S.emergency.relation],
              ["Phone", S.emergency.phone],
              ["Medical Alert", S.emergency.medicalAlert],
            ],
          }
        : {
            title: "Emergency Contact",
            description: "Critical medical and emergency contact information.",
            primaryButton: "Export Emergency List",
            kpis: [
              { label: "Missing Contacts", value: "45", color: "border-l-rose-500" },
              { label: "Medical Alerts", value: "12", color: "border-l-amber-500" },
            ],
            columns: ["Student ID", "Name", "Emergency Contact", "Relation", "Phone", "Medical Alert"],
            data: [
              ["191-15-12345", "Afnan Mahmud", "Mohammad Mahmud", "Father", "017...", "Asthma"],
              ["192-15-67890", "Sabrina Akter", "Rokeya Begum", "Mother", "019...", "None"],
              ["201-15-54321", "Imran Hossain", "Kamal Hossain", "Uncle", "018...", "Peanut Allergy"],
            ],
          };

    case "academic-profile":
      return isSelfService()
        ? {
            title: "My Academic Profile",
            description: "Your previous education history and qualification verification.",
            primaryButton: "Request Verification",
            kpis: [
              { label: "HSC Verified", value: "Yes", color: "border-l-emerald-500" },
              { label: "SSC Verified", value: "Yes", color: "border-l-emerald-500" },
            ],
            columns: ["Degree", "Board/University", "Passing Year", "GPA/Result", "Verification"],
            data: S.academicHistory.map((h) => [h.degree, h.board, h.year, h.gpa, h.verified ? "Verified" : "Pending"]),
          }
        : {
            title: "Academic Profile",
            description: "Previous education history and qualification verification.",
            primaryButton: "Verify Certificates",
            kpis: [
              { label: "HSC/A-Level Verified", value: "98%", color: "border-l-emerald-500" },
              { label: "Pending Board Verify", value: "245", color: "border-l-amber-500" },
            ],
            columns: ["Student", "Previous Degree", "Board/University", "Passing Year", "GPA/Result", "Verification"],
            data: [
              ["Afnan Mahmud", "HSC (Science)", "Dhaka Board", "2018", "5.00", "Verified"],
              ["Sabrina Akter", "A-Levels", "Edexcel", "2019", "3A*", "Pending"],
              ["Imran Hossain", "Diploma in Eng.", "BTEB", "2020", "3.85", "Verified"],
            ],
          };

    case "program":
      return isSelfService()
        ? {
            title: "My Program & Batch",
            description: "Your department, program, batch, and section information.",
            primaryButton: "Request Change",
            kpis: [
              { label: "Program", value: S.program, color: "border-l-indigo-500" },
              { label: "Section", value: S.section, color: "border-l-emerald-500" },
            ],
            columns: ["Field", "Value"],
            data: [
              ["Faculty", S.faculty],
              ["Department", S.department],
              ["Program", S.program],
              ["Batch", S.batch],
              ["Section", S.section],
              ["Current Semester", `${S.semester} (${S.semesterLabel})`],
              ["Student ID", S.studentId],
            ],
          }
        : {
            title: "Program & Batch",
            description: "Assign and track students by department, program, and batch.",
            primaryButton: "Change Program",
            secondaryButton: "Batch Transfer",
            kpis: [
              { label: "Total Programs", value: "24", color: "border-l-indigo-500" },
              { label: "Active Batches", value: "142", color: "border-l-emerald-500" },
            ],
            columns: ["Student ID", "Name", "Department", "Program", "Batch", "Section"],
            data: [
              ["191-15-12345", "Afnan Mahmud", "CSE", "BSc in CSE", "Fall 2019", "A"],
              ["192-15-67890", "Sabrina Akter", "Business", "BBA", "Spring 2020", "B"],
              ["201-15-54321", "Imran Hossain", "Law", "LLB", "Fall 2020", "A"],
            ],
          };

    case "status":
      return isSelfService()
        ? {
            title: "My Student Status",
            description: "Your current enrollment status and academic standing.",
            primaryButton: "View History",
            kpis: [
              { label: "Current Status", value: S.status, color: "border-l-emerald-500" },
              { label: "Academic Standing", value: "Good Standing", color: "border-l-indigo-500" },
            ],
            columns: ["Date", "Status", "Reason/Remarks"],
            data: [
              ["2026-08-01", "Active", "Registered for Fall 2026"],
              ["2026-01-15", "Active", "Registered for Summer 2026"],
              ["2025-09-01", "Active", "Registered for Spring 2026"],
            ],
          }
        : {
            title: "Student Status",
            description: "Manage active, inactive, suspended, and graduated statuses.",
            primaryButton: "Update Status",
            kpis: [
              { label: "Active Students", value: "12,450", color: "border-l-emerald-500" },
              { label: "Suspended", value: "14", color: "border-l-rose-500" },
              { label: "Dropouts", value: "85", color: "border-l-amber-500" },
            ],
            columns: ["Student ID", "Name", "Current Status", "Reason", "Date Changed"],
            data: [
              ["191-15-12345", "Afnan Mahmud", "Active", "Registered for Fall", "2026-08-01"],
              ["192-15-67890", "Sabrina Akter", "Suspended", "Disciplinary Action", "2026-07-15"],
              ["201-15-54321", "Imran Hossain", "Inactive (Drop)", "Financial Issues", "2026-05-20"],
            ],
          };

    // ---------- Academics & Progress ----------
    case "admission":
      return isSelfService()
        ? {
            title: "My Admission History",
            description: "Your admission application and enrollment journey.",
            primaryButton: "View Details",
            kpis: [
              { label: "Admission Test", value: "Passed", color: "border-l-emerald-500" },
              { label: "Merit Position", value: "12", color: "border-l-indigo-500" },
            ],
            columns: ["Stage", "Date", "Status", "Remarks"],
            data: [
              ["Application", "2019-05-10", "Submitted", "Online application received"],
              ["Admission Test", "2019-06-15", "Passed", "Score: 85/100"],
              ["Merit List", "2019-06-25", "Selected", "Position: 12"],
              ["Document Verification", "2019-07-05", "Verified", "All documents OK"],
              ["Payment", "2019-07-10", "Paid", "Admission fee received"],
              ["Confirmation", "2019-07-15", "Confirmed", "Student ID generated"],
            ],
          }
        : {
            title: "Admission History",
            description: "Track the entire admission lifecycle and test scores.",
            primaryButton: "View Merit List",
            kpis: [
              { label: "Fall 2026 Intakes", value: "1,240", color: "border-l-indigo-500" },
              { label: "Acceptance Rate", value: "45%", color: "border-l-emerald-500" },
            ],
            columns: ["Applicant ID", "Name", "Admission Test Score", "Interview", "Merit Position", "Status"],
            data: [
              ["APP-2026-001", "Tanvir Ahmed", "85/100", "Passed", "12", "Admitted"],
              ["APP-2026-002", "Nusrat Jahan", "78/100", "Passed", "45", "Admitted"],
              ["APP-2026-003", "Rakib Hasan", "45/100", "Failed", "-", "Rejected"],
            ],
          };

    case "enrollment":
      return isSelfService()
        ? {
            title: "My Enrollment Status",
            description: "Your semester-wise enrollment and clearance status.",
            primaryButton: "View Clearance",
            kpis: [
              { label: "Fall 2026", value: "Enrolled", color: "border-l-emerald-500" },
              { label: "Financial Clearance", value: "Cleared", color: "border-l-indigo-500" },
            ],
            columns: ["Semester", "Financial Clearance", "Advising", "Enrollment Status"],
            data: [
              ["Fall 2026", "Cleared", "Completed", "Enrolled"],
              ["Summer 2026", "Cleared", "Completed", "Enrolled"],
              ["Spring 2026", "Cleared", "Completed", "Enrolled"],
            ],
          }
        : {
            title: "Enrollment Management",
            description: "Semester-wise enrollment tracking and fee clearance.",
            primaryButton: "Open Enrollment",
            kpis: [
              { label: "Enrolled (Fall '26)", value: "11,500", color: "border-l-emerald-500" },
              { label: "Pending Clearance", value: "950", color: "border-l-amber-500" },
            ],
            columns: ["Student ID", "Name", "Semester", "Financial Clearance", "Advising", "Enrollment Status"],
            data: [
              ["191-15-12345", "Afnan Mahmud", "Fall 2026", "Cleared", "Completed", "Enrolled"],
              ["192-15-67890", "Sabrina Akter", "Fall 2026", "Pending (৳ 15,000)", "Completed", "Pending"],
              ["201-15-54321", "Imran Hossain", "Fall 2026", "Cleared", "Pending", "Pending"],
            ],
          };

    case "registration":
      return isSelfService()
        ? {
            title: "My Course Registration",
            description: "Your registered courses for the current semester.",
            primaryButton: "Add/Drop Courses",
            kpis: [
              { label: "Registered Credits", value: "15", color: "border-l-indigo-500" },
              { label: "Advisor Approval", value: "Approved", color: "border-l-emerald-500" },
            ],
            columns: ["Course", "Title", "Credits", "Section", "Status"],
            data: [
              ["CSE401", "Software Engineering", "3", "B", "Registered"],
              ["CSE402", "Computer Networks", "3", "A", "Registered"],
              ["CSE403", "Machine Learning", "3", "A", "Registered"],
              ["CSE404", "Information Security", "3", "A", "Registered"],
              ["CSE405", "Capstone Design", "3", "A", "Registered"],
            ],
          }
        : {
            title: "Course Registration",
            description: "Course advising, add/drop, and section allocations.",
            primaryButton: "Allow Add/Drop",
            kpis: [
              { label: "Registered Students", value: "11,200", color: "border-l-indigo-500" },
              { label: "Avg Credits/Student", value: "13.5", color: "border-l-emerald-500" },
            ],
            columns: ["Student", "Total Credits", "Courses", "Advisor Approval", "Status"],
            data: [
              ["Afnan Mahmud", "15", "CSE401, CSE402, CSE403...", "Approved", "Registered"],
              ["Sabrina Akter", "12", "MGT201, ACC101, ENG101...", "Approved", "Registered"],
              ["Imran Hossain", "18", "LAW301, LAW302, LAW303...", "Pending", "Draft"],
            ],
          };

    case "progress":
      return isSelfService()
        ? {
            title: "My Academic Progress",
            description: "Your credit completion tracking and degree audit summary.",
            primaryButton: "Run Degree Audit",
            kpis: [
              { label: "Credits Completed", value: `${S.creditsCompleted}/${S.creditsRequired}`, color: "border-l-indigo-500" },
              { label: "Status", value: "On Track", color: "border-l-emerald-500" },
            ],
            columns: ["Requirement", "Completed", "Required", "Remaining"],
            data: [
              ["Core Courses", "72", "84", "12"],
              ["Elective Courses", "24", "36", "12"],
              ["General Education", "9", "12", "3"],
              ["Total Credits", String(S.creditsCompleted), String(S.creditsRequired), String(S.creditsRequired - S.creditsCompleted)],
            ],
          }
        : {
            title: "Academic Progress",
            description: "Credit completion tracking and degree auditing.",
            primaryButton: "Run Degree Audit",
            kpis: [
              { label: "On Track", value: "85%", color: "border-l-emerald-500" },
              { label: "At Risk (Probation)", value: "5%", color: "border-l-rose-500" },
            ],
            columns: ["Student", "Program", "Credits Completed", "Credits Required", "CGPA", "Status"],
            data: [
              ["Afnan Mahmud", "BSc CSE", "105", "144", "3.85", "On Track"],
              ["Sabrina Akter", "BBA", "45", "130", "2.10", "Probation"],
              ["Imran Hossain", "LLB", "120", "135", "3.45", "Nearing Graduation"],
            ],
          };

    case "attendance":
      return isSelfService()
        ? {
            title: "My Attendance",
            description: "Your course-wise attendance summary.",
            primaryButton: "View Detailed Report",
            kpis: [
              { label: "Average Attendance", value: `${S.attendanceAvg}%`, color: "border-l-emerald-500" },
              { label: "Total Courses", value: "5", color: "border-l-indigo-500" },
            ],
            columns: ["Course", "Total Classes", "Attended", "Percentage", "Status"],
            data: [
              ["CSE401 - Software Engineering", "24", "22", "91.7%", "Good"],
              ["CSE402 - Computer Networks", "24", "23", "95.8%", "Good"],
              ["CSE403 - Machine Learning", "24", "21", "87.5%", "Good"],
              ["CSE404 - Information Security", "24", "22", "91.7%", "Good"],
              ["CSE405 - Capstone Design", "24", "24", "100%", "Excellent"],
            ],
          }
        : {
            title: "Student Attendance",
            description: "Monitor daily attendance, absences, and warning letters.",
            primaryButton: "Send Warnings",
            kpis: [
              { label: "Avg Campus Attendance", value: "82%", color: "border-l-emerald-500" },
              { label: "Below 60% (At Risk)", value: "450", color: "border-l-rose-500" },
            ],
            columns: ["Student", "Course", "Total Classes", "Attended", "Percentage", "Status"],
            data: [
              ["Afnan Mahmud", "CSE301", "24", "22", "91%", "Good"],
              ["Sabrina Akter", "MGT201", "24", "12", "50%", "Warning Sent"],
              ["Imran Hossain", "LAW301", "24", "20", "83%", "Good"],
            ],
          };

    case "examination":
      return isSelfService()
        ? {
            title: "My Exam Schedule",
            description: "Your upcoming examinations and seat plan information.",
            primaryButton: "Download Admit Card",
            kpis: [
              { label: "Upcoming Exams", value: "4", color: "border-l-indigo-500" },
              { label: "Admit Card", value: "Issued", color: "border-l-emerald-500" },
            ],
            columns: ["Course", "Exam Type", "Date", "Time", "Room"],
            data: [
              ["CSE401", "Final", "2026-08-25", "10:00 AM", "Room 401"],
              ["CSE402", "Final", "2026-08-27", "02:00 PM", "Room 402"],
              ["CSE403", "Final", "2026-08-29", "10:00 AM", "Room 403"],
              ["CSE404", "Final", "2026-08-31", "02:00 PM", "Room 404"],
            ],
          }
        : {
            title: "Examination",
            description: "Exam schedules, admit cards, and seat plans.",
            primaryButton: "Generate Seat Plan",
            secondaryButton: "Issue Admit Cards",
            kpis: [
              { label: "Upcoming Exams", value: "14", color: "border-l-indigo-500" },
              { label: "Admit Cards Issued", value: "11,200", color: "border-l-emerald-500" },
            ],
            columns: ["Course", "Exam Type", "Date", "Time", "Room", "Invigilator"],
            data: [
              ["CSE301", "Midterm", "2026-10-15", "10:00 AM", "Room 401", "Dr. Kamal"],
              ["MGT201", "Midterm", "2026-10-16", "02:00 PM", "Room 302", "Prof. Anis"],
              ["LAW301", "Final", "2026-12-10", "10:00 AM", "Hall A", "Ms. Salma"],
            ],
          };

    case "results":
      return isSelfService()
        ? {
            title: "My Results & GPA/CGPA",
            description: "Your published grades and cumulative academic performance.",
            primaryButton: "Apply for Re-evaluation",
            kpis: [
              { label: "CGPA", value: S.cgpa.toFixed(2), color: "border-l-indigo-500" },
              { label: "Latest SGPA", value: "3.92", color: "border-l-emerald-500" },
            ],
            columns: ["Semester", "Credits Attempted", "Credits Earned", "SGPA", "CGPA", "Status"],
            data: [
              ["Summer 2026", "15", "15", "3.92", S.cgpa.toFixed(2), "Dean's List"],
              ["Spring 2026", "12", "12", "3.75", (S.cgpa - 0.01).toFixed(2), "Passed"],
              ["Fall 2025", "15", "15", "3.80", (S.cgpa - 0.03).toFixed(2), "Passed"],
              ["Summer 2025", "12", "12", "3.85", (S.cgpa - 0.05).toFixed(2), "Passed"],
            ],
          }
        : {
            title: "Results & GPA/CGPA",
            description: "Publish grades, handle re-evaluations, and calculate CGPA.",
            primaryButton: "Publish Results",
            kpis: [
              { label: "Avg University CGPA", value: "3.24", color: "border-l-indigo-500" },
              { label: "Dean's List", value: "850", color: "border-l-emerald-500" },
            ],
            columns: ["Student", "Semester", "SGPA", "CGPA", "Credits Earned", "Status"],
            data: [
              ["Afnan Mahmud", "Spring 2026", "3.90", "3.85", "15", "Dean's List"],
              ["Sabrina Akter", "Spring 2026", "2.00", "2.10", "9", "Passed"],
              ["Imran Hossain", "Spring 2026", "3.50", "3.45", "18", "Passed"],
            ],
          };

    case "transcript":
      return isSelfService()
        ? {
            title: "My Transcript Requests",
            description: "Your official and unofficial transcript request history.",
            primaryButton: "Request Transcript",
            kpis: [
              { label: "Requests", value: "2", color: "border-l-indigo-500" },
              { label: "Ready for Pickup", value: "1", color: "border-l-emerald-500" },
            ],
            columns: ["Request ID", "Type", "Purpose", "Payment", "Status"],
            data: [
              ["TRN-101", "Official", "Higher Study", "Paid", "Ready for Pickup"],
              ["TRN-102", "Unofficial", "Internship", "Free", "Emailed"],
            ],
          }
        : {
            title: "Transcript Generation",
            description: "Generate official and unofficial academic transcripts.",
            primaryButton: "Generate Bulk",
            kpis: [
              { label: "Requests Today", value: "45", color: "border-l-amber-500" },
              { label: "Printed (YTD)", value: "1,240", color: "border-l-indigo-500" },
            ],
            columns: ["Request ID", "Student", "Type", "Purpose", "Payment", "Status"],
            data: [
              ["TRN-101", "Afnan Mahmud", "Official", "Higher Study", "Paid", "Ready for Pickup"],
              ["TRN-102", "Sabrina Akter", "Unofficial", "Internship", "Free", "Emailed"],
              ["TRN-103", "Imran Hossain", "Official", "Job App", "Pending", "Processing"],
            ],
          };

    // ---------- Finance & Documents ----------
    case "finance":
      return isSelfService()
        ? {
            title: "My Finance",
            description: "Your tuition, fees, payments, and current balance.",
            primaryButton: "Make a Payment",
            kpis: [
              { label: "Total Billed", value: "৳ 350,000", color: "border-l-indigo-500" },
              { label: "Total Paid", value: "৳ 350,000", color: "border-l-emerald-500" },
              { label: "Current Due", value: "৳ 0", color: "border-l-emerald-500" },
            ],
            columns: ["Invoice", "Description", "Amount", "Paid", "Due", "Status"],
            data: [
              ["INV-1001", "Fall 2026 Tuition", "৳ 45,000", "৳ 45,000", "৳ 0", "Paid"],
              ["INV-1002", "Summer 2026 Tuition", "৳ 35,000", "৳ 35,000", "৳ 0", "Paid"],
              ["INV-1003", "Fall 2026 Exam Fee", "৳ 2,000", "৳ 2,000", "৳ 0", "Paid"],
            ],
          }
        : {
            title: "Student Finance",
            description: "Quick view of student financial standing.",
            primaryButton: "Go to Finance Hub",
            kpis: [],
            columns: ["Student", "Total Billed", "Total Paid", "Due", "Clearance Status"],
            data: [
              ["Afnan Mahmud", "৳ 350,000", "৳ 350,000", "৳ 0", "Cleared"],
              ["Sabrina Akter", "৳ 420,000", "৳ 380,000", "৳ 40,000", "Uncleared"],
            ],
          };

    case "scholarships":
      return isSelfService()
        ? {
            title: "My Scholarships & Waivers",
            description: "Your active scholarships, waivers, and discounts.",
            primaryButton: "Apply for Waiver",
            kpis: [
              { label: "Active Waiver", value: "Merit 50%", color: "border-l-emerald-500" },
              { label: "Semester Savings", value: "৳ 22,500", color: "border-l-indigo-500" },
            ],
            columns: ["Type", "Percentage", "Value/Semester", "Effective From", "Status"],
            data: [
              ["Merit (HSC GPA 5.0)", "50%", "৳ 22,500", "Fall 2019", "Active"],
            ],
          }
        : {
            title: "Scholarship & Waiver",
            description: "Manage merit-based, need-based, and special waivers.",
            primaryButton: "Allocate Waiver",
            kpis: [
              { label: "Active Scholarships", value: "845", color: "border-l-emerald-500" },
              { label: "Total Value Disbursed", value: "৳ 12.5M", color: "border-l-indigo-500" },
            ],
            columns: ["Student", "Program", "Type", "Percentage", "Value", "Status"],
            data: [
              ["Afnan Mahmud", "BSc CSE", "Merit Based (GPA 5.0)", "50%", "৳ 22,500", "Active"],
              ["Nusrat Jahan", "BBA", "Freedom Fighter Quota", "100%", "৳ 40,000", "Active"],
              ["Tariqul Islam", "LLB", "Sibling Waiver", "25%", "৳ 12,500", "Active"],
            ],
          };

    case "documents":
      return isSelfService()
        ? {
            title: "My Documents",
            description: "Your uploaded documents and verification status.",
            primaryButton: "Upload Document",
            kpis: [
              { label: "Uploaded", value: "4", color: "border-l-indigo-500" },
              { label: "Verified", value: "4", color: "border-l-emerald-500" },
            ],
            columns: ["Document Type", "File Name", "Size", "Uploaded", "Verified By"],
            data: [
              ["HSC Certificate", "HSC_Certificate.pdf", "1.2 MB", "2019-08-10", "Admin"],
              ["SSC Certificate", "SSC_Certificate.pdf", "1.1 MB", "2019-08-10", "Admin"],
              ["NID Scan", "NID_Scan.jpg", "2.4 MB", "2020-01-15", "Admin"],
              ["Passport Photo", "Photo_Passport.png", "500 KB", "2020-08-10", "Admin"],
            ],
          }
        : {
            title: "Document Vault",
            description: "Secure storage for student NID, birth certificates, and past transcripts.",
            primaryButton: "Upload Document",
            kpis: [
              { label: "Total Documents", value: "45,200", color: "border-l-indigo-500" },
              { label: "Storage Used", value: "124 GB", color: "border-l-emerald-500" },
            ],
            columns: ["Student", "Document Type", "File Size", "Uploaded Date", "Verified By"],
            data: [
              ["Afnan Mahmud", "HSC Certificate.pdf", "1.2 MB", "2019-08-10", "Admin"],
              ["Sabrina Akter", "NID_Scan.jpg", "2.4 MB", "2020-01-15", "Admin"],
              ["Imran Hossain", "Photo_Passport.png", "500 KB", "2020-08-10", "Admin"],
            ],
          };

    case "certificates":
      return isSelfService()
        ? {
            title: "My Certificates",
            description: "Your certificate requests and issuance status.",
            primaryButton: "Request Certificate",
            kpis: [
              { label: "Pending", value: "1", color: "border-l-amber-500" },
              { label: "Issued", value: "1", color: "border-l-emerald-500" },
            ],
            columns: ["Certificate Type", "Request Date", "Issue Date", "Status"],
            data: [
              ["Provisional Certificate", "2026-08-10", "-", "Processing"],
              ["Character Certificate", "2026-08-09", "2026-08-10", "Issued"],
            ],
          }
        : {
            title: "Certificates",
            description: "Issue provisional, character, and migration certificates.",
            primaryButton: "Issue Certificate",
            kpis: [
              { label: "Pending Requests", value: "18", color: "border-l-amber-500" },
              { label: "Issued Today", value: "5", color: "border-l-emerald-500" },
            ],
            columns: ["Student", "Certificate Type", "Request Date", "Issue Date", "Status"],
            data: [
              ["Afnan Mahmud", "Provisional Certificate", "2026-08-10", "-", "Processing"],
              ["Sabrina Akter", "Character Certificate", "2026-08-09", "2026-08-10", "Issued"],
              ["Imran Hossain", "Migration Certificate", "2026-08-05", "2026-08-07", "Issued"],
            ],
          };

    // ---------- Student Affairs ----------
    case "requests":
      return isSelfService()
        ? {
            title: "My Requests",
            description: "Your general applications and their approval status.",
            primaryButton: "New Request",
            kpis: [
              { label: "Pending", value: "1", color: "border-l-amber-500" },
              { label: "Resolved", value: "3", color: "border-l-emerald-500" },
            ],
            columns: ["Req ID", "Category", "Date", "Status"],
            data: [
              ["REQ-001", "Makeup Exam", "2026-08-10", "Pending Dean Approval"],
              ["REQ-002", "Section Change", "2026-07-15", "Approved"],
              ["REQ-003", "Credit Transfer", "2026-06-20", "Approved"],
            ],
          }
        : {
            title: "Student Requests",
            description: "Handle general applications (e.g. section change, makeup exam).",
            primaryButton: "Review Pending",
            kpis: [
              { label: "New Requests", value: "32", color: "border-l-indigo-500" },
              { label: "Avg Resolution Time", value: "2.4 Days", color: "border-l-emerald-500" },
            ],
            columns: ["Req ID", "Student", "Category", "Date", "Status"],
            data: [
              ["REQ-001", "Afnan Mahmud", "Makeup Exam", "2026-08-10", "Pending Dean Approval"],
              ["REQ-002", "Sabrina Akter", "Section Change", "2026-08-11", "Approved"],
              ["REQ-003", "Imran Hossain", "Credit Transfer", "2026-08-01", "In Review"],
            ],
          };

    case "complaints":
      return isSelfService()
        ? {
            title: "My Complaints & Support",
            description: "Your grievance and support ticket history.",
            primaryButton: "File a Complaint",
            kpis: [
              { label: "Open Tickets", value: "1", color: "border-l-amber-500" },
              { label: "Resolved", value: "2", color: "border-l-emerald-500" },
            ],
            columns: ["Ticket ID", "Category", "Priority", "Status"],
            data: [
              ["TKT-991", "Facility (AC broken)", "High", "Open"],
              ["TKT-992", "IT Issue (WiFi)", "Low", "Resolved"],
            ],
          }
        : {
            title: "Complaints & Support",
            description: "Confidential grievance redressal and support tickets.",
            primaryButton: "Open Tickets",
            kpis: [
              { label: "Active Tickets", value: "8", color: "border-l-rose-500" },
              { label: "Resolved (This Month)", value: "45", color: "border-l-emerald-500" },
            ],
            columns: ["Ticket ID", "Category", "Priority", "Assigned To", "Status"],
            data: [
              ["TKT-991", "Facility (AC broken)", "High", "Maintenance", "Open"],
              ["TKT-992", "Academic Grievance", "Critical", "Proctor", "Investigating"],
              ["TKT-993", "IT Issue (WiFi)", "Low", "IT Admin", "Resolved"],
            ],
          };

    case "leave":
      return isSelfService()
        ? {
            title: "My Leave Applications",
            description: "Your medical and authorized leave history.",
            primaryButton: "Apply for Leave",
            kpis: [
              { label: "Approved", value: "2", color: "border-l-emerald-500" },
              { label: "Pending", value: "0", color: "border-l-amber-500" },
            ],
            columns: ["Leave Type", "Start Date", "End Date", "Documents", "Status"],
            data: [
              ["Medical (Dengue)", "2026-08-01", "2026-08-15", "Medical Cert. Attached", "Approved"],
            ],
          }
        : {
            title: "Leave / Absence",
            description: "Manage medical leaves and authorized long-term absences.",
            primaryButton: "Approve Leaves",
            kpis: [
              { label: "Pending Approval", value: "12", color: "border-l-amber-500" },
              { label: "Currently on Leave", value: "45", color: "border-l-indigo-500" },
            ],
            columns: ["Student", "Leave Type", "Start Date", "End Date", "Documents", "Status"],
            data: [
              ["Afnan Mahmud", "Medical (Dengue)", "2026-08-01", "2026-08-15", "Medical Cert. Attached", "Approved"],
              ["Imran Hossain", "Personal", "2026-08-10", "2026-08-12", "None", "Pending"],
            ],
          };

    // ---------- Facilities ----------
    case "library":
      return isSelfService()
        ? {
            title: "My Library Status",
            description: "Your borrowing history, overdue books, and fines.",
            primaryButton: "Pay Fine",
            kpis: [
              { label: "Books Borrowed", value: String(S.library.borrowed), color: "border-l-indigo-500" },
              { label: "Fine Due", value: `৳ ${S.library.fineDue}`, color: "border-l-emerald-500" },
            ],
            columns: ["Book Title", "Borrowed Date", "Due Date", "Status"],
            data: [
              ["Introduction to Algorithms", "2026-07-15", "2026-08-15", "On Time"],
              ["Clean Code", "2026-07-20", "2026-08-20", "On Time"],
            ],
          }
        : {
            title: "Library Access",
            description: "View student library fines and borrowing history.",
            primaryButton: "Clear Dues",
            kpis: [],
            columns: ["Student", "Books Borrowed", "Overdue Books", "Fine Due", "Status"],
            data: [
              ["Afnan Mahmud", "2", "0", "৳ 0", "Clear"],
              ["Sabrina Akter", "4", "1", "৳ 150", "Blocked until Paid"],
            ],
          };

    case "hostel":
      return isSelfService()
        ? {
            title: "My Hostel Info",
            description: "Your hostel allocation and fee status.",
            primaryButton: "Request Allocation",
            kpis: [
              { label: "Allocation", value: S.hostel ? "Allocated" : "Not Allocated", color: S.hostel ? "border-l-emerald-500" : "border-l-slate-500" },
            ],
            columns: ["Field", "Value"],
            data: S.hostel
              ? [
                  ["Building", S.hostel.building],
                  ["Room No", S.hostel.roomNo],
                  ["Bed", S.hostel.bed],
                  ["Fee Status", S.hostel.feeStatus],
                ]
              : [
                  ["Building", "-"],
                  ["Room No", "-"],
                  ["Bed", "-"],
                  ["Fee Status", "-"],
                ],
            emptyMessage: "You do not currently have a hostel allocation.",
          }
        : {
            title: "Hostel Allocation",
            description: "Manage student dorms, room allocation, and hostel fees.",
            primaryButton: "Allocate Room",
            kpis: [
              { label: "Occupancy Rate", value: "92%", color: "border-l-emerald-500" },
              { label: "Available Beds", value: "45", color: "border-l-indigo-500" },
            ],
            columns: ["Student", "Building", "Room No", "Bed", "Fee Status"],
            data: [
              ["Imran Hossain", "South Hall", "304", "B", "Paid"],
              ["Rakib Hasan", "South Hall", "304", "A", "Due"],
            ],
          };

    case "transport":
      return isSelfService()
        ? {
            title: "My Transport Pass",
            description: "Your bus route, pass validity, and status.",
            primaryButton: "Renew Pass",
            kpis: [
              { label: "Route", value: S.transport.route, color: "border-l-indigo-500" },
              { label: "Status", value: S.transport.status, color: "border-l-emerald-500" },
            ],
            columns: ["Field", "Value"],
            data: [
              ["Route", S.transport.route],
              ["Bus No", S.transport.busNo],
              ["Pass Validity", S.transport.validity],
              ["Status", S.transport.status],
            ],
          }
        : {
            title: "Transport",
            description: "Manage bus routes, passes, and transport fees.",
            primaryButton: "Issue Pass",
            kpis: [
              { label: "Active Passes", value: "2,450", color: "border-l-indigo-500" },
            ],
            columns: ["Student", "Route", "Bus No", "Pass Validity", "Status"],
            data: [
              ["Afnan Mahmud", "Mirpur Route", "B-12", "Fall 2026", "Active"],
              ["Sabrina Akter", "Uttara Route", "B-05", "Fall 2026", "Active"],
            ],
          };

    case "clubs":
      return isSelfService()
        ? {
            title: "My Clubs & Activities",
            description: "Your extracurricular involvement and memberships.",
            primaryButton: "Join a Club",
            kpis: [
              { label: "Memberships", value: "2", color: "border-l-indigo-500" },
              { label: "Events This Term", value: "3", color: "border-l-emerald-500" },
            ],
            columns: ["Club", "Role", "Joined", "Next Event"],
            data: [
              ["Computer Club", "Member", "Fall 2019", "Hackathon 2026"],
              ["Debate Society", "Volunteer", "Spring 2020", "Inter-Uni Debate"],
            ],
          }
        : {
            title: "Clubs & Activities",
            description: "Track student extracurricular involvement and leadership.",
            primaryButton: "Add Activity",
            kpis: [
              { label: "Active Clubs", value: "24", color: "border-l-indigo-500" },
              { label: "Total Members", value: "3,200", color: "border-l-emerald-500" },
            ],
            columns: ["Club Name", "President", "Members", "Next Event", "Status"],
            data: [
              ["Computer Club", "Afnan Mahmud", "450", "Hackathon 2026", "Active"],
              ["Debate Society", "Nusrat Jahan", "120", "Inter-Uni Debate", "Active"],
            ],
          };

    // ---------- Portals & Comms ----------
    case "communication":
      return {
        title: "Communication",
        description: "Send bulk SMS, emails, and push notifications to students.",
        primaryButton: "New Broadcast",
        kpis: [
          { label: "Messages Sent (Month)", value: "45,200", color: "border-l-indigo-500" },
          { label: "Delivery Rate", value: "99.2%", color: "border-l-emerald-500" },
        ],
        columns: ["Campaign", "Target Audience", "Channel", "Sent Date", "Status"],
        data: [
          ["Fall 2026 Reg Deadline", "All Active Students", "SMS & Email", "2026-08-10", "Delivered"],
          ["Hostel Fee Reminder", "Hostel Residents", "SMS", "2026-08-05", "Delivered"],
        ],
      };

    case "student-portal":
      return {
        title: "Student Portal Settings",
        description: "Configure portal features, maintenance modes, and access.",
        primaryButton: "Portal Settings",
        kpis: [
          { label: "Active Sessions", value: "1,204", color: "border-l-emerald-500" },
        ],
        columns: ["Feature", "Status", "Last Updated", "Updated By"],
        data: [
          ["Course Registration Module", "Enabled", "2026-08-01", "Admin"],
          ["Result Publishing", "Disabled", "2026-06-15", "Admin"],
          ["Payment Gateway Integration", "Enabled", "2025-01-10", "System"],
        ],
      };

    case "guardian-portal":
      return {
        title: "Guardian Portal Settings",
        description: "Configure guardian access to results, attendance, and finance.",
        primaryButton: "Portal Settings",
        kpis: [],
        columns: ["Feature", "Visibility", "Status"],
        data: [
          ["Student Attendance", "Visible", "Enabled"],
          ["Financial Statements", "Visible", "Enabled"],
          ["Disciplinary Records", "Hidden", "Disabled"],
        ],
      };

    // ---------- Graduation ----------
    case "graduation":
      return isSelfService()
        ? {
            title: "My Graduation",
            description: "Your graduation eligibility and clearance status.",
            primaryButton: "View Clearance",
            kpis: [
              { label: "CGPA", value: S.cgpa.toFixed(2), color: "border-l-indigo-500" },
              { label: "Credits", value: `${S.creditsCompleted}/${S.creditsRequired}`, color: "border-l-emerald-500" },
            ],
            columns: ["Requirement", "Status", "Remarks"],
            data: [
              ["Credit Completion", S.creditsCompleted >= S.creditsRequired ? "Completed" : "In Progress", `${S.creditsRequired - S.creditsCompleted} credits remaining`],
              ["CGPA Requirement", S.cgpa >= 2.0 ? "Met" : "Not Met", `Current CGPA ${S.cgpa.toFixed(2)}`],
              ["Financial Clearance", "Cleared", "No outstanding dues"],
              ["Library Clearance", "Cleared", "No borrowed books"],
              ["Thesis/Capstone", "In Progress", "Capstone Design ongoing"],
            ],
          }
        : {
            title: "Graduation",
            description: "Convocation planning, degree awards, and final clearance.",
            primaryButton: "Convocation Setup",
            kpis: [
              { label: "Eligible Graduates", value: "1,450", color: "border-l-indigo-500" },
              { label: "Cleared", value: "1,200", color: "border-l-emerald-500" },
            ],
            columns: ["Student", "Program", "CGPA", "Clearance Status", "Degree Awarded"],
            data: [
              ["Afnan Mahmud", "BSc CSE", "3.85", "Cleared", "Pending Convocation"],
              ["Imran Hossain", "LLB", "3.45", "Pending Library", "Pending Convocation"],
            ],
          };

    case "alumni":
      return {
        title: "Alumni Transition",
        description: "Transfer graduated students to the Alumni network.",
        primaryButton: "Migrate to Alumni DB",
        kpis: [
          { label: "Total Alumni", value: "24,500", color: "border-l-indigo-500" },
        ],
        columns: ["Alumni Name", "Graduation Year", "Current Employer", "Email", "Status"],
        data: [
          ["Rahim Islam", "2020", "Google", "rahim@example.com", "Active Member"],
          ["Sadia Zaman", "2021", "Grameenphone", "sadia@example.com", "Active Member"],
        ],
      };

    default:
      return undefined;
  }
}
