"use client";
import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie.types";
import { Spin } from "antd";

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/rated")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return loading ? (
    <Spin size="large" />
  ) : (
    <div className="flex flex-wrap justify-center gap-4 max-w-screen p-4">
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
        />
      ))}
    </div>
  );
}
