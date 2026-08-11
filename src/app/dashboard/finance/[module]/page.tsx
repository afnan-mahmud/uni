import React from "react";
import FinancePlaceholder from "@/components/FinancePlaceholder";
import StudentBilling from "@/components/finance/StudentBilling";
import Payroll from "@/components/finance/Payroll";
import ExpenseManagement from "@/components/finance/ExpenseManagement";

const MODULE_TITLES: Record<string, string> = {
    "fee-structure": "Fee Structure Management",
    "student-billing": "Student Billing",
    "accounts-receivable": "Accounts Receivable",
    "payments": "Payment Management",
    "refunds": "Refund Management",
    "scholarships": "Scholarship & Waiver",
    "student-ledger": "Student Ledger",
    "general-accounting": "General Accounting",
    "chart-of-accounts": "Chart of Accounts",
    "journal-ledger": "Journal & Ledger",
    "accounts-payable": "Accounts Payable",
    "vendor-management": "Vendor Management",
    "expenses": "Expense Management",
    "budgets": "Budget Management",
    "bank-cash": "Bank & Cash Management",
    "payroll": "Payroll",
    "tax": "Tax & Statutory",
    "reporting": "Financial Reporting",
    "dashboard": "Financial Dashboard",
    "reconciliation": "Reconciliation",
    "audit": "Audit & Controls",
    "configuration": "Finance Configuration",
};

export default async function FinanceModulePage({ params }: { params: Promise<{ module: string }> }) {
    const { module } = await params;
    
    // Render specific detailed modules if available
    if (module === "student-billing") {
        return <StudentBilling />;
    }
    
    if (module === "payroll") {
        return <Payroll />;
    }
    
    if (module === "expenses") {
        return <ExpenseManagement />;
    }
    
    // Otherwise render the premium placeholder
    const title = MODULE_TITLES[module] || "Finance Module";
    
    return <FinancePlaceholder moduleName={title} />;
}
