import { successResponse } from "@/lib/apiResponse";
import { mockResults } from "@/lib/mockData";

export async function GET() {
    return successResponse(mockResults);
}

export async function POST() {
    return successResponse({}, "Created successfully", 201);
}