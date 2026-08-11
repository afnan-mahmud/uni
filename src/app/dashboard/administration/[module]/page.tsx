import React from "react";
import GenericModuleView from "@/components/shared/GenericModuleView";
import AdministrationUserAccess from "@/components/administration/AdministrationUserAccess";
import AdministrationSystem from "@/components/administration/AdministrationSystem";
import { administrationConfigs } from "@/lib/administrationModuleConfigs";
import FinancePlaceholder from "@/components/FinancePlaceholder";

export default async function AdministrationModulePage({ params }: { params: Promise<{ module: string }> }) {
    const { module } = await params;
    
    // Render bespoke premium modules
    if (module === "user-access") {
        return <AdministrationUserAccess />;
    }
    
    if (module === "system-administration") {
        return <AdministrationSystem />;
    }
    
    // Render generic module with unique config
    const config = administrationConfigs[module];
    if (config) {
        return <GenericModuleView config={config} />;
    }
    
    // Fallback if somehow not defined
    const title = module.replace("-", " ").toUpperCase();
    return <FinancePlaceholder moduleName={title} />;
}
