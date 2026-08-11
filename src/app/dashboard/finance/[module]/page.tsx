import React from "react";
import FinancePlaceholder from "@/components/FinancePlaceholder";
import FinanceGenericModuleView from "@/components/finance/FinanceGenericModuleView";
import StudentBilling from "@/components/finance/StudentBilling";
import Payroll from "@/components/finance/Payroll";
import ExpenseManagement from "@/components/finance/ExpenseManagement";
import { financeConfigs } from "@/lib/financeModuleConfigs";

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
    
    // If we have a generic config for it, render the detailed generic view
    const config = financeConfigs[module];
    if (config) {
        return <FinanceGenericModuleView config={config} />;
    }
    
    // Fallback to placeholder if something is missing
    const title = module.replace("-", " ").toUpperCase();
    return <FinancePlaceholder moduleName={title} />;
}
