"use client";

import React, { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import PaginationClient from "@/components/helper/Pagination";
import { Movie } from "@/types/movie.types";
import { Alert } from "antd";

interface RatedResponse {
  results: Movie[];
  total_results: number;
}

export default function RatedPage({
  initialPage = 1,
}: {
  initialPage?: number;
}) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRatedMovies = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const guestId = localStorage.getItem("guest_session_id");
      if (!guestId) throw new Error("Guest session ID not found");

      const res = await fetch(
        `https://api.themoviedb.org/3/guest_session/${guestId}/rated/movies?page=${page}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );

      if (!res.ok) throw new Error("Failed to fetch rated movies");

      const data: RatedResponse = await res.json();
      setMovies(data.results);
      setTotalResults(data.total_results);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatedMovies(currentPage);
  }, [currentPage]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (movies.length === 0)
    return (
      <div className="mt-8">
        <Alert message="Error" description={error} type="error" />
      </div>
    );
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

  return (
    <div className="min-h-screen w-full max-w-[1200px] flex flex-col">
      <div className="flex flex-wrap justify-center gap-8">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} {...movie} />)
        ) : (
          <p className="text-center py-10">No rated movies yet.</p>
        )}
      </div>

      {movies.length > 0 && (
        <div className="flex justify-center py-8">
          <PaginationClient
            current={currentPage}
            total={totalResults}
            pageSize={20}
            basePath="/rated"
          />
        </div>
      )}
    </div>
  );
}
