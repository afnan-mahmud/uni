import { successResponse } from "@/lib/apiResponse";
import { mockPayments } from "@/lib/mockData";

export async function GET() {
    return successResponse(mockPayments);
}

export async function POST() {
    return successResponse({}, "Created successfully", 201);
}