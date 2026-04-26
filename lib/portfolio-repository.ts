import "server-only";

import { adminDb } from "@/lib/firebase-admin";
import type {
  AboutContent,
  ContactContent,
  ContactMessage,
  Experience,
  HeroContent,
  Project,
  SiteSettings,
  Skill,
} from "@/types/content";

const singletonDoc = "content";

export const defaultHero: HeroContent = {
  title: "",
  role: "",
  subtitle: "",
  ctaText: "",
  ctaHref: "",
  backgroundImage: "",
  profileImage: "",
  typingRoles: [],
};

export const defaultAbout: AboutContent = {
  heading: "",
  bio: "",
  highlights: [],
};

export const defaultContact: ContactContent = {
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
};

export const defaultSiteSettings: SiteSettings = {
  siteName: "Portfolio",
  siteTagline: "Selected work and creative execution.",
  heroBadge: "Creative portfolio",
  aboutLabel: "About",
  navigation: {
    home: "Home",
    projects: "Projects",
    skills: "Skills",
    experience: "Experience",
    contact: "Contact",
  },
  projects: {
    visible: true,
    label: "Portfolio",
    heading: "Selected projects",
    description: "A focused preview of recent work. Use the full archive page to explore every project in detail.",
    limit: 4,
    viewAllText: "View all projects",
  },
  skills: {
    visible: true,
    label: "Skills",
    heading: "Core capabilities",
    description: "A short list of strengths on the homepage, with the complete skill catalog moved to a dedicated page.",
    limit: 6,
    viewAllText: "View all skills",
  },
  experience: {
    visible: true,
    label: "Experience",
    heading: "Selected experience",
    description: "A concise timeline for the homepage and a separate page for the full experience history.",
    limit: 3,
    viewAllText: "View all experience",
  },
  contact: {
    visible: true,
    label: "Contact",
    heading: "Start a project",
    description: "Use the admin dashboard to update this invitation, your contact details, and the form destination.",
    ctaLabel: "Send message",
  },
  footerText: "Built to present selected work with cinematic clarity.",
};

export type PublicCollection = "skills" | "projects" | "experience";
export type ContentSection = "hero" | "about" | "contacts" | "siteSettings";

export async function getSingleton<T>(collectionName: string, fallback: T): Promise<T> {
  const snapshot = await adminDb.collection(collectionName).doc(singletonDoc).get();
  return snapshot.exists ? (snapshot.data() as T) : fallback;
}

export async function setSingleton<T extends Record<string, unknown>>(collectionName: string, payload: T) {
  await adminDb.collection(collectionName).doc(singletonDoc).set(payload, { merge: true });
}

export async function listCollection<T>(collectionName: PublicCollection): Promise<T[]> {
  const snapshot = await adminDb.collection(collectionName).get();
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as T);
}

export async function getCollectionDocument<T>(collectionName: PublicCollection, id: string): Promise<T | null> {
  const snapshot = await adminDb.collection(collectionName).doc(id).get();
  if (!snapshot.exists) return null;
  return { id: snapshot.id, ...snapshot.data() } as T;
}

export async function createCollectionDocument<T extends Record<string, unknown>>(collectionName: PublicCollection, payload: T) {
  const snapshot = await adminDb.collection(collectionName).add(payload);
  return snapshot.id;
}

export async function updateCollectionDocument<T extends Record<string, unknown>>(collectionName: PublicCollection, id: string, payload: T) {
  await adminDb.collection(collectionName).doc(id).set(payload, { merge: true });
}

export async function deleteCollectionDocument(collectionName: PublicCollection, id: string) {
  await adminDb.collection(collectionName).doc(id).delete();
}

export async function listMessages(): Promise<ContactMessage[]> {
  const snapshot = await adminDb.collection("messages").orderBy("createdAt", "desc").get();
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as ContactMessage);
}

export async function createMessage(payload: Omit<ContactMessage, "id" | "createdAt">) {
  const snapshot = await adminDb.collection("messages").add({
    ...payload,
    createdAt: new Date().toISOString(),
  });
  return snapshot.id;
}

export async function getPortfolioData() {
  const [hero, about, contact, siteSettings, skills, projects, experience] = await Promise.all([
    getSingleton("hero", defaultHero),
    getSingleton("about", defaultAbout),
    getSingleton("contacts", defaultContact),
    getSingleton("siteSettings", defaultSiteSettings),
    listCollection<Skill>("skills"),
    listCollection<Project>("projects"),
    listCollection<Experience>("experience"),
  ]);

  return {
    hero,
    about,
    contact,
    siteSettings,
    skills,
    projects,
    experience,
  };
}
