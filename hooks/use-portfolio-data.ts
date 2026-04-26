"use client";

import { useEffect, useState } from "react";
import { portfolioService } from "@/services/firestore";
import type { AboutContent, ContactContent, Experience, HeroContent, Project, SiteSettings, Skill } from "@/types/content";

type PortfolioData = {
  hero: HeroContent;
  about: AboutContent;
  contact: ContactContent;
  siteSettings: SiteSettings;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
};

const initialState: PortfolioData = {
  hero: {
    title: "",
    role: "",
    subtitle: "",
    ctaText: "",
    ctaHref: "",
    backgroundImage: "",
    profileImage: "",
    typingRoles: [],
  },
  about: { heading: "", bio: "", highlights: [] },
  contact: { email: "", phone: "", location: "", linkedin: "", github: "" },
  siteSettings: {
    siteName: "",
    siteTagline: "",
    heroBadge: "",
    aboutLabel: "",
    navigation: { home: "", projects: "", skills: "", experience: "", contact: "" },
    projects: { visible: true, label: "", heading: "", description: "", limit: 4, viewAllText: "" },
    skills: { visible: true, label: "", heading: "", description: "", limit: 6, viewAllText: "" },
    experience: { visible: true, label: "", heading: "", description: "", limit: 3, viewAllText: "" },
    contact: { visible: true, label: "", heading: "", description: "", ctaLabel: "" },
    footerText: "",
  },
  skills: [],
  projects: [],
  experience: [],
};

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    portfolioService
      .getAll()
      .then(({ hero, about, contact, siteSettings, skills, projects, experience }) => {
        if (!mounted) return;
        setData({ hero, about, contact, siteSettings, skills, projects, experience });
      })
      .catch((err) => {
        console.error("Failed to load portfolio data from Firestore.", err);
        if (!mounted) return;
        setError("Unable to load portfolio data.");
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}
