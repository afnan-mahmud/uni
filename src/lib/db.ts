import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
    console.warn(
        "⚠️ MONGODB_URI is not defined. Running in frontend-only mock mode."
    );
}

// Cache the connection across hot reloads in development
interface Cached {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var mongooseCache: Cached | undefined;
}

const cached: Cached = global.mongooseCache ?? { conn: null, promise: null };

if (!global.mongooseCache) {
    global.mongooseCache = cached;
}

export async function dbConnect(): Promise<typeof mongoose> {
    if (!MONGODB_URI) {
        return null as any;
    }
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}