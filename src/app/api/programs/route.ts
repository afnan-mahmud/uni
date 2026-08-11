import { successResponse } from "@/lib/apiResponse";
import { mockPrograms } from "@/lib/mockData";

export async function GET() {
    return successResponse(mockPrograms);
}

export async function POST() {
    return successResponse({}, "Created successfully", 201);
}