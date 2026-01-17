import path from "path";
import fs from "fs";

// User specified they mounted a volume at /images in Railway
const PROD_UPLOAD_DIR = "/images";
const DEV_UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

export function getStoragePath() {
    const isProd = process.env.NODE_ENV === "production";
    const targetDir = isProd ? PROD_UPLOAD_DIR : DEV_UPLOAD_DIR;

    // Ensure directory exists
    if (!fs.existsSync(targetDir)) {
        try {
            fs.mkdirSync(targetDir, { recursive: true });
        } catch (error) {
            console.error("Error creating upload directory:", error);
        }
    }

    return targetDir;
}

export function getPublicUrl(filename: string) {
    // In production, we serve via API to access the volume
    // In development, we can also serve via API for consistency, 
    // or use the public static path if we save to public/uploads.
    // For simplicity and consistency with the volume requirement, let's use the API route for both,
    // or use conditional logic.

    // Actually, if we use the API route for serving, it works for both cases 
    // as long as the API route knows where to look.
    return `/api/images/${filename}`;
}
