"use client";
import React from "react";
import { Movie } from "../types/movie.types";
import Image from "next/image";
import Tag from "./helper/Tag";
import RatingCircle from "./helper/RatingCircle";
import { Rate, notification } from "antd";

interface MovieCardProps extends Movie {
  userRate?: number;
}

function MovieCard({
  id,
  title,
  poster_path,
  release_date,
  overview,
  genre_ids,
  userRate = 0,
}: MovieCardProps) {
  const [rating, setRating] = React.useState<number>(userRate);
  const [api, contextHolder] = notification.useNotification();

  const handleRating = async (value: number) => {
    setRating(value);

    const guestSessionId = localStorage.getItem("guest_session_id");
    console.log(`Rated movie ID ${id} with ${value} stars`);
    console.log(`guest_session_id: ${guestSessionId}`);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&guest_session_id=${guestSessionId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json;charset=utf-8" },
          body: JSON.stringify({ value }),
        }
      );

      if (!res.ok) throw new Error("Failed to rate movie");

      api.success({
        message: "Rating submitted!",
        description: `You rated "${title}" with ${value} stars.`,
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
        <div className="relative w-[183px] h-[281px] shrink-0">
          <Image
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        <div className="flex flex-col gap-3 w-[300px]">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-xl">{title}</span>
            <RatingCircle userRate={rating} />
          </div>

          <p className="text-s text-[#827E7E]">Release Date: {release_date}</p>

          <div className="flex gap-3 flex-wrap">
            {genre_ids?.map((tag, index) => (
              <Tag key={index} tag={tag} />
            ))}
          </div>

          <p className="text-xs line-clamp-6 overflow-hidden">{overview}</p>

          <div>
            <Rate
              allowHalf
              count={10}
              onChange={handleRating}
              style={{ fontSize: "16px" }}
              value={rating}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieCard;
