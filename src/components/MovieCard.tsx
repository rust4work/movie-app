import React from "react";
import { Movie } from "../types/movie.types";
import Image from "next/image";
import Tag from "./helper/Tag";

function MovieCard(movie: Movie) {
  const tags = movie.tagline;
  return (
    <div>
      <div>
        <Image
          src={`${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={300}
        />
      </div>
      <div>
        <h3>{movie.title}</h3>
        <p>Release Date: {movie.release_date}</p>
        {tags?.map((tag, index) => (
          <Tag key={index} tag={tag} />
        ))}
        <p>{movie.description}</p>
      </div>
    </div>
  );
}

export default MovieCard;
