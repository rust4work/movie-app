"use client";

import { Rate } from "antd";
import React from "react";

interface CustomRatingProps {
  movieId?: number;
  onChange?: (value: number) => void;
  defaultValue?: number;
  count?: number;
  allowHalf?: boolean;
  style?: React.CSSProperties;
}

export default function CustomRating({
  movieId,
  defaultValue = 0,
  count = 5,
  allowHalf = false,
  style,
}: CustomRatingProps) {
  const onChange = (value: number) => {
    console.log(`User rated:${movieId}  ${value} stars`);
  };
  return (
    <Rate
      allowHalf={allowHalf}
      onChange={onChange}
      defaultValue={defaultValue}
      count={count}
      style={style}
    />
  );
}
