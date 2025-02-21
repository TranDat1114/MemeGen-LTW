import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary/cloud-info"; // Reuse Cloudinary configuration

export async function PUT(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const publicId = formData.get("publicId") as string | null;

        if (!file || !publicId) {
            return NextResponse.json({ error: "File and publicId are required" }, { status: 400 });
        }

        // Delete the existing file
        await cloudinary.uploader.destroy(publicId);

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload the new file with the same publicId
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { public_id: publicId, overwrite: true, folder: "uploads" },
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            ).end(buffer);
        });

        return NextResponse.json({ success: true, data: uploadResult });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
