import { FinanceModuleConfig } from "@/components/finance/FinanceGenericModuleView";

export const financeConfigs: Record<string, FinanceModuleConfig> = {
  "fee-structure": {
    title: "Fee Structure Management",
    description: "Manage tuition, lab fees, and other charges for all programs.",
    primaryButton: "Create New Structure",
    secondaryButton: "Export PDF",
    kpis: [
      { label: "Active Structures", value: "24", color: "border-l-indigo-500" },
      { label: "Programs Configured", value: "18", color: "border-l-emerald-500" },
      { label: "Pending Approvals", value: "3", color: "border-l-amber-500" }
    ],
    columns: ["Program", "Semester", "Tuition Fee", "Lab Fee", "Total", "Status"],
    data: [
      ["BSc Computer Science", "Fall 2026", "৳ 45,000", "৳ 5,000", "৳ 50,000", "Active"],
      ["BBA", "Fall 2026", "৳ 40,000", "৳ 0", "৳ 40,000", "Active"],
      ["MSc Software Engineering", "Fall 2026", "৳ 60,000", "৳ 10,000", "৳ 70,000", "Draft"]
    ]
  },
  "accounts-receivable": {
    title: "Accounts Receivable",
    description: "Track money owed to the university by students and sponsors.",
    primaryButton: "Send Reminders",
    kpis: [
      { label: "Total Receivables", value: "৳ 4.2M", color: "border-l-rose-500" },
      { label: "0-30 Days", value: "৳ 2.1M", color: "border-l-amber-500" },
      { label: "> 90 Days (Overdue)", value: "৳ 850K", color: "border-l-rose-700" }
    ],
    columns: ["Invoice ID", "Debtor", "Due Date", "Amount", "Days Overdue", "Status"],
    data: [
      ["INV-2026-89", "John Doe (Student)", "2026-07-01", "৳ 45,000", "41", "Overdue"],
      ["INV-2026-90", "Corporate Sponsor", "2026-08-01", "৳ 250,000", "10", "Pending"],
      ["INV-2026-91", "Jane Smith (Student)", "2026-08-10", "৳ 25,000", "1", "Pending"]
    ]
  },
  "payments": {
    title: "Payment Management",
    description: "Monitor incoming payments from all gateways and physical banks.",
    primaryButton: "Record Manual Payment",
    secondaryButton: "Reconcile Gateways",
    kpis: [
      { label: "Today's Collection", value: "৳ 450,000", color: "border-l-emerald-500" },
      { label: "SSLCommerz", value: "৳ 320,000", color: "border-l-indigo-500" },
      { label: "Bank Transfer", value: "৳ 130,000", color: "border-l-blue-500" }
    ],
    columns: ["Receipt No", "Payer", "Method", "Date", "Amount", "Status"],
    data: [
      ["RCPT-501", "Afnan Mahmud", "SSLCommerz", "2026-08-11", "৳ 45,000", "Verified"],
      ["RCPT-502", "Sarah Khan", "Bank Transfer", "2026-08-11", "৳ 50,000", "Pending Verify"],
      ["RCPT-503", "Rafiqul Islam", "bKash", "2026-08-10", "৳ 15,000", "Verified"]
    ]
  },
  "refunds": {
    title: "Refund Management",
    description: "Process student withdrawals and overpayment refunds.",
    primaryButton: "Process Selected",
    kpis: [
      { label: "Pending Requests", value: "12", color: "border-l-amber-500" },
      { label: "Refunded (YTD)", value: "৳ 850,000", color: "border-l-indigo-500" }
    ],
    columns: ["Request ID", "Student", "Reason", "Amount", "Bank Acct", "Status"],
    data: [
      ["REF-101", "Afnan Mahmud", "Overpayment", "৳ 5,000", "****1234", "Pending Approval"],
      ["REF-102", "Sadia Hossain", "Course Drop", "৳ 15,000", "****5678", "Processing"],
      ["REF-103", "Kamrul Hasan", "Scholarship Adjustment", "৳ 20,000", "****9012", "Completed"]
    ]
  },
  "scholarships": {
    title: "Scholarship & Waiver",
    description: "Manage merit-based, need-based, and special waivers.",
    primaryButton: "Allocate Waiver",
    kpis: [
      { label: "Active Scholarships", value: "845", color: "border-l-emerald-500" },
      { label: "Total Value Disbursed", value: "৳ 12.5M", color: "border-l-indigo-500" }
    ],
    columns: ["Student", "Program", "Type", "Percentage", "Value", "Status"],
    data: [
      ["Afnan Mahmud", "BSc CSE", "Merit Based (GPA 5.0)", "50%", "৳ 22,500", "Active"],
      ["Nusrat Jahan", "BBA", "Freedom Fighter Quota", "100%", "৳ 40,000", "Active"],
      ["Tariqul Islam", "LLB", "Sibling Waiver", "25%", "৳ 12,500", "Active"]
    ]
  },
  "student-ledger": {
    title: "Student Ledger",
    description: "View individual student financial statements and transaction history.",
    primaryButton: "Export Statement",
    secondaryButton: "Send to Student",
    kpis: [
      { label: "Total Students", value: "12,450", color: "border-l-indigo-500" },
      { label: "Cleared Accounts", value: "8,920", color: "border-l-emerald-500" },
      { label: "Accounts in Deficit", value: "3,530", color: "border-l-rose-500" }
    ],
    columns: ["Student ID", "Name", "Total Billed", "Total Paid", "Waivers", "Current Balance"],
    data: [
      ["191-15-12345", "Afnan Mahmud", "৳ 350,000", "৳ 350,000", "৳ 0", "৳ 0 (Cleared)"],
      ["192-15-67890", "Sabrina Akter", "৳ 420,000", "৳ 380,000", "৳ 20,000", "৳ 20,000 (Due)"],
      ["201-15-54321", "Imran Hossain", "৳ 150,000", "৳ 160,000", "৳ 0", "৳ 10,000 (Advance)"]
    ]
  },
  "general-accounting": {
    title: "General Accounting",
    description: "Core accounting overview, trial balances, and financial health.",
    primaryButton: "Generate Trial Balance",
    kpis: [
      { label: "Total Assets", value: "৳ 450M", color: "border-l-emerald-500" },
      { label: "Total Liabilities", value: "৳ 120M", color: "border-l-rose-500" },
      { label: "Equity", value: "৳ 330M", color: "border-l-indigo-500" }
    ],
    columns: ["Account Type", "Total Debit", "Total Credit", "Net Balance", "Status"],
    data: [
      ["Assets", "৳ 500,000,000", "৳ 50,000,000", "৳ 450,000,000 (Dr)", "Balanced"],
      ["Liabilities", "৳ 20,000,000", "৳ 140,000,000", "৳ 120,000,000 (Cr)", "Balanced"],
      ["Equity", "৳ 0", "৳ 330,000,000", "৳ 330,000,000 (Cr)", "Balanced"]
    ]
  },
  "chart-of-accounts": {
    title: "Chart of Accounts",
    description: "Manage ledger accounts, groupings, and financial structures.",
    primaryButton: "Add New Account",
    kpis: [
      { label: "Active Accounts", value: "245", color: "border-l-indigo-500" },
      { label: "Asset Accounts", value: "42", color: "border-l-emerald-500" },
      { label: "Expense Accounts", value: "115", color: "border-l-amber-500" }
    ],
    columns: ["Account Code", "Account Name", "Group", "Type", "Current Balance"],
    data: [
      ["1001", "Cash in Hand - Main Campus", "Cash", "Asset", "৳ 250,000 (Dr)"],
      ["1002", "Dutch Bangla Bank - 105", "Bank", "Asset", "৳ 12,450,000 (Dr)"],
      ["4001", "Tuition Fee Revenue", "Revenue", "Income", "৳ 45,000,000 (Cr)"],
      ["5001", "Faculty Salaries", "Payroll", "Expense", "৳ 8,500,000 (Dr)"]
    ]
  },
  "journal-ledger": {
    title: "Journal & Ledger",
    description: "Post double-entry journals and view individual ledger statements.",
    primaryButton: "New Journal Entry",
    secondaryButton: "Post Pending",
    kpis: [
      { label: "Entries Today", value: "142", color: "border-l-indigo-500" },
      { label: "Pending Posting", value: "15", color: "border-l-amber-500" }
    ],
    columns: ["Date", "Journal ID", "Reference", "Account", "Debit", "Credit"],
    data: [
      ["2026-08-11", "JV-1045", "Office Supplies", "Stationery (5022)", "৳ 15,000", "-"],
      ["2026-08-11", "JV-1045", "Office Supplies", "Cash in Hand (1001)", "-", "৳ 15,000"],
      ["2026-08-11", "JV-1046", "Fee Collection", "Bank - DBBL (1002)", "৳ 45,000", "-"],
      ["2026-08-11", "JV-1046", "Fee Collection", "Accounts Receivable (1200)", "-", "৳ 45,000"]
    ]
  },
  "accounts-payable": {
    title: "Accounts Payable",
    description: "Track money owed to vendors, suppliers, and contractors.",
    primaryButton: "Make Payment",
    kpis: [
      { label: "Total Payables", value: "৳ 1.2M", color: "border-l-rose-500" },
      { label: "Due Next 7 Days", value: "৳ 450K", color: "border-l-amber-500" }
    ],
    columns: ["Vendor", "Invoice Ref", "Due Date", "Amount", "Status"],
    data: [
      ["TechNova Solutions (IT)", "INV-TN-099", "2026-08-15", "৳ 150,000", "Pending"],
      ["Rahim Printers", "INV-RP-442", "2026-08-12", "৳ 45,000", "Urgent"],
      ["Desco (Electricity)", "AUG-2026", "2026-08-20", "৳ 255,000", "Pending"]
    ]
  },
  "vendor-management": {
    title: "Vendor Management",
    description: "Manage vendor profiles, contracts, and payment terms.",
    primaryButton: "Register Vendor",
    kpis: [
      { label: "Active Vendors", value: "124", color: "border-l-indigo-500" },
      { label: "Contracts Expiring", value: "3", color: "border-l-amber-500" }
    ],
    columns: ["Vendor ID", "Company Name", "Category", "Contact Person", "Status"],
    data: [
      ["VEN-001", "TechNova Solutions", "IT & Software", "Mr. Asif", "Active"],
      ["VEN-002", "Rahim Printers", "Printing & Stationery", "Rahim Uddin", "Active"],
      ["VEN-003", "Mega Builders Ltd", "Construction", "Kamal Hossain", "Contract Expired"]
    ]
  },
  "budgets": {
    title: "Budget Management",
    description: "Set and monitor departmental and campus-wide budgets.",
    primaryButton: "Create Budget",
    secondaryButton: "Variance Report",
    kpis: [
      { label: "Annual Budget", value: "৳ 250M", color: "border-l-indigo-500" },
      { label: "Utilized", value: "65%", color: "border-l-emerald-500" },
      { label: "Over Budget Depts", value: "2", color: "border-l-rose-500" }
    ],
    columns: ["Department", "Allocated Budget", "Utilized", "Remaining", "Status"],
    data: [
      ["Computer Science", "৳ 15,000,000", "৳ 10,500,000", "৳ 4,500,000", "On Track"],
      ["Library", "৳ 5,000,000", "৳ 5,200,000", "৳ -200,000", "Over Budget"],
      ["Marketing", "৳ 20,000,000", "৳ 12,000,000", "৳ 8,000,000", "On Track"]
    ]
  },
  "bank-cash": {
    title: "Bank & Cash Management",
    description: "Monitor liquid assets, bank balances, and petty cash.",
    primaryButton: "Bank Transfer",
    secondaryButton: "Reconcile",
    kpis: [
      { label: "Total Bank Balance", value: "৳ 85.2M", color: "border-l-indigo-500" },
      { label: "Cash in Hand", value: "৳ 1.5M", color: "border-l-emerald-500" }
    ],
    columns: ["Account Name", "Account No", "Bank", "Current Balance", "Last Reconciled"],
    data: [
      ["Main Operating Acct", "105.***.123", "Dutch Bangla Bank", "৳ 45,200,000", "Today"],
      ["Payroll Acct", "201.***.456", "BRAC Bank", "৳ 12,500,000", "Yesterday"],
      ["Development Fund", "305.***.789", "City Bank", "৳ 27,500,000", "2 Days Ago"]
    ]
  },
  "tax": {
    title: "Tax & Statutory",
    description: "Manage VAT, TDS, corporate taxes, and statutory compliances.",
    primaryButton: "Generate Tax Challan",
    kpis: [
      { label: "TDS Payable", value: "৳ 450K", color: "border-l-rose-500" },
      { label: "VAT Payable", value: "৳ 1.2M", color: "border-l-rose-500" }
    ],
    columns: ["Tax Type", "Period", "Amount Due", "Due Date", "Status"],
    data: [
      ["TDS on Salary", "Aug 2026", "৳ 450,000", "2026-09-15", "Pending"],
      ["VAT on Procurement", "Aug 2026", "৳ 1,200,000", "2026-09-15", "Pending"],
      ["Corporate Tax Installment", "Q3 2026", "৳ 5,000,000", "2026-10-31", "Upcoming"]
    ]
  },
  "reporting": {
    title: "Financial Reporting",
    description: "Generate automated P&L, Balance Sheets, and Cash Flow statements.",
    primaryButton: "Generate Custom Report",
    kpis: [
      { label: "Available Reports", value: "18", color: "border-l-indigo-500" },
      { label: "Scheduled Reports", value: "5", color: "border-l-emerald-500" }
    ],
    columns: ["Report Name", "Type", "Last Generated", "Format", "Action"],
    data: [
      ["Income Statement (P&L)", "Standard", "Today, 10:00 AM", "PDF / Excel", "View"],
      ["Balance Sheet", "Standard", "Today, 10:00 AM", "PDF / Excel", "View"],
      ["Cash Flow Statement", "Standard", "Yesterday", "PDF / Excel", "View"],
      ["Departmental Variance", "Custom", "Aug 1, 2026", "Excel", "View"]
    ]
  },
  "reconciliation": {
    title: "Reconciliation",
    description: "Reconcile bank statements, gateway payouts, and physical cash.",
    primaryButton: "Upload Bank Statement",
    kpis: [
      { label: "Unreconciled Entries", value: "45", color: "border-l-amber-500" },
      { label: "Discrepancies", value: "2", color: "border-l-rose-500" }
    ],
    columns: ["Account", "Statement Date", "System Balance", "Statement Balance", "Status"],
    data: [
      ["DBBL Main (105)", "2026-08-10", "৳ 45,200,000", "৳ 45,200,000", "Matched"],
      ["BRAC Payroll (201)", "2026-08-10", "৳ 12,500,000", "৳ 12,495,000", "Discrepancy (৳ 5,000)"],
      ["SSLCommerz Gateway", "2026-08-10", "৳ 1,450,000", "-", "Pending Upload"]
    ]
  },
  "audit": {
    title: "Audit & Controls",
    description: "Track system logs, financial anomalies, and compliance audits.",
    primaryButton: "Start Internal Audit",
    kpis: [
      { label: "Open Anomalies", value: "3", color: "border-l-amber-500" },
      { label: "High Risk Flags", value: "0", color: "border-l-emerald-500" }
    ],
    columns: ["Audit ID", "Type", "Period", "Lead Auditor", "Status"],
    data: [
      ["AUD-2026-01", "Financial Year Audit", "2025-2026", "Rahman & Co.", "Completed"],
      ["AUD-2026-02", "Internal Procurement Check", "Q2 2026", "System (Auto)", "In Progress"],
      ["AUD-2026-03", "Payroll Verification", "July 2026", "System (Auto)", "Passed"]
    ]
  },
  "configuration": {
    title: "Finance Configuration",
    description: "Manage tax rates, academic years, approval hierarchies, and system settings.",
    primaryButton: "Save Changes",
    kpis: [],
    columns: ["Setting Category", "Parameter", "Current Value", "Last Updated By"],
    data: [
      ["Taxation", "Default VAT Rate", "15%", "Admin (System)"],
      ["Taxation", "TDS Base Rate", "5%", "Admin (System)"],
      ["Financial Year", "Start Month", "July", "Super Admin"],
      ["Approvals", "Expense Auto-Approve Limit", "৳ 5,000", "Finance Director"]
    ]
  }
};
