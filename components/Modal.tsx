"use client";

import MuiModal from "@mui/material/Modal";
import { modalState, movieState } from "../atoms/modalAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { XIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { Element, Genre } from "../typings";
import dynamic from "next/dynamic";
import { FaPlay } from "react-icons/fa";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }
    fetchMovie();
  }, [movie]);

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 
    mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md
    [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 !z-40 h-9 w-9 border-none
      bg-[#181818]"
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            src={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />
          <div>
            <button className="flex items-center gap-x-2 rounded">
              <FaPlay className="h-7 w-7 text-black" />
              Play
            </button>
          </div>
        </div>
      </>
    </MuiModal>
  );
}

export default Modal;
