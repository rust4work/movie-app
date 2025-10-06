"use client";
import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie.types";
import { Spin, Pagination } from "antd";

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/rated?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);

        setTotalResults(data.total_results || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {loading ? (
        <div className="flex justify-center items-center flex-1">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-8 p-4 flex-1">
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

          <div className="flex justify-center p-8">
            <Pagination
              current={currentPage}
              total={totalResults}
              pageSize={20}
              onChange={handlePageChange}
              showSizeChanger={false}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} movies`
              }
            />
          </div>
        </>
      )}
    </div>
  );
}
