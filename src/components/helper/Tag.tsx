import React from "react";

type TagProps = {
  tag: string;
};

export default function Tag({ tag }: TagProps) {
  return (
    <div className="inline-flex border border-[#D9D9D9] rounded-xs text-xs bg-[#FAFAFA] text-[#000000A6] px-[4px] py-[4px]">
      {tag}
    </div>
  );
}
