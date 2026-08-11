import React from "react";
import GenericModuleView from "@/components/shared/GenericModuleView";
import StudentMasterProfile from "@/components/students/StudentMasterProfile";
import StudentAnalytics from "@/components/students/StudentAnalytics";
import { studentConfigs } from "@/lib/studentModuleConfigs";
import FinancePlaceholder from "@/components/FinancePlaceholder";

export default async function StudentModulePage({ params }: { params: Promise<{ module: string }> }) {
    const { module } = await params;
    
    // Render bespoke premium modules
    if (module === "master-profile") {
        return <StudentMasterProfile />;
    }
    
    if (module === "analytics") {
        return <StudentAnalytics />;
    }
    
    // Render generic module with unique config
    const config = studentConfigs[module];
    if (config) {
        return <GenericModuleView config={config} />;
    }
    
    // Fallback if somehow not defined
    const title = module.replace("-", " ").toUpperCase();
    return <FinancePlaceholder moduleName={title} />;
}
