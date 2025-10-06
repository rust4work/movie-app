import React from "react";

type TagProps = {
  tag: string;
};

export default function Tag({ tag }: TagProps) {
  return <div>{tag}</div>;
}
