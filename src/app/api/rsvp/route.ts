import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fullName, phoneNumber, guestCount, attending } = body;

        // Basic validation
        if (!fullName || attending === undefined) {
            return NextResponse.json(
                { error: "İsim ve katılım durumu zorunludur." },
                { status: 400 }
            );
        }

        const client = await pool.connect();
        try {
            await client.query(
                "INSERT INTO rsvps (full_name, phone_number, guest_count, attending) VALUES ($1, $2, $3, $4)",
                [fullName, phoneNumber || "", guestCount || 1, attending === 'yes']
            );
        } finally {
            client.release();
        }

        return NextResponse.json({ success: true, message: "Kayıt başarılı." });
    } catch (error) {
        console.error("RSVP Error:", error);
        return NextResponse.json(
            { error: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin." },
            { status: 500 }
        );
    }
}
