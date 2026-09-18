import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { links } from "@/lib/db/schema";

export async function GET() {
  try {
    const rows = await db.select().from(links).where(eq(links.id, 1)).limit(1);
    const row = rows[0] ?? null;
    return Response.json(row);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to load links" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { email, linkedin, github, instagram, resume } = body;

    if (
      typeof email !== "string" ||
      typeof linkedin !== "string" ||
      typeof github !== "string" ||
      typeof instagram !== "string" ||
      typeof resume !== "string"
    ) {
      return Response.json(
        {
          error:
            "email, linkedin, github, instagram and resume are required",
        },
        { status: 400 }
      );
    }

    const values = { email, linkedin, github, instagram, resume };

    const rows = await db.select().from(links).where(eq(links.id, 1)).limit(1);
    const existing = rows[0];

    if (!existing) {
      const [created] = await db.insert(links).values(values).returning();
      return Response.json(created, { status: 201 });
    }

    const [updated] = await db
      .update(links)
      .set(values)
      .where(eq(links.id, 1))
      .returning();
    return Response.json(updated);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to save links" }, { status: 500 });
  }
}