import { successResponse } from "@/lib/apiResponse";
import { mockRegistrations } from "@/lib/mockData";

export async function GET() {
    return successResponse(mockRegistrations);
}

export async function POST() {
    return successResponse({}, "Created successfully", 201);
}