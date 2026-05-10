"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ImageUploader } from "@/components/admin/image-uploader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { currentProjectsService } from "@/services/firestore";
import type { CurrentProject } from "@/types/content";

type Draft = Omit<CurrentProject, "id">;

const initialDraft: Draft = {
  title: "",
  overview: "",
  imageUrl: "",
};

export default function CurrentProjectsAdminPage() {
  const [items, setItems] = useState<CurrentProject[]>([]);
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    setItems(await currentProjectsService.list());
  }

  useEffect(() => {
    currentProjectsService.list().then(setItems);
  }, []);

  async function save() {
    try {
      if (editingId) {
        await currentProjectsService.update(editingId, draft);
      } else {
        await currentProjectsService.create(draft);
      }
      setDraft(initialDraft);
      setEditingId(null);
      await load();
      toast.success(editingId ? "Current work updated" : "Current work added");
    } catch {
      toast.error("Unable to save current work");
    }
  }

  return (
    <div className="space-y-4">
      <Card className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-slate-900">Currently Working On</h1>
          <p className="text-sm text-slate-500">Add active projects with or without photos and a short overview.</p>
        </div>

        <Input value={draft.title} placeholder="Project title" onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
        <Textarea
          rows={5}
          value={draft.overview}
          placeholder="Overview"
          onChange={(e) => setDraft({ ...draft, overview: e.target.value })}
        />
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
          <div>
            <h2 className="font-semibold text-slate-900">Optional Photo</h2>
            <p className="text-sm text-slate-500">This section also works without an image.</p>
          </div>
          <Input
            value={draft.imageUrl}
            placeholder="Image URL"
            onChange={(e) => setDraft({ ...draft, imageUrl: e.target.value })}
          />
          <ImageUploader value={draft.imageUrl} onChange={(value) => setDraft({ ...draft, imageUrl: value })} />
        </div>

        <Button onClick={save}>{editingId ? "Update Current Work" : "Add Current Work"}</Button>
      </Card>

      <Card className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Active Items</h2>
        <div className="space-y-2">
          {items.length === 0 ? <p className="text-sm text-slate-500">No current work added yet.</p> : null}
          {items.map((item) => (
            <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="text-slate-500">{item.imageUrl ? "Photo added" : "No photo"}</p>
                <p className="mt-2 max-w-3xl text-slate-600">{item.overview}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setEditingId(item.id);
                    setDraft({
                      title: item.title,
                      overview: item.overview,
                      imageUrl: item.imageUrl ?? "",
                    });
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  onClick={async () => {
                    await currentProjectsService.remove(item.id);
                    await load();
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
