"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { contentService } from "@/services/firestore";
import type { HomeSectionConfig, SiteSettings } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialSettings: SiteSettings = {
  siteName: "",
  siteTagline: "",
  heroBadge: "",
  aboutLabel: "",
  navigation: {
    home: "",
    projects: "",
    skills: "",
    experience: "",
    contact: "",
  },
  projects: {
    visible: true,
    label: "",
    heading: "",
    description: "",
    limit: 4,
    viewAllText: "",
  },
  currentWork: {
    visible: true,
    label: "",
    heading: "",
    description: "",
    limit: 3,
    viewAllText: "",
  },
  skills: {
    visible: true,
    label: "",
    heading: "",
    description: "",
    limit: 6,
    viewAllText: "",
  },
  experience: {
    visible: true,
    label: "",
    heading: "",
    description: "",
    limit: 3,
    viewAllText: "",
  },
  contact: {
    visible: true,
    label: "",
    heading: "",
    description: "",
    ctaLabel: "",
  },
  footerText: "",
};

type SectionKey = "projects" | "currentWork" | "skills" | "experience";

function SectionEditor({
  title,
  value,
  onChange,
}: {
  title: string;
  value: HomeSectionConfig;
  onChange: (next: HomeSectionConfig) => void;
}) {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500">Control homepage visibility, copy, and preview count.</p>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={value.visible}
            onChange={(event) => onChange({ ...value, visible: event.target.checked })}
          />
          Show on homepage
        </label>
      </div>
      <Input value={value.label} placeholder="Section label" onChange={(e) => onChange({ ...value, label: e.target.value })} />
      <Input value={value.heading} placeholder="Section heading" onChange={(e) => onChange({ ...value, heading: e.target.value })} />
      <Textarea
        rows={4}
        value={value.description}
        placeholder="Section description"
        onChange={(e) => onChange({ ...value, description: e.target.value })}
      />
      <div className="grid gap-3 md:grid-cols-2">
        <Input
          type="number"
          min={1}
          max={12}
          value={value.limit}
          placeholder="Homepage limit"
          onChange={(e) => onChange({ ...value, limit: Number(e.target.value) || 1 })}
        />
        <Input
          value={value.viewAllText}
          placeholder="View all button text"
          onChange={(e) => onChange({ ...value, viewAllText: e.target.value })}
        />
      </div>
    </Card>
  );
}

export default function SettingsAdminPage() {
  const [data, setData] = useState<SiteSettings>(initialSettings);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    contentService.getSiteSettings().then(setData);
  }, []);

  async function save() {
    setSaving(true);
    try {
      await contentService.saveSiteSettings(data);
      toast.success("Site settings updated");
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  }

  function updateSection(section: SectionKey, next: HomeSectionConfig) {
    setData((current) => ({ ...current, [section]: next }));
  }

  return (
    <div className="space-y-4">
      <Card className="space-y-4">
        <h1 className="text-xl font-semibold">Site Settings</h1>
        <Input value={data.siteName} placeholder="Site name" onChange={(e) => setData({ ...data, siteName: e.target.value })} />
        <Input
          value={data.siteTagline}
          placeholder="Site tagline"
          onChange={(e) => setData({ ...data, siteTagline: e.target.value })}
        />
        <Input value={data.heroBadge} placeholder="Hero badge" onChange={(e) => setData({ ...data, heroBadge: e.target.value })} />
        <Input value={data.aboutLabel} placeholder="About label" onChange={(e) => setData({ ...data, aboutLabel: e.target.value })} />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <Input
            value={data.navigation.home}
            placeholder="Home nav label"
            onChange={(e) => setData({ ...data, navigation: { ...data.navigation, home: e.target.value } })}
          />
          <Input
            value={data.navigation.projects}
            placeholder="Projects nav label"
            onChange={(e) => setData({ ...data, navigation: { ...data.navigation, projects: e.target.value } })}
          />
          <Input
            value={data.navigation.skills}
            placeholder="Skills nav label"
            onChange={(e) => setData({ ...data, navigation: { ...data.navigation, skills: e.target.value } })}
          />
          <Input
            value={data.navigation.experience}
            placeholder="Experience nav label"
            onChange={(e) => setData({ ...data, navigation: { ...data.navigation, experience: e.target.value } })}
          />
          <Input
            value={data.navigation.contact}
            placeholder="Contact nav label"
            onChange={(e) => setData({ ...data, navigation: { ...data.navigation, contact: e.target.value } })}
          />
        </div>
        <Textarea
          rows={3}
          value={data.footerText}
          placeholder="Footer text"
          onChange={(e) => setData({ ...data, footerText: e.target.value })}
        />
      </Card>

      <SectionEditor title="Projects Preview" value={data.projects} onChange={(next) => updateSection("projects", next)} />
      <SectionEditor title="Current Work Preview" value={data.currentWork} onChange={(next) => updateSection("currentWork", next)} />
      <SectionEditor title="Skills Preview" value={data.skills} onChange={(next) => updateSection("skills", next)} />
      <SectionEditor title="Experience Preview" value={data.experience} onChange={(next) => updateSection("experience", next)} />

      <Card className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Contact Section</h2>
            <p className="text-sm text-slate-500">Control the public contact section without changing your contact details.</p>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={data.contact.visible}
              onChange={(event) => setData({ ...data, contact: { ...data.contact, visible: event.target.checked } })}
            />
            Show on homepage
          </label>
        </div>
        <Input
          value={data.contact.label}
          placeholder="Contact label"
          onChange={(e) => setData({ ...data, contact: { ...data.contact, label: e.target.value } })}
        />
        <Input
          value={data.contact.heading}
          placeholder="Contact heading"
          onChange={(e) => setData({ ...data, contact: { ...data.contact, heading: e.target.value } })}
        />
        <Textarea
          rows={4}
          value={data.contact.description}
          placeholder="Contact description"
          onChange={(e) => setData({ ...data, contact: { ...data.contact, description: e.target.value } })}
        />
        <Input
          value={data.contact.ctaLabel}
          placeholder="Contact submit button text"
          onChange={(e) => setData({ ...data, contact: { ...data.contact, ctaLabel: e.target.value } })}
        />
      </Card>

      <Button onClick={save} disabled={saving}>
        {saving ? "Saving..." : "Save Settings"}
      </Button>
    </div>
  );
}
