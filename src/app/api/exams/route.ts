import { successResponse } from "@/lib/apiResponse";
import { mockExams } from "@/lib/mockData";

export async function GET() {
    return successResponse(mockExams);
}

export async function POST() {
    return successResponse({}, "Created successfully", 201);
}