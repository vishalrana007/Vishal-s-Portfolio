"use client";

import { auth } from "@/lib/firebase";
import type {
  AboutContent,
  ContactContent,
  ContactMessage,
  CurrentProject,
  Experience,
  HeroContent,
  Project,
  QuerySubmission,
  SiteSettings,
  Skill,
} from "@/types/content";

type PortfolioData = {
  hero: HeroContent;
  about: AboutContent;
  contact: ContactContent;
  siteSettings: SiteSettings;
  skills: Skill[];
  projects: Project[];
  currentProjects: CurrentProject[];
  experience: Experience[];
};

async function request<T>(input: string, init?: RequestInit, requireAdmin = false): Promise<T> {
  const headers = new Headers(init?.headers);

  if (!(init?.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (requireAdmin) {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("You must be signed in to perform this action.");
    }
    headers.set("Authorization", `Bearer ${await user.getIdToken()}`);
  }

  const response = await fetch(input, {
    ...init,
    headers,
  });

  if (!response.ok) {
    let message = "Request failed";

    try {
      const data = (await response.json()) as { error?: string };
      if (data.error) {
        message = data.error;
      }
    } catch {
      // Ignore non-JSON error payloads.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const portfolioService = {
  getAll: () => request<PortfolioData>("/api/portfolio"),
};

export const contentService = {
  getHero: () => request<HeroContent>("/api/content/hero"),
  saveHero: (payload: HeroContent) =>
    request<{ ok: true }>("/api/content/hero", { method: "PUT", body: JSON.stringify(payload) }, true),

  getAbout: () => request<AboutContent>("/api/content/about"),
  saveAbout: (payload: AboutContent) =>
    request<{ ok: true }>("/api/content/about", { method: "PUT", body: JSON.stringify(payload) }, true),

  getContact: () => request<ContactContent>("/api/content/contacts"),
  saveContact: (payload: ContactContent) =>
    request<{ ok: true }>("/api/content/contacts", { method: "PUT", body: JSON.stringify(payload) }, true),

  getSiteSettings: () => request<SiteSettings>("/api/content/site-settings"),
  saveSiteSettings: (payload: SiteSettings) =>
    request<{ ok: true }>("/api/content/site-settings", { method: "PUT", body: JSON.stringify(payload) }, true),
};

export const skillsService = {
  list: () => request<Skill[]>("/api/skills"),
  create: (payload: Omit<Skill, "id">) =>
    request<{ id: string }>("/api/skills", { method: "POST", body: JSON.stringify(payload) }, true),
  update: (id: string, payload: Omit<Skill, "id">) =>
    request<{ ok: true }>(`/api/skills/${id}`, { method: "PUT", body: JSON.stringify(payload) }, true),
  remove: (id: string) => request<void>(`/api/skills/${id}`, { method: "DELETE" }, true),
  getById: (id: string) => request<Skill>(`/api/skills/${id}`),
};

export const projectsService = {
  list: () => request<Project[]>("/api/projects"),
  create: (payload: Omit<Project, "id">) =>
    request<{ id: string }>("/api/projects", { method: "POST", body: JSON.stringify(payload) }, true),
  update: (id: string, payload: Omit<Project, "id">) =>
    request<{ ok: true }>(`/api/projects/${id}`, { method: "PUT", body: JSON.stringify(payload) }, true),
  remove: (id: string) => request<void>(`/api/projects/${id}`, { method: "DELETE" }, true),
  getById: (id: string) => request<Project>(`/api/projects/${id}`),
};

export const experienceService = {
  list: () => request<Experience[]>("/api/experience"),
  create: (payload: Omit<Experience, "id">) =>
    request<{ id: string }>("/api/experience", { method: "POST", body: JSON.stringify(payload) }, true),
  update: (id: string, payload: Omit<Experience, "id">) =>
    request<{ ok: true }>(`/api/experience/${id}`, { method: "PUT", body: JSON.stringify(payload) }, true),
  remove: (id: string) => request<void>(`/api/experience/${id}`, { method: "DELETE" }, true),
  getById: (id: string) => request<Experience>(`/api/experience/${id}`),
};

export const currentProjectsService = {
  list: () => request<CurrentProject[]>("/api/current-projects"),
  create: (payload: Omit<CurrentProject, "id">) =>
    request<{ id: string }>("/api/current-projects", { method: "POST", body: JSON.stringify(payload) }, true),
  update: (id: string, payload: Omit<CurrentProject, "id">) =>
    request<{ ok: true }>(`/api/current-projects/${id}`, { method: "PUT", body: JSON.stringify(payload) }, true),
  remove: (id: string) => request<void>(`/api/current-projects/${id}`, { method: "DELETE" }, true),
  getById: (id: string) => request<CurrentProject>(`/api/current-projects/${id}`),
};

export const messagesService = {
  list: () => request<ContactMessage[]>("/api/messages", undefined, true),
  create: (payload: Omit<ContactMessage, "id" | "createdAt">) =>
    request<{ id: string }>("/api/messages", { method: "POST", body: JSON.stringify(payload) }),
};

export const queriesService = {
  list: () => request<QuerySubmission[]>("/api/queries", undefined, true),
  create: (payload: Omit<QuerySubmission, "id" | "createdAt">) =>
    request<{ id: string }>("/api/queries", { method: "POST", body: JSON.stringify(payload) }),
};
