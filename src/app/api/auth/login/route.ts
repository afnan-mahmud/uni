import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import { signToken } from "@/lib/jwt";
import { successResponse, errorResponse } from "@/lib/apiResponse";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return errorResponse("Email and password are required", 400);
        }

        // Demo Login Bypass
        const DEMO_ACCOUNTS: Record<string, any> = {
            "admin@erp.com": { id: "demo-admin", name: "Admin User", role: "admin", phone: "1234567890" },
            "student@erp.com": { id: "demo-student", name: "John Doe", role: "student", phone: "1234567890" },
            "faculty@erp.com": { id: "demo-faculty", name: "Dr. Smith", role: "faculty", phone: "1234567890" },
            "finance@erp.com": { id: "demo-finance", name: "Jane Doe", role: "finance_officer", phone: "1234567890" },
        };

        if (DEMO_ACCOUNTS[email] && password === "password") {
            const demoUser = DEMO_ACCOUNTS[email];
            const token = signToken({
                userId: demoUser.id,
                email: email,
                role: demoUser.role,
            });
            return successResponse(
                { token, user: { ...demoUser, email } },
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