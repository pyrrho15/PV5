import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { blog } from "@/lib/db/schema";

export async function GET() {
  try {
    const blogs = await db.select().from(blog).orderBy(desc(blog.createdAt));
    return Response.json(blogs);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to load blogs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
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

    const [created] = await db
      .insert(blog)
      .values({
        ownerId: 1,
        name,
        about,
        image,
        liveLink,
        status: Boolean(status),
      })
      .returning();

    return Response.json(created, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to create blog" }, { status: 500 });
  }
}