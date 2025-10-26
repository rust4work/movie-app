"use client";
import React from "react";
import { Movie } from "../types/movie.types";
import Image from "next/image";
import Tag from "./helper/Tag";
import RatingCircle from "./helper/RatingCircle";
import { Rate, notification } from "antd";

function MovieCard(movie: Movie) {
  const [rating, setRating] = React.useState<number>(0);
  const [api, contextHolder] = notification.useNotification();

  const tags = movie.genre_ids;

  const handleRating = async (value: number) => {
    setRating(value);

    const guestSessionId = localStorage.getItem("guest_session_id");
    console.log(`Rated movie ID ${movie.id} with ${value} stars`);
    console.log(`guest_session_id: ${guestSessionId}`);

    try {
      // Optional: send rating to TMDB API
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/rating?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&guest_session_id=${guestSessionId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json;charset=utf-8" },
          body: JSON.stringify({ value }),
        }
      );

      if (!res.ok) throw new Error("Failed to rate movie");

      api.success({
        message: "Rating submitted!",
        description: `You rated "${movie.title}" with ${value} stars.`,
        placement: "bottomRight",
        duration: 3,
      });
    } catch (error) {
      api.error({
        message: "Error submitting rating",
        description: "Something went wrong while saving your rating.",
        placement: "bottomRight",
      });
      console.error(error);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="w-[451px] flex gap-8 max-w-wd min-h-72 shadow-sm hover:shadow-xl mx-4 my-4">
        <div className="relative w-[183px] h-[281px] flex-shrink-0">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        <div className="flex flex-col gap-[12px] w-[300px]">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-xl">{movie.title}</span>
            <RatingCircle userRate={rating} />
          </div>

          <p className="text-s text-[#827E7E]">
            Release Date: {movie.release_date}
          </p>

          <div className="flex gap-3 flex-wrap">
            {tags?.map((tag, index) => (
              <Tag key={index} tag={tag} />
            ))}
          </div>

          <p className="text-xs line-clamp-6 overflow-hidden">
            {movie.overview}
          </p>

          <div>
            <Rate
              allowHalf
              count={10}
              onChange={handleRating}
              style={{ fontSize: "16px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieCard;
