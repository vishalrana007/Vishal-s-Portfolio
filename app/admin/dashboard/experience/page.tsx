"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { experienceService } from "@/services/firestore";
import type { Experience } from "@/types/content";

type Draft = Omit<Experience, "id">;
const initialDraft: Draft = {
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  description: "",
  achievements: [],
};

export default function ExperienceAdminPage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    setItems(await experienceService.list());
  }

  useEffect(() => {
    experienceService.list().then(setItems);
  }, []);

  async function save() {
    try {
      if (editingId) {
        await experienceService.update(editingId, draft);
      } else {
        await experienceService.create(draft);
      }
      setDraft(initialDraft);
      setEditingId(null);
      await load();
      toast.success(editingId ? "Experience updated" : "Experience added");
    } catch {
      toast.error("Unable to save experience");
    }
  }

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <h1 className="text-xl font-semibold">Experience</h1>
        <Input value={draft.company} placeholder="Company" onChange={(e) => setDraft({ ...draft, company: e.target.value })} />
        <Input value={draft.role} placeholder="Role" onChange={(e) => setDraft({ ...draft, role: e.target.value })} />
        <Input value={draft.startDate} placeholder="Start date" onChange={(e) => setDraft({ ...draft, startDate: e.target.value })} />
        <Input value={draft.endDate} placeholder="End date" onChange={(e) => setDraft({ ...draft, endDate: e.target.value })} />
        <Textarea value={draft.description} placeholder="Description" onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
        <Input
          value={draft.achievements.join(", ")}
          placeholder="Achievements (comma separated)"
          onChange={(e) => setDraft({ ...draft, achievements: e.target.value.split(",").map((item) => item.trim()) })}
        />
        <Button onClick={save}>{editingId ? "Update Experience" : "Add Experience"}</Button>
      </Card>
      <Card>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700">
              <p>{item.role} - {item.company}</p>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setEditingId(item.id);
                    setDraft({
                      company: item.company,
                      role: item.role,
                      startDate: item.startDate,
                      endDate: item.endDate,
                      description: item.description,
                      achievements: item.achievements,
                    });
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  onClick={async () => {
                    await experienceService.remove(item.id);
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
