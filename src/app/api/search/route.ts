// app/api/search/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}&language=en-US&page=1`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("TMDB API request failed");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
