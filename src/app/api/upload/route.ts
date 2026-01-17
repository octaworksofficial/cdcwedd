import { NextResponse } from "next/server";
import { getStoragePath } from "@/lib/storage";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create a unique filename to avoid collisions
        const timestamp = Date.now();
        const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
        const filename = `${timestamp}-${cleanName}`;

        const storageDir = getStoragePath();
        const filepath = path.join(storageDir, filename);

        await writeFile(filepath, buffer);

        return NextResponse.json({ success: true, filename });
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
