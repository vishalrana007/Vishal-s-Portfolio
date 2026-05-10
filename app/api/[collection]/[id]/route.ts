import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import {
  deleteCollectionDocument,
  getCollectionDocument,
  updateCollectionDocument,
  type PublicCollection,
} from "@/lib/portfolio-repository";

export const runtime = "nodejs";

const publicCollections = new Set<PublicCollection>(["skills", "projects", "experience", "current-projects"]);

function isPublicCollection(value: string): value is PublicCollection {
  return publicCollections.has(value as PublicCollection);
}

export async function GET(_request: Request, context: RouteContext<"/api/[collection]/[id]">) {
  try {
    const { collection, id } = await context.params;

    if (!isPublicCollection(collection)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const data = await getCollectionDocument(collection, id);
    if (!data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to load document.", error);
    return NextResponse.json({ error: "Unable to load data" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: RouteContext<"/api/[collection]/[id]">) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { collection, id } = await context.params;

    if (!isPublicCollection(collection)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const payload = (await request.json()) as Record<string, unknown>;
    await updateCollectionDocument(collection, id, payload);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to update document.", error);
    return NextResponse.json({ error: "Unable to update data" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: RouteContext<"/api/[collection]/[id]">) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { collection, id } = await context.params;

    if (!isPublicCollection(collection)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await deleteCollectionDocument(collection, id);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Failed to delete document.", error);
    return NextResponse.json({ error: "Unable to delete data" }, { status: 500 });
  }
}
