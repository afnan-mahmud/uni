import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import { signToken } from "@/lib/jwt";
import { successResponse, errorResponse } from "@/lib/apiResponse";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const { name, email, password, role, phone } = body;

        if (!name || !email || !password) {
            return errorResponse("Name, email and password are required", 400);
        }

        if (password.length < 6) {
            return errorResponse("Password must be at least 6 characters", 400);
        }

        const existing = await User.findOne({ email });
        if (existing) {
            return errorResponse("User already exists with this email", 409);
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || "student",
            phone,
        });

        const token = signToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        });

        return successResponse(
            {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
            "User registered successfully",
            201
        );
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Registration failed";
        return errorResponse(message, 500);
    }
}