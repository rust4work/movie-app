import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie.types";
import PaginationClient from "@/components/helper/Pagination";

interface RatedResponse {
  results: Movie[];
  total_results: number;
}

async function getRatedMovies(page: number = 1): Promise<RatedResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
  }

  const res = await fetch(`${baseUrl}/api/rated?page=${page}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch rated movies");
  }

  return res.json();
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;

  const { results: movies, total_results } = await getRatedMovies(currentPage);

  return (
    <div className="min-h-screen w-full max-w-[1200px] flex flex-col">
      <div className="flex flex-wrap justify-center gap-8  ">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            release_date={movie.release_date}
            vote_average={movie.vote_average}
            poster_path={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            overview={movie.overview || "No overview available."}
            genre_ids={movie.genre_ids}
            popularity={movie.popularity}
          />
        ))}
      </div>

      <div className="flex justify-center py-8">
        <PaginationClient
          current={currentPage}
          total={total_results}
          pageSize={20}
          basePath="/rated"
        />
      </div>
    </div>
  );
}
