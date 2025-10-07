"use client";
import { Movie } from "@/types/movie.types";
import { Input, Spin, Pagination } from "antd";
import MovieCard from "@/components/MovieCard";
import { useState, useEffect, useMemo } from "react";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchMovies = useMemo(
    () =>
      debounce((query: string, page: number) => {
        if (!query.trim()) {
          setMovies([]);
          setTotalResults(0);
          setLoading(false);
          return;
        }

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
    [setMovies, setLoading]
  );

  useEffect(() => {
    if (searchItem) {
      fetchMovies(searchItem, currentPage);
    } else {
      setMovies([]);
      setTotalResults(0);
      setLoading(false);
    }
  }, [searchItem, currentPage, fetchMovies]);

  const handleChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full  mx-auto p-4 ">
      <div className="sticky top-0 z-50 w-screen  bg-white p-4 flex justify-center shadow-lg">
        <Input
          className="sticky"
          placeholder="Type to search movies..."
          size="large"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          allowClear
          width="80%"
          style={{ maxWidth: "80%" }}
        />
      </div>

      {!loading && totalResults > 0 && (
        <div className="flex justify-center mt-8">
          <Pagination
            current={currentPage}
            pageSize={20}
            total={totalResults > 1000 ? 1000 : totalResults}
            onChange={handleChange}
            showSizeChanger={false}
          />
        </div>
      )}

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

      <div className="mt-4 flex justify-center flex-wrap gap-4">
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
      {!loading && totalResults > 0 && (
        <div className="flex justify-center mt-8">
          <Pagination
            current={currentPage}
            pageSize={20}
            total={totalResults > 1000 ? 1000 : totalResults} // API limit
            onChange={handleChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
}
