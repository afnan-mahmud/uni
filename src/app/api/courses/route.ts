import { successResponse } from "@/lib/apiResponse";
import { mockCourses } from "@/lib/mockData";

export async function GET() {
    return successResponse(mockCourses);
}

export async function POST() {
    return successResponse({}, "Created successfully", 201);
}