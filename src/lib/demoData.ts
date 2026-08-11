import { getCurrentRole, getStoredUser, isAdminLike, isFaculty, isFinance, isGuardian, isManagement, isStudent, type DemoUser, type UserRole } from "./demoAuth";

// ------------------------------------------------------------------
// Demo personas used for the visualization build (no real backend)
// ------------------------------------------------------------------

export const CURRENT_STUDENT = {
  id: "STU2026001",
  userId: "demo-student",
  name: "Afnan Mahmud",
  email: "afnan.mahmud@northern.edu.bd",
  avatar: "https://ui-avatars.com/api/?name=Afnan+Mahmud&background=0ea5e9&color=fff&size=256",
  studentId: "191-15-12345",
  program: "BSc in Computer Science & Engineering",
  department: "Computer Science",
  faculty: "Faculty of Science & Engineering",
  batch: "Fall 2019",
  section: "A",
  semester: "Fall 2026",
  semesterLabel: "8th",
  status: "Active",
  cgpa: 3.85,
  creditsCompleted: 105,
  creditsRequired: 144,
  attendanceAvg: 92,
  financialDue: 0,
  advisor: "Dr. Kamal Uddin",
  dob: "1998-05-14",
  bloodGroup: "O+",
  nationality: "Bangladeshi",
  nid: "1234567890123",
  phone: "+8801812345678",
  presentAddress: "House 12, Road 5, Dhanmondi, Dhaka",
  permanentAddress: "House 45, College Road, Comilla",
  guardian: {
    father: "Mohammad Mahmud",
    fatherPhone: "+8801711122233",
    fatherOccupation: "Businessman",
    mother: "Rokeya Begum",
    motherPhone: "+8801911122233",
    motherOccupation: "Homemaker",
  },
  emergency: {
    name: "Mohammad Mahmud",
    relation: "Father",
    phone: "+8801711122233",
    medicalAlert: "None",
  },
  academicHistory: [
    { degree: "HSC (Science)", board: "Dhaka Board", year: "2018", gpa: "5.00", verified: true },
    { degree: "SSC (Science)", board: "Comilla Board", year: "2016", gpa: "5.00", verified: true },
  ],
  hostel: null as { building: string; roomNo: string; bed: string; feeStatus: string } | null,
  transport: { route: "Mirpur Route", busNo: "B-12", validity: "Fall 2026", status: "Active" },
  library: { borrowed: 2, overdue: 0, fineDue: 0, status: "Clear" },
};

export const CURRENT_FACULTY = {
  id: "EMP-F001",
  userId: "demo-faculty",
  name: "Dr. Kamal Uddin",
  email: "kamal.uddin@northern.edu.bd",
  avatar: "https://ui-avatars.com/api/?name=Dr+Kamal+Uddin&background=10b981&color=fff&size=256",
  designation: "Professor",
  department: "Computer Science",
  faculty: "Faculty of Science & Engineering",
  office: "Room 402, CSE Building",
  officeHours: "Sun - Thu, 11:00 AM - 1:00 PM",
  phone: "+8801912345678",
  employeeId: "EMP-F001",
  assignedCourses: [
    { code: "CSE301", name: "Database Systems", section: "A", credits: 3, enrolled: 38, capacity: 40 },
    { code: "CSE302", name: "Database Systems Lab", section: "A", credits: 1, enrolled: 38, capacity: 40 },
    { code: "CSE401", name: "Software Engineering", section: "B", credits: 3, enrolled: 35, capacity: 40 },
  ],
  advisees: [
    { studentId: "191-15-12345", name: "Afnan Mahmud", program: "BSc in CSE", semester: "8th" },
    { studentId: "191-15-12346", name: "Sabrina Akter", program: "BSc in CSE", semester: "8th" },
    { studentId: "191-15-12347", name: "Rakib Hasan", program: "BSc in CSE", semester: "7th" },
    { studentId: "201-15-12348", name: "Imran Hossain", program: "BSc in CSE", semester: "6th" },
  ],
};

export const CURRENT_GUARDIAN_WARD = CURRENT_STUDENT;

// ------------------------------------------------------------------
// Authentic aggregate mock data
// ------------------------------------------------------------------

export const mockStudents = [
  { id: "STU2026001", name: "Afnan Mahmud", department: "Computer Science", semester: "8th", status: "Active", gpa: 3.85, balance: 0, email: "afnan.mahmud@northern.edu.bd" },
  { id: "STU2026002", name: "Nusrat Jahan", department: "Business Admin", semester: "3rd", status: "Active", gpa: 3.92, balance: 0, email: "nusrat.jahan@northern.edu.bd" },
  { id: "STU2026003", name: "Rakib Hasan", department: "Electrical Eng.", semester: "7th", status: "Warning", gpa: 2.1, balance: 45000, email: "rakib.hasan@northern.edu.bd" },
  { id: "STU2026004", name: "Sadia Rahman", department: "Architecture", semester: "1st", status: "Active", gpa: 4.0, balance: 5000, email: "sadia.rahman@northern.edu.bd" },
  { id: "STU2026005", name: "Tanvir Ahmed", department: "Civil Eng.", semester: "8th", status: "Graduating", gpa: 3.65, balance: 0, email: "tanvir.ahmed@northern.edu.bd" },
  { id: "STU2026006", name: "Sanjida Akter", department: "Computer Science", semester: "5th", status: "Suspended", gpa: 0.0, balance: 120000, email: "sanjida.akter@northern.edu.bd" },
  { id: "STU2026007", name: "Fahim Morshed", department: "Mechanical Eng.", semester: "2nd", status: "Active", gpa: 3.4, balance: 2000, email: "fahim.morshed@northern.edu.bd" },
  { id: "STU2026008", name: "Samiul Haque", department: "Economics", semester: "4th", status: "Active", gpa: 3.55, balance: 0, email: "samiul.haque@northern.edu.bd" },
  { id: "STU2026009", name: "Farah Hossain", department: "English", semester: "6th", status: "Active", gpa: 3.88, balance: 0, email: "farah.hossain@northern.edu.bd" },
  { id: "STU2026010", name: "Ashiqur Rahman", department: "Business Admin", semester: "8th", status: "Graduating", gpa: 3.12, balance: 10000, email: "ashiqur.rahman@northern.edu.bd" },
  { id: "STU2026011", name: "Nadia Islam", department: "Architecture", semester: "3rd", status: "Active", gpa: 3.75, balance: 5000, email: "nadia.islam@northern.edu.bd" },
  { id: "STU2026012", name: "Tahmid Hasan", department: "Computer Science", semester: "1st", status: "Active", gpa: 3.9, balance: 0, email: "tahmid.hasan@northern.edu.bd" },
  { id: "STU2026013", name: "Tasnim Akter", department: "Law", semester: "5th", status: "Warning", gpa: 2.45, balance: 25000, email: "tasnim.akter@northern.edu.bd" },
  { id: "STU2026014", name: "Jahid Hasan", department: "Civil Eng.", semester: "7th", status: "Active", gpa: 3.2, balance: 0, email: "jahid.hasan@northern.edu.bd" },
  { id: "STU2026015", name: "Mahiya Rahman", department: "Pharmacy", semester: "2nd", status: "Active", gpa: 3.95, balance: 0, email: "mahiya.rahman@northern.edu.bd" },
  { id: "STU2026016", name: "Imran Hossain", department: "Mechanical Eng.", semester: "6th", status: "Active", gpa: 3.33, balance: 15000, email: "imran.hossain@northern.edu.bd" },
  { id: "STU2026017", name: "Sumaiya Khan", department: "English", semester: "4th", status: "Active", gpa: 3.78, balance: 0, email: "sumaiya.khan@northern.edu.bd" },
  { id: "STU2026018", name: "Shakil Ahmed", department: "Electrical Eng.", semester: "8th", status: "Graduating", gpa: 3.45, balance: 5000, email: "shakil.ahmed@northern.edu.bd" },
  { id: "STU2026019", name: "Mithila Farjana", department: "Economics", semester: "1st", status: "Active", gpa: 3.8, balance: 0, email: "mithila.farjana@northern.edu.bd" },
  { id: "STU2026020", name: "Arifur Rahman", department: "Computer Science", semester: "3rd", status: "Warning", gpa: 2.2, balance: 35000, email: "arifur.rahman@northern.edu.bd" },
  { id: "STU2026021", name: "Sadman Sakib", department: "Business Admin", semester: "5th", status: "Active", gpa: 3.6, balance: 0, email: "sadman.sakib@northern.edu.bd" },
  { id: "STU2026022", name: "Nabila Haque", department: "Law", semester: "7th", status: "Active", gpa: 3.85, balance: 10000, email: "nabila.haque@northern.edu.bd" },
  { id: "STU2026023", name: "Foysal Mahmud", department: "Civil Eng.", semester: "2nd", status: "Active", gpa: 3.1, balance: 0, email: "foysal.mahmud@northern.edu.bd" },
  { id: "STU2026024", name: "Tanzila Akter", department: "Architecture", semester: "8th", status: "Graduating", gpa: 3.9, balance: 0, email: "tanzila.akter@northern.edu.bd" },
  { id: "STU2026025", name: "Asif Iqbal", department: "Pharmacy", semester: "4th", status: "Active", gpa: 3.5, balance: 20000, email: "asif.iqbal@northern.edu.bd" },
];

export const mockAdmissions = [
  { id: "APP26-1001", name: "Mehedi Hasan", program: "BSc Computer Science", date: "2026-08-10", status: "Applied", testScore: null },
  { id: "APP26-1002", name: "Sumaiya Akter", program: "BBA", date: "2026-08-05", status: "Test", testScore: null },
  { id: "APP26-1003", name: "Tariqul Islam", program: "BSc Electrical Eng.", date: "2026-07-28", status: "Merit List", testScore: 88 },
  { id: "APP26-1004", name: "Farhana Yeasmin", program: "BSc Architecture", date: "2026-07-20", status: "Admitted", testScore: 92 },
  { id: "APP26-1005", name: "Zahid Hossain", program: "BSc Civil Eng.", date: "2026-08-11", status: "Applied", testScore: null },
  { id: "APP26-1006", name: "Lamia Rahman", program: "BA English", date: "2026-08-09", status: "Test", testScore: null },
  { id: "APP26-1007", name: "Toufiq Ahmed", program: "BPharm", date: "2026-07-25", status: "Merit List", testScore: 90 },
  { id: "APP26-1008", name: "Nishat Tasnim", program: "BSc Mechanical Eng.", date: "2026-07-15", status: "Admitted", testScore: 85 },
  { id: "APP26-1009", name: "Shafiqul Islam", program: "LLB", date: "2026-08-12", status: "Applied", testScore: null },
  { id: "APP26-1010", name: "Jannatul Ferdous", program: "BBA", date: "2026-08-08", status: "Test", testScore: null },
];

export const mockEmployees = [
  { id: "EMP-F001", name: "Dr. Kamal Uddin", role: "Professor", department: "Computer Science", status: "Present", type: "Faculty" },
  { id: "EMP-A001", name: "Salma Begum", role: "HR Manager", department: "Administration", status: "On Leave", type: "Staff" },
  { id: "EMP-F002", name: "Prof. Anisur Rahman", role: "Head of Dept", department: "Business Admin", status: "Present", type: "Faculty" },
  { id: "EMP-S001", name: "Rafiqul Islam", role: "System Admin", department: "IT Support", status: "Present", type: "Staff" },
  { id: "EMP-F003", name: "Dr. Nabila Haque", role: "Associate Prof", department: "Electrical Eng.", status: "Present", type: "Faculty" },
  { id: "EMP-F004", name: "Dr. Hasan Mahmud", role: "Assistant Prof", department: "Civil Eng.", status: "Present", type: "Faculty" },
  { id: "EMP-A002", name: "Tariq Zia", role: "Finance Officer", department: "Accounts", status: "Present", type: "Staff" },
  { id: "EMP-S002", name: "Kamrul Hasan", role: "Librarian", department: "Library", status: "Present", type: "Staff" },
];

export const mockFinances = {
  revenue: [
    { month: "Jan", amount: 1200000 },
    { month: "Feb", amount: 1500000 },
    { month: "Mar", amount: 1100000 },
    { month: "Apr", amount: 2800000 },
    { month: "May", amount: 1300000 },
    { month: "Jun", amount: 1400000 },
    { month: "Jul", amount: 2100000 },
    { month: "Aug", amount: 3200000 },
    { month: "Sep", amount: 1800000 },
    { month: "Oct", amount: 1500000 },
    { month: "Nov", amount: 1200000 },
    { month: "Dec", amount: 2900000 },
  ],
  enrollmentTrend: [
    { semester: "Spring 2024", students: 5200 },
    { semester: "Summer 2024", students: 5400 },
    { semester: "Fall 2024", students: 6100 },
    { semester: "Spring 2025", students: 6300 },
    { semester: "Summer 2025", students: 6500 },
    { semester: "Fall 2025", students: 7200 },
    { semester: "Spring 2026", students: 7500 },
    { semester: "Fall 2026", students: 8100 },
  ],
  recentTransactions: [
    { id: "TXN-9982", type: "Tuition Fee", amount: 45000, date: "2026-08-11", status: "Completed", student: "Afnan Mahmud" },
    { id: "TXN-9983", type: "Library Fine", amount: 500, date: "2026-08-11", status: "Pending", student: "Rakib Hasan" },
    { id: "TXN-9984", type: "Hostel Fee", amount: 12000, date: "2026-08-10", status: "Completed", student: "Sadia Rahman" },
    { id: "TXN-9985", type: "Payroll", amount: -85000, date: "2026-08-01", status: "Completed", student: "N/A" },
    { id: "TXN-9986", type: "Tuition Fee", amount: 35000, date: "2026-08-12", status: "Completed", student: "Tahmid Hasan" },
    { id: "TXN-9987", type: "Exam Fee", amount: 2000, date: "2026-08-12", status: "Completed", student: "Nusrat Jahan" },
    { id: "TXN-9988", type: "Vendor Payment", amount: -150000, date: "2026-08-10", status: "Completed", student: "N/A" },
    { id: "TXN-9989", type: "Tuition Fee", amount: 45000, date: "2026-08-09", status: "Completed", student: "Tanvir Ahmed" },
  ],
  summary: {
    totalRevenue: "৳ 22.1M",
    pendingDues: "৳ 3.4M",
    totalExpenses: "৳ 8.5M",
    netProfit: "৳ 13.6M",
  },
};

export const mockLibrary = [
  { id: "BK-1001", title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "Computer Science", status: "Available", copies: 5 },
  { id: "BK-1002", title: "Clean Code", author: "Robert C. Martin", category: "Software Engineering", status: "Issued", copies: 0 },
  { id: "BK-1003", title: "Principles of Marketing", author: "Philip Kotler", category: "Business", status: "Available", copies: 12 },
  { id: "BK-1004", title: "Engineering Mechanics", author: "R.C. Hibbeler", category: "Engineering", status: "Available", copies: 3 },
  { id: "BK-1005", title: "Design Patterns", author: "Gang of Four", category: "Software Engineering", status: "Issued", copies: 0 },
  { id: "BK-1006", title: "The Lean Startup", author: "Eric Ries", category: "Business", status: "Available", copies: 7 },
  { id: "BK-1007", title: "Digital Design", author: "M. Morris Mano", category: "Engineering", status: "Issued", copies: 0 },
];

export const mockHostel = [
  { roomNumber: "101", block: "A", capacity: 4, occupied: 4, status: "Full", type: "Male" },
  { roomNumber: "102", block: "A", capacity: 4, occupied: 2, status: "Partially Available", type: "Male" },
  { roomNumber: "103", block: "A", capacity: 2, occupied: 0, status: "Available", type: "Male" },
  { roomNumber: "201", block: "B", capacity: 4, occupied: 4, status: "Full", type: "Female" },
  { roomNumber: "202", block: "B", capacity: 2, occupied: 1, status: "Partially Available", type: "Female" },
  { roomNumber: "301", block: "C", capacity: 4, occupied: 4, status: "Full", type: "Male" },
  { roomNumber: "302", block: "C", capacity: 2, occupied: 2, status: "Full", type: "Female" },
];

export const mockTransport = [
  { routeId: "R-01", name: "Uttara to Campus", busNumber: "Dhaka Metro-B 11-2233", driver: "Kuddus Miah", capacity: 40, registered: 38, status: "Active" },
  { routeId: "R-02", name: "Mirpur to Campus", busNumber: "Dhaka Metro-B 11-4455", driver: "Jalil", capacity: 40, registered: 42, status: "Overloaded" },
  { routeId: "R-03", name: "Dhanmondi to Campus", busNumber: "Dhaka Metro-B 11-7788", driver: "Kashem", capacity: 30, registered: 15, status: "Active" },
  { routeId: "R-04", name: "Badda to Campus", busNumber: "Dhaka Metro-B 11-9900", driver: "Mokles", capacity: 40, registered: 0, status: "Maintenance" },
  { routeId: "R-05", name: "Savar to Campus", busNumber: "Dhaka Metro-B 11-1122", driver: "Rahim", capacity: 50, registered: 48, status: "Active" },
];

export const mockRoutine = [
  { time: "09:00 AM - 10:30 AM", monday: "CSE301 (Room 401)", tuesday: "MATH201 (Room 302)", wednesday: "CSE301 (Room 401)", thursday: "ENG101 (Room 201)", friday: "Off" },
  { time: "10:45 AM - 12:15 PM", monday: "CSE302 Lab (Lab 1)", tuesday: "PHY101 (Room 305)", wednesday: "CSE302 Lab (Lab 1)", thursday: "MATH201 (Room 302)", friday: "Off" },
  { time: "12:15 PM - 01:15 PM", monday: "Break", tuesday: "Break", wednesday: "Break", thursday: "Break", friday: "Jumma Prayer" },
  { time: "01:15 PM - 02:45 PM", monday: "ENG101 (Room 201)", tuesday: "CSE305 (Room 402)", wednesday: "PHY101 (Room 305)", thursday: "CSE305 (Room 402)", friday: "Off" },
  { time: "03:00 PM - 04:30 PM", monday: "CSE306 Lab (Lab 2)", tuesday: "Off", wednesday: "CSE306 Lab (Lab 2)", thursday: "Off", friday: "Off" },
];

export const mockCourses = [
  { _id: "C-101", code: "CSE101", name: "Introduction to Computer Science", credits: 3, semester: 1, department: { name: "Computer Science" }, program: { name: "BSc Computer Science" } },
  { _id: "C-102", code: "MAT101", name: "Calculus I", credits: 3, semester: 1, department: { name: "Mathematics" }, program: { name: "BSc Computer Science" } },
  { _id: "C-103", code: "PHY101", name: "Physics I", credits: 3, semester: 1, department: { name: "Physics" }, program: { name: "BSc Electrical Eng." } },
  { _id: "C-104", code: "ENG101", name: "English Composition", credits: 3, semester: 1, department: { name: "English" }, program: { name: "BBA" } },
  { _id: "C-105", code: "BUS101", name: "Introduction to Business", credits: 3, semester: 1, department: { name: "Business Admin" }, program: { name: "BBA" } },
  { _id: "C-201", code: "CSE201", name: "Data Structures", credits: 3, semester: 3, department: { name: "Computer Science" }, program: { name: "BSc Computer Science" } },
  { _id: "C-301", code: "CSE301", name: "Database Systems", credits: 3, semester: 5, department: { name: "Computer Science" }, program: { name: "BSc Computer Science" } },
  { _id: "C-302", code: "CSE302", name: "Database Systems Lab", credits: 1, semester: 5, department: { name: "Computer Science" }, program: { name: "BSc Computer Science" } },
  { _id: "C-401", code: "CSE401", name: "Software Engineering", credits: 3, semester: 7, department: { name: "Computer Science" }, program: { name: "BSc Computer Science" } },
];

export const mockDepartments = [
  { _id: "D-01", code: "CSE", name: "Computer Science", head: "Dr. Kamal Uddin", teachers: 15, students: 450 },
  { _id: "D-02", code: "BBA", name: "Business Admin", head: "Prof. Anisur Rahman", teachers: 12, students: 380 },
  { _id: "D-03", code: "EEE", name: "Electrical Eng.", head: "Dr. Nabila Haque", teachers: 10, students: 320 },
  { _id: "D-04", code: "CE", name: "Civil Eng.", head: "Dr. Hasan Mahmud", teachers: 8, students: 250 },
  { _id: "D-05", code: "ENG", name: "English", head: "Prof. Salma Begum", teachers: 6, students: 150 },
];

export const mockPrograms = [
  { _id: "P-01", code: "BSc-CSE", name: "BSc in Computer Science", department: { name: "Computer Science" }, duration: "4 Years", totalCredits: 144 },
  { _id: "P-02", code: "BBA", name: "Bachelor of Business Admin", department: { name: "Business Admin" }, duration: "4 Years", totalCredits: 132 },
  { _id: "P-03", code: "BSc-EEE", name: "BSc in Electrical Eng.", department: { name: "Electrical Eng." }, duration: "4 Years", totalCredits: 140 },
  { _id: "P-04", code: "BSc-CE", name: "BSc in Civil Eng.", department: { name: "Civil Eng." }, duration: "4 Years", totalCredits: 140 },
  { _id: "P-05", code: "BA-ENG", name: "BA in English", department: { name: "English" }, duration: "4 Years", totalCredits: 120 },
];

export const mockSemesters = [
  { _id: "S-01", name: "Spring 2026", startDate: "2026-01-15", endDate: "2026-05-15", status: "Completed", registrationOpen: false },
  { _id: "S-02", name: "Summer 2026", startDate: "2026-06-01", endDate: "2026-08-30", status: "Active", registrationOpen: false },
  { _id: "S-03", name: "Fall 2026", startDate: "2026-09-15", endDate: "2026-12-30", status: "Upcoming", registrationOpen: true },
];

export const mockExams = [
  { _id: "E-01", name: "Midterm - Summer 2026", type: "Midterm", course: { code: "CSE301", name: "Database Systems" }, semester: { name: "Summer 2026" }, date: "2026-07-15", startTime: "10:00", endTime: "12:00", room: "Room 301", totalMarks: 100, status: "Completed" },
  { _id: "E-02", name: "Final - Summer 2026", type: "Final", course: { code: "CSE401", name: "Software Engineering" }, semester: { name: "Summer 2026" }, date: "2026-08-25", startTime: "14:00", endTime: "16:00", room: "Room 401", totalMarks: 100, status: "Upcoming" },
  { _id: "E-03", name: "Midterm - Fall 2026", type: "Midterm", course: { code: "CSE101", name: "Introduction to Computer Science" }, semester: { name: "Fall 2026" }, date: "2026-10-25", startTime: "09:00", endTime: "11:00", room: "Room 101", totalMarks: 100, status: "Scheduled" },
];

export const mockResults = [
  { _id: "R-01", student: { name: "Afnan Mahmud", studentId: "STU2026001" }, course: { code: "CSE101", name: "Introduction to Computer Science", credits: 3 }, exam: { name: "Final - Spring 2026", type: "Final" }, semester: { name: "Spring 2026" }, marksObtained: 88, totalMarks: 100, grade: "A", gradePoint: 3.75, status: "published" },
  { _id: "R-02", student: { name: "Afnan Mahmud", studentId: "STU2026001" }, course: { code: "MAT101", name: "Calculus I", credits: 3 }, exam: { name: "Final - Spring 2026", type: "Final" }, semester: { name: "Spring 2026" }, marksObtained: 82, totalMarks: 100, grade: "A-", gradePoint: 3.5, status: "published" },
  { _id: "R-03", student: { name: "Afnan Mahmud", studentId: "STU2026001" }, course: { code: "CSE201", name: "Data Structures", credits: 3 }, exam: { name: "Final - Summer 2026", type: "Final" }, semester: { name: "Summer 2026" }, marksObtained: 91, totalMarks: 100, grade: "A+", gradePoint: 4.0, status: "published" },
  { _id: "R-04", student: { name: "Afnan Mahmud", studentId: "STU2026001" }, course: { code: "CSE301", name: "Database Systems", credits: 3 }, exam: { name: "Midterm - Summer 2026", type: "Midterm" }, semester: { name: "Summer 2026" }, marksObtained: 85, totalMarks: 100, grade: "A", gradePoint: 3.75, status: "published" },
  { _id: "R-05", student: { name: "Nusrat Jahan", studentId: "STU2026002" }, course: { code: "BUS101", name: "Introduction to Business", credits: 3 }, exam: { name: "Final - Summer 2026", type: "Final" }, semester: { name: "Summer 2026" }, marksObtained: 92, totalMarks: 100, grade: "A+", gradePoint: 4.0, status: "published" },
  { _id: "R-06", student: { name: "Rakib Hasan", studentId: "STU2026003" }, course: { code: "PHY101", name: "Physics I", credits: 3 }, exam: { name: "Final - Summer 2026", type: "Final" }, semester: { name: "Summer 2026" }, marksObtained: 55, totalMarks: 100, grade: "C+", gradePoint: 2.5, status: "published" },
  { _id: "R-07", student: { name: "Sadia Rahman", studentId: "STU2026004" }, course: { code: "ENG101", name: "English Composition", credits: 3 }, exam: { name: "Final - Summer 2026", type: "Final" }, semester: { name: "Summer 2026" }, marksObtained: 78, totalMarks: 100, grade: "B+", gradePoint: 3.25, status: "published" },
];

export const mockRegistrations = [
  { _id: "RG-01", student: { name: "Afnan Mahmud", studentId: "STU2026001" }, course: { code: "CSE401", name: "Software Engineering", credits: 3 }, semester: { name: "Fall 2026" }, status: "confirmed", advisorApproval: "approved" },
  { _id: "RG-02", student: { name: "Afnan Mahmud", studentId: "STU2026001" }, course: { code: "CSE402", name: "Computer Networks", credits: 3 }, semester: { name: "Fall 2026" }, status: "confirmed", advisorApproval: "approved" },
  { _id: "RG-03", student: { name: "Afnan Mahmud", studentId: "STU2026001" }, course: { code: "CSE403", name: "Machine Learning", credits: 3 }, semester: { name: "Fall 2026" }, status: "confirmed", advisorApproval: "approved" },
  { _id: "RG-04", student: { name: "Nusrat Jahan", studentId: "STU2026002" }, course: { code: "BUS101", name: "Introduction to Business", credits: 3 }, semester: { name: "Summer 2026" }, status: "confirmed", advisorApproval: "approved" },
  { _id: "RG-05", student: { name: "Nusrat Jahan", studentId: "STU2026002" }, course: { code: "ENG101", name: "English Composition", credits: 3 }, semester: { name: "Summer 2026" }, status: "confirmed", advisorApproval: "approved" },
];

export const mockAttendance = [
  { _id: "AT-01", student: { name: "Afnan Mahmud", studentId: "STU2026001" }, course: { code: "CSE301", name: "Database Systems" }, semester: { name: "Summer 2026" }, date: "2026-08-11", status: "present" },
  { _id: "AT-02", student: { name: "Afnan Mahmud", studentId: "STU2026001" }, course: { code: "CSE301", name: "Database Systems" }, semester: { name: "Summer 2026" }, date: "2026-08-10", status: "present" },
  { _id: "AT-03", student: { name: "Afnan Mahmud", studentId: "STU2026001" }, course: { code: "CSE401", name: "Software Engineering" }, semester: { name: "Fall 2026" }, date: "2026-08-09", status: "present" },
  { _id: "AT-04", student: { name: "Nusrat Jahan", studentId: "STU2026002" }, course: { code: "BUS101", name: "Introduction to Business" }, semester: { name: "Summer 2026" }, date: "2026-08-11", status: "absent" },
];

export const mockNotifications = [
  { _id: "N-01", title: "Payment Reminder", message: "Tuition fees for Fall 2026 are due by Sep 10.", type: "payment", createdAt: "2026-08-10T09:00:00Z", read: false },
  { _id: "N-02", title: "Exam Schedule Published", message: "Final exam schedule for Summer 2026 has been published.", type: "academic", createdAt: "2026-08-09T10:30:00Z", read: true },
  { _id: "N-03", title: "System Maintenance", message: "The ERP will be down for maintenance this Saturday from 2 AM.", type: "system", createdAt: "2026-08-05T14:00:00Z", read: true },
  { _id: "N-04", title: "Course Registration Open", message: "Fall 2026 course registration is now open for 8th semester students.", type: "academic", createdAt: "2026-08-11T08:00:00Z", read: false },
];

export const mockPayments = [
  { _id: "P-01", invoiceId: "INV-1001", student: { name: "Afnan Mahmud", studentId: "STU2026001" }, amount: 45000, paidAt: "2026-08-11", method: "bKash", status: "completed", feeType: "tuition_fee" },
  { _id: "P-02", invoiceId: "INV-1002", student: { name: "Afnan Mahmud", studentId: "STU2026001" }, amount: 35000, paidAt: "2026-07-15", method: "bank_transfer", status: "completed", feeType: "tuition_fee" },
  { _id: "P-03", invoiceId: "INV-1003", student: { name: "Afnan Mahmud", studentId: "STU2026001" }, amount: 2000, paidAt: "2026-07-10", method: "bKash", status: "completed", feeType: "exam_fee" },
  { _id: "P-04", invoiceId: "INV-1004", student: { name: "Rakib Hasan", studentId: "STU2026003" }, amount: 500, paidAt: "2026-08-11", method: "cash", status: "pending", feeType: "library_fine" },
  { _id: "P-05", invoiceId: "INV-1005", student: { name: "Nusrat Jahan", studentId: "STU2026002" }, amount: 40000, paidAt: "2026-08-12", method: "bKash", status: "completed", feeType: "tuition_fee" },
];

// ------------------------------------------------------------------
// Scoping helpers for the demo build (frontend-only filtering)
// ------------------------------------------------------------------

export function getCurrentUser(): DemoUser | null {
  return getStoredUser();
}

export function getCurrentStudentId(): string | null {
  if (isStudent()) return CURRENT_STUDENT.studentId;
  if (isGuardian()) return CURRENT_GUARDIAN_WARD.studentId;
  return null;
}

export function getCurrentFacultyId(): string | null {
  return isFaculty() ? CURRENT_FACULTY.employeeId : null;
}

export function filterByCurrentStudent<T extends { student?: { studentId?: string; name?: string } | null }>(records: T[]): T[] {
  if (isAdminLike() || isFinance() || isManagement()) return records;
  const id = getCurrentStudentId();
  if (!id) return [];
  return records.filter((r) => r.student?.studentId === id || r.student?.name === CURRENT_STUDENT.name);
}

export function filterByCurrentFaculty<T extends { course?: { code?: string } | null; faculty?: string | null }>(records: T[]): T[] {
  if (isAdminLike() || isManagement()) return records;
  if (!isFaculty()) return [];
  const courseCodes = CURRENT_FACULTY.assignedCourses.map((c) => c.code);
  return records.filter((r) => (r.course?.code && courseCodes.includes(r.course.code)) || (r.faculty && r.faculty.includes(CURRENT_FACULTY.name)));
}

export function shouldShowAggregate(): boolean {
  return isAdminLike() || isFinance() || isManagement();
}
