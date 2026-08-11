import { successResponse } from "@/lib/apiResponse";
import { mockAttendance } from "@/lib/mockData";

export async function GET() {
    return successResponse(mockAttendance);
}

export async function POST() {
    return successResponse({}, "Created successfully", 201);
}