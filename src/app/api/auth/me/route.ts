import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import { getAuthUser } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/apiResponse";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const authUser = getAuthUser(req);
        if (!authUser) {
            return errorResponse("Unauthorized", 401);
        }

        const user = await User.findById(authUser.userId).select("-password");
        if (!user) {
            return errorResponse("User not found", 404);
        }

        return successResponse({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            isActive: user.isActive,
            isEmailVerified: user.isEmailVerified,
        });
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Failed to fetch user";
        return errorResponse(message, 500);
    }
}