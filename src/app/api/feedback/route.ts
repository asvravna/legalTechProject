// src/app/api/feedback/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message, email, path } = await request.json();

    // Basic validation
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    // For now, just log it – later you can:
    // - write to a DB
    // - send to Slack / email
    // - append to a file, etc.
    console.log("Feedback received:", {
      message,
      email: email || null,
      path: path || null,
      at: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Feedback error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
