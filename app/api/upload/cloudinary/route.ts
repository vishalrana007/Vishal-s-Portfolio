import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    return NextResponse.json({ error: "Cloudinary env is missing" }, { status: 500 });
  }

  const cloudinaryForm = new FormData();
  cloudinaryForm.append("file", file);
  cloudinaryForm.append("upload_preset", uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: cloudinaryForm,
  });

  if (!response.ok) {
    let error = "Cloudinary upload failed";

    try {
      const data = (await response.json()) as { error?: { message?: string } };
      error = data.error?.message || error;
    } catch {
      // Ignore malformed Cloudinary error payloads.
    }

    return NextResponse.json({ error }, { status: 500 });
  }

  const data = (await response.json()) as { secure_url: string };
  return NextResponse.json({ secureUrl: data.secure_url });
}
