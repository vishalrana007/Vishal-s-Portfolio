"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";

export function ImageUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const inputId = useId();

  async function onFileChange(file: File | null, input: HTMLInputElement | null) {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      onChange(url);
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      if (input) {
        input.value = "";
      }
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative h-40 w-full overflow-hidden rounded-xl border border-white/10">
          <Image src={value} alt="preview" fill className="object-cover" />
        </div>
      ) : null}
      <input
        id={inputId}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={uploading}
        onChange={(event) => onFileChange(event.target.files?.[0] ?? null, event.target)}
      />
      <label
        htmlFor={inputId}
        className={cn(
          "inline-flex cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50",
          uploading && "cursor-not-allowed opacity-50",
        )}
      >
        {uploading ? "Uploading..." : "Upload image"}
      </label>
    </div>
  );
}
