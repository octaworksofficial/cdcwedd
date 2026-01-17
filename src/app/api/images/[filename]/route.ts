import { NextResponse } from "next/server";
import { getStoragePath } from "@/lib/storage";
import path from "path";
import fs from "fs";

// We need a way to determine mime type. Since we can't easily npm install in this environment without user interaction,
// I'll implement a simple lookup or try to use a built-in way if possible.
// Actually, I can just use a simple mapping or `mime` package if it was installed.
// Assuming minimal dependencies, I'll write a simple helper.

function getMimeType(filename: string) {
    const ext = path.extname(filename).toLowerCase();
    switch (ext) {
        case ".jpg":
        case ".jpeg":
            return "image/jpeg";
        case ".png":
            return "image/png";
        case ".gif":
            return "image/gif";
        case ".webp":
            return "image/webp";
        case ".svg":
            return "image/svg+xml";
        default:
            return "application/octet-stream";
    }
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ filename: string }> }
) {
    try {
        const filename = (await params).filename;

        // Basic security check to prevent directory traversal
        if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
            return new NextResponse("Invalid filename", { status: 400 });
        }

        const storageDir = getStoragePath();
        const filepath = path.join(storageDir, filename);

        if (!fs.existsSync(filepath)) {
            return new NextResponse("File not found", { status: 404 });
        }

        const fileBuffer = fs.readFileSync(filepath);
        const contentType = getMimeType(filename);

        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("Error serving image:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
