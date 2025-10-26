import React from "react";
import { Movie } from "../types/movie.types";
import Image from "next/image";
import Tag from "./helper/Tag";
import RatingCircle from "./helper/RatingCircle";
import CustomRating from "./helper/CustomRating";

function MovieCard(movie: Movie) {
  const tags = movie.genre_ids;

  return (
    <div className="w-[451px] flex  gap-8 max-w-wd min-h-72 shadow-sm hover:shadow-xl mx-4 my-4">
      <div className="relative w-[183px] h-[281px] flex-shrink-0">
        <Image
          src={`${movie.poster_path}`}
          alt={movie.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="flex flex-col gap-[12px] w-[300px]">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-xl">{movie.title}</span>
          <RatingCircle userRate={9} />
        </div>
        <p className="text-s text-[#827E7E]">
          Release Date: {movie.release_date}
        </p>
        <div className="flex gap-3 flex-wrap">
          {tags?.map((tag, index) => (
            <Tag key={index} tag={tag} />
          ))}
        </div>
        <p className="text-xs line-clamp-6 overflow-hidden">{movie.overview}</p>
        <div>
          <CustomRating
            movieId={movie.id}
            style={{ fontSize: "16px" }}
            defaultValue={0}
            count={10}
            allowHalf={true}
          />
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
