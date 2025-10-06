"use client";
import { Movie } from "@/types/movie.types";
import { Input, Spin } from "antd";
import MovieCard from "@/components/MovieCard";

import { useState, useEffect, useCallback } from "react";

function debounce<T extends (...args: never[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

export default function Search() {
  const [searchItem, setSearchItem] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = useCallback(
    debounce((query: string) => {
      if (!query.trim()) {
        setMovies([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }, 500),
    []
  );

  useEffect(() => {
    fetchMovies(searchItem);
  }, [searchItem, fetchMovies]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 ">
      <div className="sticky top-0 z-50 bg-white p-4 ">
        <Input
          className="sticky"
          placeholder="Type to search movies..."
          size="large"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          allowClear
        />
      </div>

      {loading && (
        <div className="flex justify-center items-center flex-1 mt-10">
          <Spin size="large" />
        </div>
      )}

      {!loading && searchItem && movies.length === 0 && (
        <div className="mt-4 text-center text-gray-500">
          No movies found for `{searchItem}`
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-4">
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
    </div>
  );
}
