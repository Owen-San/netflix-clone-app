"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { Movie } from "../typings";
import Thumbnail from "./Thumbnail";
import { useRef, useState, useEffect, useCallback } from "react";

interface Props {
  title: string;
  movies: Movie[];
}

function Row({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    const { scrollLeft, clientWidth, scrollWidth } = el;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = rowRef.current;
    updateScrollState();
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, movies.length]);

  const handleClick = (direction: "left" | "right") => {
    const el = rowRef.current;
    if (!el) return;
    const { scrollLeft, clientWidth } = el;
    const next =
      direction === "left"
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;
    el.scrollTo({ left: next, behavior: "smooth" });
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>

      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer transition hover:scale-125
            ${canScrollLeft ? "opacity-0 group-hover:opacity-100" : "invisible"}
          `}
          onClick={() => handleClick("left")}
        />

        <div
          ref={rowRef}
          className="
            flex items-center space-x-0.5 md:space-x-2.5 md:p-2
            overflow-x-auto overflow-y-hidden whitespace-nowrap
            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
          "
          role="region"
          aria-label={`${title} row`}
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <ChevronRightIcon
          className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer transition hover:scale-125
            ${
              canScrollRight ? "opacity-0 group-hover:opacity-100" : "invisible"
            }
          `}
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}

export default Row;
