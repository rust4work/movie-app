import MovieCard from "@/components/MovieCard";
import React from "react";

function page() {
  return (
    <div>
      <MovieCard
        id={1}
        title="Requiem for a Dream"
        release_date="2010-07-16"
        vote_average={8.8}
        poster_path="https://www.rogerebert.com/wp-content/uploads/2024/03/Requiem-for-a-Dream.jpg"
        description="A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
        tagline={["Action", "Sci-Fi", "Thriller"]}
      />
      <MovieCard
        id={1}
        title="Fight Club"
        release_date="2010-07-16"
        vote_average={8.8}
        poster_path="https://tse2.mm.bing.net/th/id/OIP.X8GXwUnJEzAclGg3OtAnrAHaLH?pid=Api&P=0&h=220"
        description="A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
        tagline={["Action", "Sci-Fi", "Thriller"]}
      />
    </div>
  );
}

export default page;
