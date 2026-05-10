import "server-only";

import { adminDb } from "@/lib/firebase-admin";
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
  instagram: "",
  whatsapp: "",
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
    description: "A curated selection of projects that showcase my skills, creativity, and impact. Each project highlights the challenges faced, the solutions implemented, and the results achieved. Explore these case studies to see how I approach design and development with a focus on user experience and practical delivery.",
    limit: 4,
    viewAllText: "View all projects",
  },
  currentWork: {
    visible: true,
    label: "Now building",
    heading: "Currently working on",
    description: "A quick look at the products, experiments, and builds that are actively in progress right now.",
    limit: 3,
    viewAllText: "",
  },
  skills: {
    visible: true,
    label: "Skills",
    heading: "Core capabilities",
    description: "A snapshot of my primary skills and tools. Visit the full skills page for a comprehensive list and proficiency levels.",
    limit: 6,
    viewAllText: "View all skills",
  },
  experience: {
    visible: true,
    label: "Experience",
    heading: "Selected experience",
    description: "A quick overview of my journey—explore the full experience for more details.",
    limit: 3,
    viewAllText: "View all experience",
  },
  contact: {
    visible: true,
    label: "Contact",
    heading: "Start a project",
    description: "I'm currently open to new opportunities and collaborations. Whether you have a project in mind or just want to say hi, feel free to reach out using the contact information provided or by sending a message through the form.",
    ctaLabel: "Send message",
  },
  footerText: "Built to present selected work with cinematic clarity.",
};

export type PublicCollection = "skills" | "projects" | "experience" | "current-projects";
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

export async function listQueries(): Promise<QuerySubmission[]> {
  const snapshot = await adminDb.collection("queries").orderBy("createdAt", "desc").get();
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as QuerySubmission);
}

export async function createQuery(payload: Omit<QuerySubmission, "id" | "createdAt">) {
  const snapshot = await adminDb.collection("queries").add({
    ...payload,
    createdAt: new Date().toISOString(),
  });
  return snapshot.id;
}

export async function getPortfolioData() {
  const [hero, about, contact, siteSettings, skills, projects, currentProjects, experience] = await Promise.all([
    getSingleton("hero", defaultHero),
    getSingleton("about", defaultAbout),
    getSingleton("contacts", defaultContact),
    getSingleton("siteSettings", defaultSiteSettings),
    listCollection<Skill>("skills"),
    listCollection<Project>("projects"),
    listCollection<CurrentProject>("current-projects"),
    listCollection<Experience>("experience"),
  ]);

  return {
    hero,
    about,
    contact,
    siteSettings,
    skills,
    projects,
    currentProjects,
    experience,
  };
}
