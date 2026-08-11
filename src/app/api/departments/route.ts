import { successResponse } from "@/lib/apiResponse";
import { mockDepartments } from "@/lib/mockData";

export async function GET() {
    return successResponse(mockDepartments);
}

export async function POST() {
    return successResponse({}, "Created successfully", 201);
}