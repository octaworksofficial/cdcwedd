import { NextResponse } from "next/server";
import { getStoragePath } from "@/lib/storage";
import fs from "fs";

export async function GET() {
    try {
        const storageDir = getStoragePath();

        // Read directory
        const files = fs.readdirSync(storageDir);

        // Filter for image files (basic extension check)
        const images = files.filter(file =>
            /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
        ).map(file => ({
            filename: file,
            url: `/api/images/${file}`
        }));

        // Sort by newest first (based on timestamp in filename if available, or fs stats)
        // Since we prefixed with timestamp, reverse alphabetical sort works for "newest first" logic broadly
        // Or we can use file stats.
        const sortedImages = images.sort((a, b) => {
            // Simple string sort descending assuming timestamp prefix
            return b.filename.localeCompare(a.filename);
        });

        return NextResponse.json({ images: sortedImages });
    } catch (error) {
        console.error("Error listing images:", error);
        return NextResponse.json({ images: [] });
    }
}
