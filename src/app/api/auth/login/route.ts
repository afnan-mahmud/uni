import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import { signToken } from "@/lib/jwt";
import { successResponse, errorResponse } from "@/lib/apiResponse";
import { DEMO_ACCOUNTS, DEFAULT_PASSWORD } from "@/lib/demoAuth";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return errorResponse("Email and password are required", 400);
        }

        // Demo Login Bypass
        if (DEMO_ACCOUNTS[email] && password === DEFAULT_PASSWORD) {
            const demoUser = DEMO_ACCOUNTS[email];
            const token = signToken({
                userId: demoUser.id,
                email: email,
                role: demoUser.role,
            });
            return successResponse(
                { token, user: demoUser },
                "Demo login successful",
                200
            );
        }

        await dbConnect();
        const user = await User.findOne({ email });
        if (!user) {
            return errorResponse("Invalid email or password", 401);
        }

        if (!user.isActive) {
            return errorResponse("Account is suspended. Contact administrator.", 403);
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return errorResponse("Invalid email or password", 401);
        }

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
                    phone: user.phone,
                },
            },
            "Login successful",
            200
        );
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Login failed";
        return errorResponse(message, 500);
    }
}