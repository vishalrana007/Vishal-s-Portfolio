"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { contentService } from "@/services/firestore";
import type { ContactContent } from "@/types/content";

const initial: ContactContent = { email: "", phone: "", location: "", linkedin: "", github: "" };

export default function ContactAdminPage() {
  const [data, setData] = useState<ContactContent>(initial);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    contentService.getContact().then(setData);
  }, []);

  async function save() {
    setSaving(true);
    try {
      await contentService.saveContact(data);
      toast.success("Contact updated");
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="space-y-4">
      <h1 className="text-xl font-semibold">Contact Info</h1>
      <Input value={data.email} placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
      <Input value={data.phone} placeholder="Phone" onChange={(e) => setData({ ...data, phone: e.target.value })} />
      <Input value={data.location} placeholder="Location" onChange={(e) => setData({ ...data, location: e.target.value })} />
      <Input value={data.linkedin} placeholder="LinkedIn URL" onChange={(e) => setData({ ...data, linkedin: e.target.value })} />
      <Input value={data.github} placeholder="GitHub URL" onChange={(e) => setData({ ...data, github: e.target.value })} />
      <Button onClick={save} disabled={saving}>
        {saving ? "Saving..." : "Save Contact"}
      </Button>
    </Card>
  );
}
