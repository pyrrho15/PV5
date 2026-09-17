import {
    boolean,
    integer,
    pgEnum,
    pgTable,
    serial,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

export const me = pgTable("me", {
    id: integer("id").primaryKey().default(1),
    name: text("name").notNull(),
    about: text("about").notNull(),
    image: text("image").notNull(),
});

export const links = pgTable("links", {
    id: integer("id").primaryKey().default(1),
    email: text("email").notNull(),
    linkedin: text("linkedin").notNull(),
    github: text("github").notNull(),
    instagram: text("instagram").notNull(),
    resume: text("resume").notNull(),
});

export const techStackCategory = pgEnum("tech_stack_category", [
    "frontend",
    "backend",
    "database",
    "devops",
    "language",
    "tool",
]);

export const techStack = pgTable("tech_stack", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
    icon: text("icon"),
    category: techStackCategory("category").notNull(),
});

export const project = pgTable("project", {
    id: serial("id").primaryKey(),
    ownerId: integer("owner_id").notNull().references(() => me.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    about: text("about").notNull(),
    image: text("image").notNull(),
    githubLink: text("github_link").notNull(),
    liveDemo: text("live_demo").notNull(),
    techStackIds: integer("tech_stack_ids").array().notNull().default([]),
    status: boolean("status").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const blog = pgTable("blog", {
    id: serial("id").primaryKey(),
    ownerId: integer("owner_id").notNull().references(() => me.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    about: text("about").notNull(),
    image: text("image").notNull(),
    liveLink: text("live_link").notNull(),
    status: boolean("status").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const work = pgTable("work", {
    id: serial("id").primaryKey(),
    ownerId: integer("owner_id").notNull().references(() => me.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    image: text("image").notNull(),
    workDone: text("work_done").notNull(),
    type: text("type").notNull(),
    role: text("role").notNull(),
    timeline: text("timeline").notNull(),
    techStackIds: integer("tech_stack_ids").array().notNull().default([]),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});