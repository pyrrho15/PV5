import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { blog } from "@/lib/db/schema";

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

    const rows = await db.select().from(blog).where(eq(blog.id, id)).limit(1);
    const item = rows[0];

    if (!item) {
      return Response.json({ error: "Blog not found" }, { status: 404 });
    }
    return Response.json(item);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to load blog" }, { status: 500 });
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
    const { name, about, image, liveLink, status } = body;

    if (
      typeof name !== "string" ||
      typeof about !== "string" ||
      typeof image !== "string" ||
      typeof liveLink !== "string"
    ) {
      return Response.json(
        { error: "name, about, image and liveLink are required" },
        { status: 400 }
      );
    }

    const [updated] = await db
      .update(blog)
      .set({
        name,
        about,
        image,
        liveLink,
        status: Boolean(status),
        updatedAt: new Date(),
      })
      .where(eq(blog.id, id))
      .returning();

    if (!updated) {
      return Response.json({ error: "Blog not found" }, { status: 404 });
    }
    return Response.json(updated);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to update blog" }, { status: 500 });
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

    const deleted = await db.delete(blog).where(eq(blog.id, id)).returning();

    if (deleted.length === 0) {
      return Response.json({ error: "Blog not found" }, { status: 404 });
    }
    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}