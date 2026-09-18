import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { me } from "@/lib/db/schema";

export async function GET() {
  try {
    const rows = await db.select().from(me).where(eq(me.id, 1)).limit(1);
    const profile = rows[0] ?? null;
    return Response.json(profile);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to load profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { name, about, image } = body;

    if (
      typeof name !== "string" ||
      typeof about !== "string" ||
      typeof image !== "string"
    ) {
      return Response.json(
        { error: "name, about and image are required" },
        { status: 400 }
      );
    }

    const values = { name, about, image };

    const rows = await db.select().from(me).where(eq(me.id, 1)).limit(1);
    const existing = rows[0];

    if (!existing) {
      const [created] = await db.insert(me).values(values).returning();
      return Response.json(created, { status: 201 });
    }

    const [updated] = await db
      .update(me)
      .set(values)
      .where(eq(me.id, 1))
      .returning();
    return Response.json(updated);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to save profile" },
      { status: 500 }
    );
  }
}