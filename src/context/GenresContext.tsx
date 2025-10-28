"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface Genre {
  id: number;
  name: string;
}

interface GenresContextType {
  genres: Genre[];
  getGenreName: (id: number) => string;
}

const GenresContext = createContext<GenresContextType>({
  genres: [],
  getGenreName: () => "Unknown",
});

export const GenresProvider = ({ children }: { children: React.ReactNode }) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
        );
        if (!res.ok) throw new Error("Failed to fetch genres");
        const data = await res.json();
        setGenres(data.genres);
      } catch (err) {
        console.error("Error loading genres:", err);
      }
    };

    fetchGenres();
  }, []);

  const getGenreName = (id: number) =>
    genres.find((g) => g.id === id)?.name || "Unknown";

  return (
    <GenresContext.Provider value={{ genres, getGenreName }}>
      {children}
    </GenresContext.Provider>
  );
};

export const useGenres = () => useContext(GenresContext);
