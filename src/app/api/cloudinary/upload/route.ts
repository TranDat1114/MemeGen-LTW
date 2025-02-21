import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary/cloud-info";
import type { UploadApiResponse } from "cloudinary";
import { unlink, writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import dbConnect from "@/lib/mongodb";
import { CloudinaryImageService } from "@/backend/services/cloudinary-image";
import { mapUploadResponseDTOtoEntity } from "@/backend/mappers/cloudinary-image";

const cloudinaryImageService = new CloudinaryImageService();

export async function POST(req: Request) {
    let tempPath = "";
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
        tempPath = path.join(process.cwd(), "public/images", fileName);
        await writeFile(tempPath, buffer);
        // Upload to Cloudinary
        const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
            cloudinary.uploader.upload(tempPath, { folder: "uploads" }, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result as UploadApiResponse);
            });
        });

        if (uploadResult) {
            // MongoDB: Save the public_id to the database
            await dbConnect();

            cloudinaryImageService.createImage(await mapUploadResponseDTOtoEntity(uploadResult));

            //delete the temporary file after upload
            await unlink(tempPath);

        }
        return NextResponse.json({ success: true, data: uploadResult });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    } finally {
        await unlink(tempPath).catch(() => {

        }); // Ensures deletion even on failure
    }
}
