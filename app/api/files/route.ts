import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getS3Client, getPublicFileUrl } from "@/lib/r2";

// This route needs Node.js APIs (Buffer, AWS SDK), so keep it on the
// Node.js runtime (the default) instead of Edge.
export const runtime = "nodejs";

// Only these folders are allowed. This keeps uploaded files organized
// and prevents someone from writing to arbitrary keys.
const ALLOWED_FOLDERS = ["profile", "projects", "blogs", "work"];

// POST /api/files
// Receives a file via FormData, uploads it to R2 and returns its public URL.
export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file = data.get("file") as File | null;
        const folder = String(data.get("folder") || "");

        if (!file) {
            return NextResponse.json(
                { success: false, message: "No file provided" },
                { status: 400 }
            );
        }

        if (!ALLOWED_FOLDERS.includes(folder)) {
            return NextResponse.json(
                { success: false, message: "Invalid folder" },
                { status: 400 }
            );
        }

        // Keep it simple: only images, and under 1MB.
        if (!file.type.startsWith("image/")) {
            return NextResponse.json(
                { success: false, message: "Only image files are allowed" },
                { status: 400 }
            );
        }

        const sizeInMB = file.size / 1000000;
        if (sizeInMB > 1) {
            return NextResponse.json(
                { success: false, message: "File size should be under 1MB" },
                { status: 400 }
            );
        }

        // Build a flat key like "projects/1737400000-screenshot.png".
        // We clean the file name so weird characters can't break the key.
        const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
        const fileKey = `${folder}/${Date.now()}-${safeName}`;

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const s3 = getS3Client();
        await s3.send(
            new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME as string,
                Key: fileKey,
                Body: buffer,
                ContentType: file.type,
            })
        );

        // Save this URL directly into the parent record's image column.
        const url = getPublicFileUrl(fileKey);

        return NextResponse.json({ success: true, url, key: fileKey });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Upload failed" },
            { status: 500 }
        );
    }
}