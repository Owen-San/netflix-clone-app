"use client";

import Image from "next/image";
import { Movie } from "../typings";

interface Props {
  movie: Movie;
}

function Thumbnail({ movie }: Props) {
  return (
    <div className="relative h-28 min-w-[180px]">
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        alt={movie.title || movie.name || "Movie thumbnail"}
        fill
        sizes="180px"
        className="rounded-sm object-cover md:rounded"
      />
    </div>
  );
}

export default Thumbnail;
