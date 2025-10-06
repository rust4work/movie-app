import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
