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
        // Save file to disk/volume
        console.log("Getting storage path...");
        const storageDir = getStoragePath();
        console.log("Storage path:", storageDir);

        const filepath = path.join(storageDir, filename);
        console.log("Writing file to:", filepath);
        await writeFile(filepath, buffer);
        console.log("File written successfully.");

        // Get public URL
        const imageUrl = getPublicUrl(filename);

        // Insert into DB
        console.log("Connecting to DB...");
        const client = await pool.connect();
        try {
            console.log("Inserting record into DB...");
            await client.query(
                "INSERT INTO photos (image_url, uploader_name, note) VALUES ($1, $2, $3)",
                [imageUrl, name || "Misafir", note || ""]
            );
            console.log("DB Insert successful.");
        } finally {
            client.release();
        }

        return NextResponse.json({ success: true, filename, url: imageUrl });
    } catch (error: any) {
        console.error("Upload process failed:", error);
        // Return specific error for debugging purposes
        return NextResponse.json(
            { error: error.message || "Internal Server Error", details: error.toString() },
            { status: 500 }
        );
    }
}
