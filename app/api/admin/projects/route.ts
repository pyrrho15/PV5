import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { project } from "@/lib/db/schema";

export async function GET() {
  try {
    const projects = await db
      .select()
      .from(project)
      .orderBy(desc(project.createdAt));
    return Response.json(projects);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to load projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
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

    const [created] = await db
      .insert(project)
      .values({
        ownerId: 1,
        name,
        about,
        image,
        githubLink,
        liveDemo,
        techStackIds: Array.isArray(techStackIds)
          ? techStackIds.filter((id) => Number.isInteger(id))
          : [],
        status: Boolean(status),
      })
      .returning();

    return Response.json(created, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to create project" }, { status: 500 });
  }
}