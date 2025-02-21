import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary/cloud-info";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import dbConnect from "@/lib/mongodb";


export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // get file extension
        const ext = file.name.split('.').pop();

        // new file name random number
        const fileName = `${Date.now()}-${uuidv4()} .${ext}`;

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save temporarily (optional, for debugging)
        const tempPath = path.join(process.cwd(), "public/images", fileName);
        await writeFile(tempPath, buffer);

        // Upload to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload(tempPath, { folder: "uploads" }, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });

        if (uploadResult) {
            // MongoDB: Save the public_id to the database
            await dbConnect();



        }



        return NextResponse.json({ success: true, data: uploadResult });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
