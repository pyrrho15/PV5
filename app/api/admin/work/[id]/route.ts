import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { work } from "@/lib/db/schema";

function parseId(rawId: string): number | null {
  const id = Number(rawId);
  return Number.isInteger(id) ? id : null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = parseId(rawId);
    if (id === null) {
      return Response.json({ error: "Invalid id" }, { status: 400 });
    }

    const rows = await db.select().from(work).where(eq(work.id, id)).limit(1);
    const item = rows[0];

    if (!item) {
      return Response.json({ error: "Work experience not found" }, { status: 404 });
    }
    return Response.json(item);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to load work experience" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = parseId(rawId);
    if (id === null) {
      return Response.json({ error: "Invalid id" }, { status: 400 });
    }

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

    const [updated] = await db
      .update(work)
      .set({
        name,
        image,
        workDone,
        type,
        role,
        timeline,
        techStackIds: Array.isArray(techStackIds)
          ? techStackIds.filter((stackId) => Number.isInteger(stackId))
          : [],
        updatedAt: new Date(),
      })
      .where(eq(work.id, id))
      .returning();

    if (!updated) {
      return Response.json({ error: "Work experience not found" }, { status: 404 });
    }
    return Response.json(updated);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to update work experience" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = parseId(rawId);
    if (id === null) {
      return Response.json({ error: "Invalid id" }, { status: 400 });
    }

    const deleted = await db.delete(work).where(eq(work.id, id)).returning();

    if (deleted.length === 0) {
      return Response.json({ error: "Work experience not found" }, { status: 404 });
    }
    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to delete work experience" },
      { status: 500 }
    );
  }
}