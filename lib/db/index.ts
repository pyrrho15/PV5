import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// Next.js automatically loads the DATABASE_URL from the .env file,
// so we only need to make sure it exists.
if (!process.env.DATABASE_URL) {
    throw new Error("*** ERROR: DB connection string is REQUIRED.. ***")
}

// Create the Neon SQL client and pass it to Drizzle.
// This is the object we import everywhere to talk to the database.
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });