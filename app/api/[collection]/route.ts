import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { createCollectionDocument, createMessage, createQuery, listCollection, listMessages, listQueries, type PublicCollection } from "@/lib/portfolio-repository";

export const runtime = "nodejs";

const publicCollections = new Set<PublicCollection>(["skills", "projects", "experience", "current-projects"]);

function isPublicCollection(value: string): value is PublicCollection {
  return publicCollections.has(value as PublicCollection);
}

export async function GET(request: Request, context: RouteContext<"/api/[collection]">) {
  try {
    const { collection } = await context.params;

    if (collection === "messages") {
      const authError = await requireAdmin(request);
      if (authError) return authError;
      return NextResponse.json(await listMessages());
    }

    if (collection === "queries") {
      const authError = await requireAdmin(request);
      if (authError) return authError;
      return NextResponse.json(await listQueries());
    }

    if (!isPublicCollection(collection)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const data = await listCollection(collection);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to list collection.", error);
    return NextResponse.json({ error: "Unable to load data" }, { status: 500 });
  }
}

export async function POST(request: Request, context: RouteContext<"/api/[collection]">) {
  try {
    const { collection } = await context.params;
    const payload = (await request.json()) as Record<string, unknown>;

    if (collection === "messages") {
      const id = await createMessage(payload as { name: string; email: string; subject: string; message: string });
      return NextResponse.json({ id }, { status: 201 });
    }

    if (collection === "queries") {
      const id = await createQuery(payload as { name: string; email: string; subject: string; query: string });
      return NextResponse.json({ id }, { status: 201 });
    }

    if (!isPublicCollection(collection)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const authError = await requireAdmin(request);
    if (authError) return authError;

    const id = await createCollectionDocument(collection, payload);
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error("Failed to create document.", error);
    return NextResponse.json({ error: "Unable to create data" }, { status: 500 });
  }
}
