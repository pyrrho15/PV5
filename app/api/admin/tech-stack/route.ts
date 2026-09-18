import { db } from "@/lib/db";
import { techStack } from "@/lib/db/schema";

const VALID_CATEGORIES = [
  "frontend",
  "backend",
  "database",
  "devops",
  "language",
  "tool",
];

export async function GET() {
  try {
    const items = await db.select().from(techStack).orderBy(techStack.id);
    return Response.json(items);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to load tech stack items" },
      { status: 500 }
    );
  }
}

// POST /api/admin/tech-stack
// Creates a new tech stack item.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, icon, category } = body;

    if (typeof name !== "string" || name.trim() === "") {
      return Response.json({ error: "name is required" }, { status: 400 });
    }
    if (!VALID_CATEGORIES.includes(category)) {
      return Response.json({ error: "invalid category" }, { status: 400 });
    }

    const [created] = await db
      .insert(techStack)
      .values({
        name: name.trim(),
        // The icon column is optional, so empty string becomes null.
        icon: typeof icon === "string" && icon.trim() ? icon.trim() : null,
        category,
      })
      .returning();

    return Response.json(created, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to create tech stack item" },
      { status: 500 }
    );
  }
}