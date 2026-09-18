import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { work } from "@/lib/db/schema";

export async function GET() {
  try {
    const entries = await db.select().from(work).orderBy(desc(work.createdAt));
    return Response.json(entries);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to load work experience" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, image, workDone, type, role, timeline, techStackIds } = body;

    if (
      typeof name !== "string" ||
      typeof image !== "string" ||
      typeof workDone !== "string" ||
      typeof type !== "string" ||
      typeof role !== "string" ||
      typeof timeline !== "string"
    ) {
      return Response.json(
        {
          error:
            "name, image, workDone, type, role and timeline are required",
        },
        { status: 400 }
      );
    }

    const [created] = await db
      .insert(work)
      .values({
        ownerId: 1,
        name,
        image,
        workDone,
        type,
        role,
        timeline,
        techStackIds: Array.isArray(techStackIds)
          ? techStackIds.filter((id) => Number.isInteger(id))
          : [],
      })
      .returning();

    return Response.json(created, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to create work experience" },
      { status: 500 }
    );
  }
}