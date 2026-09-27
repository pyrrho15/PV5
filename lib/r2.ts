import { S3Client } from "@aws-sdk/client-s3";

// Creates an S3 client configured for Cloudflare R2.
//
// Note: S3_API_ENDPOINT includes the bucket name at the end
// (e.g. https://<account>.r2.cloudflarestorage.com/portfoliov4).
// The S3 client wants only the account endpoint, so we strip the
// trailing bucket name. forcePathStyle is needed for R2.
export function getS3Client() {
    if (!process.env.S3_API_ENDPOINT) {
        throw new Error("S3_API_ENDPOINT is missing from the environment");
    }
    if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
        throw new Error("R2 credentials are missing from the environment");
    }

    const endpoint = process.env.S3_API_ENDPOINT.replace(/\/[^/]+$/, "");

    return new S3Client({
        region: "auto",
        endpoint,
        forcePathStyle: true,
        credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY_ID,
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        },
    });
}

// Builds the public URL we store in the database for a stored object key.
//
// Prefer R2_PUBLIC_URL (an R2.dev URL or custom domain) because the normal
// S3 endpoint requires signed requests and is not publicly readable.
// If R2_PUBLIC_URL is not set we fall back to the S3 endpoint.
export function getPublicFileUrl(key: string) {
    const publicBase = process.env.R2_PUBLIC_URL?.replace(/\/$/, "");
    if (publicBase) {
        return `${publicBase}/${key}`;
    }

    const s3Base = process.env.S3_API_ENDPOINT?.replace(/\/$/, "");
    return `${s3Base}/${key}`;
}