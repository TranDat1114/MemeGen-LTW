import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary/cloud-info";

export async function DELETE(req: Request) {
    try {
        const { publicId } = await req.json();

        if (!publicId) {
            return NextResponse.json({ error: "No publicId provided" }, { status: 400 });
        }

        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result === "not found") {
            return NextResponse.json({ error: "Image not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, result });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
