"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contentService } from "@/services/firestore";
import type { AboutContent } from "@/types/content";

const initial: AboutContent = { heading: "", bio: "", highlights: [] };

export default function AboutAdminPage() {
  const [data, setData] = useState<AboutContent>(initial);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    contentService.getAbout().then(setData);
  }, []);

  async function save() {
    setSaving(true);
    try {
      await contentService.saveAbout(data);
      toast.success("About updated");
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="space-y-4">
      <h1 className="text-xl font-semibold">About Section</h1>
      <Input value={data.heading} placeholder="Heading" onChange={(e) => setData({ ...data, heading: e.target.value })} />
      <Textarea value={data.bio} placeholder="Bio" rows={6} onChange={(e) => setData({ ...data, bio: e.target.value })} />
      <Input
        value={data.highlights.join(", ")}
        placeholder="Highlights (comma separated)"
        onChange={(e) => setData({ ...data, highlights: e.target.value.split(",").map((item) => item.trim()) })}
      />
      <Button onClick={save} disabled={saving}>
        {saving ? "Saving..." : "Save About"}
      </Button>
    </Card>
  );
}
