import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import {
  defaultAbout,
  defaultContact,
  defaultHero,
  defaultSiteSettings,
  getSingleton,
  setSingleton,
} from "@/lib/portfolio-repository";

export const runtime = "nodejs";

const sections = {
  hero: { collectionName: "hero", fallback: defaultHero },
  about: { collectionName: "about", fallback: defaultAbout },
  contacts: { collectionName: "contacts", fallback: defaultContact },
  "site-settings": { collectionName: "siteSettings", fallback: defaultSiteSettings },
} as const;

function isSection(value: string): value is keyof typeof sections {
  return value in sections;
}

export async function GET(_request: Request, context: RouteContext<"/api/content/[section]">) {
  try {
    const { section } = await context.params;
    if (!isSection(section)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const config = sections[section];
    const data = await getSingleton(config.collectionName, config.fallback);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to load content section.", error);
    return NextResponse.json({ error: "Unable to load content" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: RouteContext<"/api/content/[section]">) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { section } = await context.params;
    if (!isSection(section)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const config = sections[section];
    const payload = (await request.json()) as Record<string, unknown>;
    await setSingleton(config.collectionName, payload);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to update content section.", error);
    return NextResponse.json({ error: "Unable to update content" }, { status: 500 });
  }
}
