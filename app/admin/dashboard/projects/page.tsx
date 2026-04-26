"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ImageUploader } from "@/components/admin/image-uploader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { projectsService } from "@/services/firestore";
import type { Project } from "@/types/content";

type Draft = Omit<Project, "id">;
const initialDraft: Draft = {
  title: "",
  description: "",
  summary: "",
  client: "",
  category: "",
  year: "",
  services: [],
  techStack: [],
  imageUrls: [],
  liveUrl: "",
  sourceUrl: "",
  featured: false,
};

function splitCommaList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function ProjectsAdminPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    setItems(await projectsService.list());
  }

  useEffect(() => {
    projectsService.list().then(setItems);
  }, []);

  async function save() {
    try {
      if (editingId) {
        await projectsService.update(editingId, draft);
      } else {
        await projectsService.create(draft);
      }
      setDraft(initialDraft);
      setEditingId(null);
      await load();
      toast.success(editingId ? "Project updated" : "Project added");
    } catch {
      toast.error("Unable to save project");
    }
  }

  function updateImageAt(index: number, value: string) {
    setDraft((current) => {
      const imageUrls = [...current.imageUrls];
      imageUrls[index] = value;
      return { ...current, imageUrls };
    });
  }

  function addImageSlot() {
    setDraft((current) => ({ ...current, imageUrls: [...current.imageUrls, ""] }));
  }

  function removeImageAt(index: number) {
    setDraft((current) => ({
      ...current,
      imageUrls: current.imageUrls.filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  return (
    <div className="space-y-4">
      <Card className="space-y-5">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-slate-900">Projects</h1>
          <p className="text-sm text-slate-500">Add richer project information, manage a gallery, and control featured items.</p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Input value={draft.title} placeholder="Project title" onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          <Input value={draft.client} placeholder="Client or brand" onChange={(e) => setDraft({ ...draft, client: e.target.value })} />
          <Input value={draft.category} placeholder="Category" onChange={(e) => setDraft({ ...draft, category: e.target.value })} />
          <Input value={draft.year} placeholder="Year" onChange={(e) => setDraft({ ...draft, year: e.target.value })} />
        </div>

        <Input value={draft.summary} placeholder="Short summary for cards" onChange={(e) => setDraft({ ...draft, summary: e.target.value })} />
        <Textarea value={draft.description} placeholder="Full project description" rows={5} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />

        <div className="grid gap-3 md:grid-cols-2">
          <Input
            value={draft.services.join(", ")}
            placeholder="Services (comma separated)"
            onChange={(e) => setDraft({ ...draft, services: splitCommaList(e.target.value) })}
          />
          <Input
            value={draft.techStack.join(", ")}
            placeholder="Tech stack (comma separated)"
            onChange={(e) => setDraft({ ...draft, techStack: splitCommaList(e.target.value) })}
          />
          <Input value={draft.liveUrl} placeholder="Live URL" onChange={(e) => setDraft({ ...draft, liveUrl: e.target.value })} />
          <Input value={draft.sourceUrl} placeholder="Source URL" onChange={(e) => setDraft({ ...draft, sourceUrl: e.target.value })} />
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={draft.featured}
            onChange={(event) => setDraft({ ...draft, featured: event.target.checked })}
          />
          Feature this project first on the homepage
        </label>

        <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-slate-900">Project Gallery</h2>
              <p className="text-sm text-slate-500">Upload one or many photos. The first image is used as the main cover.</p>
            </div>
            <Button type="button" variant="secondary" onClick={addImageSlot}>
              Add Photo
            </Button>
          </div>

          {draft.imageUrls.length === 0 ? <p className="text-sm text-slate-500">No photos added yet.</p> : null}

          <div className="grid gap-4 lg:grid-cols-2">
            {draft.imageUrls.map((imageUrl, index) => (
              <div key={`${editingId ?? "new"}-${index}`} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-slate-700">Photo {index + 1}</p>
                  <Button type="button" variant="ghost" onClick={() => removeImageAt(index)}>
                    Remove
                  </Button>
                </div>
                <Input value={imageUrl} placeholder="Image URL" onChange={(e) => updateImageAt(index, e.target.value)} />
                <ImageUploader value={imageUrl} onChange={(value) => updateImageAt(index, value)} />
              </div>
            ))}
          </div>
        </div>

        <Button onClick={save}>{editingId ? "Update Project" : "Add Project"}</Button>
      </Card>
      <Card className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Existing Projects</h2>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-slate-900">
                  {item.title}
                  {item.featured ? " (Featured)" : ""}
                </p>
                <p className="text-slate-500">
                  {[item.client, item.category, item.year].filter(Boolean).join(" | ") || "No extra metadata yet"}
                </p>
                <p className="text-slate-500">{item.imageUrls.filter(Boolean).length} photos</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setEditingId(item.id);
                    setDraft({
                      title: item.title,
                      description: item.description,
                      summary: item.summary ?? "",
                      client: item.client ?? "",
                      category: item.category ?? "",
                      year: item.year ?? "",
                      services: item.services ?? [],
                      techStack: item.techStack ?? [],
                      imageUrls: item.imageUrls ?? [],
                      liveUrl: item.liveUrl,
                      sourceUrl: item.sourceUrl,
                      featured: item.featured,
                    });
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  onClick={async () => {
                    await projectsService.remove(item.id);
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
