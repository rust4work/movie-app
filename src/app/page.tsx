"use client";

import { useState, useEffect, useMemo } from "react";
import { Input, Spin } from "antd";
import debounce from "lodash.debounce";

import { Movie } from "@/types/movie.types";
import MovieCard from "@/components/MovieCard";
import PaginationClient from "@/components/helper/Pagination";

export default function Search() {
  const [searchItem, setSearchItem] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Функция поиска с debounce
  const fetchMovies = useMemo(
    () =>
      debounce((query: string, page: number) => {
        if (!query.trim()) return;

        setLoading(true);
        fetch(`/api/search?q=${encodeURIComponent(query)}&page=${page}`)
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
      }, 500),
    []
  );

  const fetchTopRated = (page: number) => {
    setLoading(true);
    fetch(`/api/rated?page=${page}`)
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
  };

  useEffect(() => {
    if (searchItem.trim()) {
      fetchMovies(searchItem, currentPage);
    } else {
      fetchTopRated(currentPage);
    }
  }, [searchItem, currentPage, fetchMovies]);

  return (
    <div className="w-screen max-w-[1200px] mx-auto py-4">
      {/* Input */}
      <div className="sticky top-0 z-[100] w-full bg-white p-4 flex justify-center shadow-lg">
        <Input
          placeholder="Type to search movies..."
          size="large"
          value={searchItem}
          onChange={(e) => {
            setSearchItem(e.target.value);
            setCurrentPage(1);
          }}
          allowClear
          style={{ maxWidth: "80%" }}
        />
      </div>

      {/* Pagination Top */}
      {!loading && totalResults > 0 && (
        <div className="flex justify-center mt-8">
          <PaginationClient
            current={currentPage}
            total={totalResults}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center flex-1 mt-10">
          <Spin size="large" />
        </div>
      )}

      {/* No results */}
      {!loading && movies.length === 0 && (
        <div className="mt-4 text-center text-gray-500">
          No movies found for `{searchItem}`
        </div>
      )}

      {/* Movie Cards */}
      <div className="mt-4 flex justify-center flex-wrap gap-4">
        {movies.map((movie) => (
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

      {/* Pagination Bottom */}
      {!loading && totalResults > 0 && (
        <div className="flex justify-center mt-8">
          <PaginationClient
            current={currentPage}
            total={totalResults}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
}
