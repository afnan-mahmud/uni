import { successResponse } from "@/lib/apiResponse";
import { mockSemesters } from "@/lib/mockData";

export async function GET() {
    return successResponse(mockSemesters);
}

export async function POST() {
    return successResponse({}, "Created successfully", 201);
}