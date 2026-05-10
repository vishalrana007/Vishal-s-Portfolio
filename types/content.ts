export type HeroContent = {
  title: string;
  role: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  backgroundImage: string;
  profileImage: string;
  typingRoles: string[];
};

export type HomeSectionConfig = {
  visible: boolean;
  label: string;
  heading: string;
  description: string;
  limit: number;
  viewAllText: string;
};

export type ContactSectionSettings = {
  visible: boolean;
  label: string;
  heading: string;
  description: string;
  ctaLabel: string;
};

export type SiteSettings = {
  siteName: string;
  siteTagline: string;
  heroBadge: string;
  aboutLabel: string;
  navigation: {
    home: string;
    projects: string;
    skills: string;
    experience: string;
    contact: string;
  };
  projects: HomeSectionConfig;
  currentWork: HomeSectionConfig;
  skills: HomeSectionConfig;
  experience: HomeSectionConfig;
  contact: ContactSectionSettings;
  footerText: string;
};

export type AboutContent = {
  heading: string;
  bio: string;
  highlights: string[];
};

export type Skill = {
  id: string;
  name: string;
  icon: string;
  level: number;
  category: string;
  description: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  summary: string;
  client: string;
  category: string;
  year: string;
  services: string[];
  techStack: string[];
  imageUrls: string[];
  liveUrl: string;
  sourceUrl: string;
  featured: boolean;
};

export type CurrentProject = {
  id: string;
  title: string;
  overview: string;
  imageUrl: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
};

export type ContactContent = {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

export type QuerySubmission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  query: string;
  createdAt: string;
};
