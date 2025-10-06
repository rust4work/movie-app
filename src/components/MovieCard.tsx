import React from "react";
import { Movie } from "../types/movie.types";
import Image from "next/image";
import Tag from "./helper/Tag";

function MovieCard(movie: Movie) {
  const tags = movie.tagline;
  return (
    <div className=" w-[451px] flex gap-8 max-w-wd h-72">
      <div className="w-[183px] h-[281px] bg-gray-300">
        <Image
          src={`${movie.poster_path}`}
          alt={movie.title}
          width={183}
          height={281}
        />
      </div>
      <div className=" flex flex-col gap-[12px] w-[268px]">
        <span className="font-semibold text-xl ">{movie.title}</span>
        <p className="text-s text-[#827E7E]">
          Release Date: {movie.release_date}
        </p>
        <div className="flex gap-3">
          {tags?.map((tag, index) => (
            <Tag key={index} tag={tag} />
          ))}
        </div>
        <p>{movie.description}</p>
      </div>
    </div>
  );
}

export default MovieCard;
