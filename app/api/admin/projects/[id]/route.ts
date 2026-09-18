import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { project } from "@/lib/db/schema";

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

    const rows = await db
      .select()
      .from(project)
      .where(eq(project.id, id))
      .limit(1);
    const item = rows[0];

    if (!item) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }
    return Response.json(item);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to load project" }, { status: 500 });
  }
}

// PUT /api/admin/projects/:id
// Updates one project.
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
    const { name, about, image, githubLink, liveDemo, techStackIds, status } =
      body;

    if (
      typeof name !== "string" ||
      typeof about !== "string" ||
      typeof image !== "string" ||
      typeof githubLink !== "string" ||
      typeof liveDemo !== "string"
    ) {
      return Response.json(
        { error: "name, about, image, githubLink and liveDemo are required" },
        { status: 400 }
      );
    }

    const [updated] = await db
      .update(project)
      .set({
        name,
        about,
        image,
        githubLink,
        liveDemo,
        techStackIds: Array.isArray(techStackIds)
          ? techStackIds.filter((stackId) => Number.isInteger(stackId))
          : [],
        status: Boolean(status),
        updatedAt: new Date(),
      })
      .where(eq(project.id, id))
      .returning();

    if (!updated) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }
    return Response.json(updated);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to update project" }, { status: 500 });
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

    const deleted = await db
      .delete(project)
      .where(eq(project.id, id))
      .returning();

    if (deleted.length === 0) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }
    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to delete project" }, { status: 500 });
  }
}