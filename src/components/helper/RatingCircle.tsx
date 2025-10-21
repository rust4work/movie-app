import React from "react";

interface RatingCircleProps {
  userRate?: number;
}

function RatingCircle({ userRate = 0 }: RatingCircleProps) {
  let borderColor = "#ccc";
  switch (true) {
    case userRate >= 0 && userRate <= 3:
      borderColor = "#E90000"; // red
      break;
    case userRate > 3 && userRate <= 5:
      borderColor = "#E97E00"; // orange
      break;
    case userRate > 5 && userRate <= 7:
      borderColor = "#E9D100"; // yellow
      break;
    case userRate > 7:
      borderColor = "#66E900"; // green
      break;
  }

  return (
    <div
      className="w-[40px] h-[40px] rounded-full flex items-center justify-center border-2 flex-shrink-0"
      style={{ borderColor: borderColor }}
    >
      {userRate}
    </div>
  );
}

export default RatingCircle;
