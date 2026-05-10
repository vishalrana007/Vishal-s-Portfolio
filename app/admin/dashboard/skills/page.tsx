"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ImageUploader } from "@/components/admin/image-uploader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { skillsService } from "@/services/firestore";
import type { Skill } from "@/types/content";

type Draft = Omit<Skill, "id">;
const initialDraft: Draft = { name: "", icon: "", level: 50, category: "", description: "" };

export default function SkillsAdminPage() {
  const [items, setItems] = useState<Skill[]>([]);
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    setItems(await skillsService.list());
  }

  useEffect(() => {
    skillsService.list().then(setItems);
  }, []);

  async function save() {
    try {
      if (editingId) {
        await skillsService.update(editingId, draft);
      } else {
        await skillsService.create(draft);
      }
      setDraft(initialDraft);
      setEditingId(null);
      await load();
      toast.success(editingId ? "Skill updated" : "Skill added");
    } catch {
      toast.error("Unable to save skill");
    }
  }

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <h1 className="text-xl font-semibold">Skills</h1>
        <Input value={draft.name} placeholder="Name" onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
        <ImageUploader value={draft.icon} onChange={(value) => setDraft({ ...draft, icon: value })} />
        <Input value={draft.category} placeholder="Category" onChange={(e) => setDraft({ ...draft, category: e.target.value })} />
        <Textarea
          value={draft.description}
          placeholder="Description"
          rows={4}
          onChange={(e) => setDraft({ ...draft, description: e.target.value })}
        />
        <Input
          type="number"
          min={0}
          max={100}
          value={draft.level}
          placeholder="Level 0-100"
          onChange={(e) => setDraft({ ...draft, level: Number(e.target.value) })}
        />
        <Button onClick={save}>{editingId ? "Update Skill" : "Add Skill"}</Button>
      </Card>
      <Card>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700">
              <p>
                {item.name} ({item.level}%)
              </p>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setEditingId(item.id);
                    setDraft({
                      name: item.name,
                      icon: item.icon,
                      level: item.level,
                      category: item.category,
                      description: item.description ?? "",
                    });
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  onClick={async () => {
                    await skillsService.remove(item.id);
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
