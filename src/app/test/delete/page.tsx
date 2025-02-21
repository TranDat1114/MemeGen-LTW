"use client";

import { useState } from "react";

export default function UploadForm() {
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");
    const [publicId, setPublicId] = useState("");

    const handleUpload = async () => {
        if (!image) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("file", image);

        const res = await fetch("/api/cloudinary/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setLoading(false);

        if (data.success) {
            setUrl(data.data.secure_url);
            setPublicId(data.data.public_id);
        } else {
            alert("Upload failed!");
        }
    };

    const handleDelete = async () => {
        if (!publicId) return;

        setLoading(true);

        const res = await fetch("/api/cloudinary/delete", {
            method: "DELETE",
            body: JSON.stringify({ publicId }),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        setLoading(false);

        if (data.success) {
            setUrl("");
            setPublicId("");
            alert("Image deleted successfully!");
        } else {
            alert("Delete failed!");
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? "Uploading..." : "Upload"}
            </button>

            {url && (
                <div>
                    <p>Uploaded Image:</p>
                    <img src={url} alt="Uploaded" width={300} />
                    <button onClick={handleDelete} disabled={loading}>
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            )}
        </div>
    );
}
