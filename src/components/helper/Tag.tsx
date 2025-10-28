"use client";
import React from "react";
import { useGenres } from "@/context/GenresContext";

interface TagProps {
  tag: number;
}

export default function Tag({ tag }: TagProps) {
  const { getGenreName } = useGenres();
  const genreName = getGenreName(tag);

  return (
    <span className="inline-flex border border-[#D9D9D9] rounded-xs text-xs bg-[#FAFAFA] text-[#000000A6] px-1 py-1">
      {genreName}
    </span>
  );
}
