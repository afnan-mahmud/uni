import { successResponse } from "@/lib/apiResponse";
import { mockStudents } from "@/lib/mockData";

export async function GET() {
    return successResponse(mockStudents);
}

export async function POST() {
    return successResponse({}, "Created successfully", 201);
}