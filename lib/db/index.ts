import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
    if (!process.env.DATABASE_URL) {
        return null;
    }

    if (!_db) {
        const sql = neon(process.env.DATABASE_URL);
        _db = drizzle({ client: sql });
    }

    return _db;
}

export const db = new Proxy({} as never, {
    get(_target, prop: string) {
        const database = getDb();
        if (!database) {
            return () => {
                throw new Error("Database not configured. Set DATABASE_URL environment variable to use backend features.");
            };
        }
        return database[prop as keyof ReturnType<typeof getDb>];
    }
});