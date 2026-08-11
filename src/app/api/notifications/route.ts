import { successResponse } from "@/lib/apiResponse";
import { mockNotifications } from "@/lib/mockData";

export async function GET() {
    return successResponse(mockNotifications);
}

export async function POST() {
    return successResponse({}, "Created successfully", 201);
}