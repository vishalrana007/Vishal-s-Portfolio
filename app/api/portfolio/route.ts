import { NextResponse } from "next/server";
import { getPortfolioData } from "@/lib/portfolio-repository";

export const runtime = "nodejs";

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to load portfolio data.", error);
    return NextResponse.json({ error: "Unable to load portfolio data" }, { status: 500 });
  }
}
