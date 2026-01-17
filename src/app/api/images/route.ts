import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
    try {
        const client = await pool.connect();
        try {
            // Fetch photos ordered by creation time descending
            const result = await client.query(
                "SELECT * FROM photos ORDER BY created_at DESC"
            );

            // Transform keys to match frontend expectation (or update frontend to match DB)
            const images = result.rows.map(row => ({
                id: row.id,
                filename: row.image_url.split('/').pop(), // Extract filename from URL for key usage if needed
                url: row.image_url,
                uploader: row.uploader_name,
                note: row.note,
                createdAt: row.created_at
            }));

            return NextResponse.json({ images });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Error listing images from DB:", error);
        return NextResponse.json({ images: [] });
    }
}
