import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "12");
        const offset = (page - 1) * limit;

        const client = await pool.connect();
        try {
            // Fetch photos ordered by creation time descending with pagination
            const result = await client.query(
                "SELECT * FROM photos ORDER BY created_at DESC LIMIT $1 OFFSET $2",
                [limit, offset]
            );

            // Check if there are more photos
            // A simple way is to check if we got a full page. 
            // Ideally, we'd do a count, but for "Load More" check, this is often enough approximation 
            // or we can fetch limit + 1 to know for sure.
            // Let's stick to simple limit for now.

            const images = result.rows.map(row => ({
                id: row.id,
                filename: row.image_url.split('/').pop(),
                url: row.image_url,
                uploader: row.uploader_name,
                note: row.note,
                createdAt: row.created_at
            }));

            return NextResponse.json({ images, hasMore: images.length === limit });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Error listing images from DB:", error);
        return NextResponse.json({ images: [], hasMore: false });
    }
}
