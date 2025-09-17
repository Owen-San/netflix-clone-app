"use client";

import { atom } from "recoil";
import type { DocumentData } from "firebase/firestore";
import type { Movie } from "../typings";

export const modalState = atom<boolean>({
  key: "modalState",
  default: false,
});

export const movieState = atom<Movie | DocumentData | null>({
  key: "movieState",
  default: null,
});
