"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ImageUploader } from "@/components/admin/image-uploader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contentService } from "@/services/firestore";
import type { HeroContent } from "@/types/content";

const initial: HeroContent = {
  title: "",
  role: "",
  subtitle: "",
  ctaText: "",
  ctaHref: "",
  backgroundImage: "",
  profileImage: "",
  typingRoles: [],
};

export default function HeroAdminPage() {
  const [data, setData] = useState<HeroContent>(initial);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    contentService.getHero().then(setData);
  }, []);

  async function save() {
    setSaving(true);
    try {
      await contentService.saveHero(data);
      toast.success("Hero updated");
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="space-y-4">
      <h1 className="text-xl font-semibold">Hero Section</h1>
      <Input placeholder="Title" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
      <Input placeholder="Primary role" value={data.role} onChange={(e) => setData({ ...data, role: e.target.value })} />
      <Textarea
        placeholder="Subtitle"
        value={data.subtitle}
        onChange={(e) => setData({ ...data, subtitle: e.target.value })}
      />
      <Input placeholder="CTA Text" value={data.ctaText} onChange={(e) => setData({ ...data, ctaText: e.target.value })} />
      <Input placeholder="CTA URL" value={data.ctaHref} onChange={(e) => setData({ ...data, ctaHref: e.target.value })} />
      <Input
        placeholder="Typing roles (comma separated)"
        value={data.typingRoles.join(", ")}
        onChange={(e) => setData({ ...data, typingRoles: e.target.value.split(",").map((item) => item.trim()) })}
      />
      <ImageUploader value={data.backgroundImage} onChange={(value) => setData({ ...data, backgroundImage: value })} />
      <ImageUploader value={data.profileImage} onChange={(value) => setData({ ...data, profileImage: value })} />
      <Button onClick={save} disabled={saving}>
        {saving ? "Saving..." : "Save Hero"}
      </Button>
    </Card>
  );
}
