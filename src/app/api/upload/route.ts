import { NextResponse } from "next/server";
import { getStoragePath, getPublicUrl } from "@/lib/storage";
import path from "path";
import { writeFile } from "fs/promises";
import pool from "@/lib/db";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const name = formData.get("name") as string;
        const note = formData.get("note") as string;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create a unique filename
        const timestamp = Date.now();
        const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
        const filename = `${timestamp}-${cleanName}`;

        // Save file to disk/volume
        const storageDir = getStoragePath();
        const filepath = path.join(storageDir, filename);
        await writeFile(filepath, buffer);

        // Get public URL
        const imageUrl = getPublicUrl(filename);

        // Insert into DB
        const client = await pool.connect();
        try {
            await client.query(
                "INSERT INTO photos (image_url, uploader_name, note) VALUES ($1, $2, $3)",
                [imageUrl, name || "Misafir", note || ""]
            );
        } finally {
            client.release();
        }

        return NextResponse.json({ success: true, filename, url: imageUrl });
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
