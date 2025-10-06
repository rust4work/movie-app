import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data); // ✅ правильно
}
