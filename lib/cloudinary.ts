export async function uploadToCloudinary(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload/cloudinary", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let message = "Image upload failed";

    try {
      const data = (await response.json()) as { error?: string };
      message = data.error || message;
    } catch {
      // Ignore non-JSON error payloads.
    }

    throw new Error(message);
  }

  const data = (await response.json()) as { secureUrl: string };
  return data.secureUrl;
}
