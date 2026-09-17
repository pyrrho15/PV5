import dotenv from "dotenv"
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
dotenv.config()

if (!process.env.DATABASE_URL) {
    throw new Error("*** ERROR: DB connection string is REQUIRED.. ***")
}

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

try {
    const result = await db.execute('select 1');
    console.log("DB CONNECTED: ", result)
} catch (error) {
    console.error("**** ERROR: DB connection failed ***** : ", error);
}