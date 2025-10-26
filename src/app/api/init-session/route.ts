// /app/api/init-session/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${process.env.TMDB_API_KEY}`
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to create guest session" },
      { status: 500 }
    );
  }

  const data = await res.json(); // { guest_session_id, expires_at, success }

  // Just return the guest session ID; no cookies needed
  return NextResponse.json({ guest_session_id: data.guest_session_id });
}
