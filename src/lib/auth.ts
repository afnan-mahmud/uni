import { NextRequest } from "next/server";
import { verifyToken, JwtPayload } from "./jwt";
import { errorResponse } from "./apiResponse";

export function getAuthUser(req: NextRequest): JwtPayload | null {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }

    const token = authHeader.split(" ")[1];
    try {
        return verifyToken(token);
    } catch {
        return null;
    }
}

export function requireAuth(req: NextRequest): JwtPayload | ReturnType<typeof errorResponse> {
    const user = getAuthUser(req);
    if (!user) {
        return errorResponse("Unauthorized", 401);
    }
    return user;
}

export function requireRole(
    req: NextRequest,
    roles: string[]
): JwtPayload | ReturnType<typeof errorResponse> {
    const user = getAuthUser(req);
    if (!user) {
        return errorResponse("Unauthorized", 401);
    }
    if (!roles.includes(user.role)) {
        return errorResponse("Forbidden: Insufficient permissions", 403);
    }
    return user;
}