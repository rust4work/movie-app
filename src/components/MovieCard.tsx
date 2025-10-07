import React from "react";
import { Movie } from "../types/movie.types";
import Image from "next/image";
import Tag from "./helper/Tag";

function MovieCard(movie: Movie) {
  const tags = movie.genre_ids;
  return (
    <div className="w-[451px] flex  gap-8 max-w-wd min-h-72 shadow-sm hover:shadow-xl px-4 py-4">
      <div className="w-[183px] h-[281px] flex-shrink-0">
        <Image
          src={`${movie.poster_path}`}
          alt={movie.title}
          width={183}
          height={281}
        />
      </div>
      <div className="flex flex-col gap-[12px] w-[268px]">
        <span className="font-semibold text-xl">{movie.title}</span>
        <p className="text-s text-[#827E7E]">
          Release Date: {movie.release_date}
        </p>
        <div className="flex gap-3 flex-wrap">
          {tags?.map((tag, index) => (
            <Tag key={index} tag={tag} />
          ))}
        </div>
        <p className="text-sm line-clamp-6 overflow-hidden">{movie.overview}</p>
      </div>
    </div>
  );
}

export default MovieCard;
