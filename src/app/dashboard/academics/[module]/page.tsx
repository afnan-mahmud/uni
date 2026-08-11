import React from "react";
import GenericModuleView from "@/components/shared/GenericModuleView";
import AcademicResultGrading from "@/components/academics/AcademicResultGrading";
import AcademicAnalytics from "@/components/academics/AcademicAnalytics";
import { getAcademicConfig } from "@/lib/academicModuleConfigs";
import FinancePlaceholder from "@/components/FinancePlaceholder";

export default async function AcademicModulePage({ params }: { params: Promise<{ module: string }> }) {
    const { module } = await params;

    // Render bespoke premium modules
    if (module === "result-grading") {
        return <AcademicResultGrading />;
    }

    if (module === "analytics") {
        return <AcademicAnalytics />;
    }

    // Render generic module with role-scoped config
    const config = getAcademicConfig(module);
    if (config) {
        return <GenericModuleView config={config} />;
    }

    // Fallback if somehow not defined
    const title = module.replace("-", " ").toUpperCase();
    return <FinancePlaceholder moduleName={title} />;
}
