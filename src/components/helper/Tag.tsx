import React from "react";
import { getGenreName } from "@/utils/genres";

interface TagProps {
  tag: number;
}

export default function Tag({ tag }: TagProps) {
  const genreName = getGenreName(tag);

  return (
    <span className="inline-flex border border-[#D9D9D9] rounded-xs text-xs bg-[#FAFAFA] text-[#000000A6] px-1 py-1">
      {genreName}
    </span>
  );
}
