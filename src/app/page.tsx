import type { Metadata } from "next";
import React from "react";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import requests from "../../utils/requests";
import { Movie } from "../../typings";

type Product = unknown;

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  products: Product[];
}

export const metadata: Metadata = {
  title: "Home - Netflix",
  icons: { icon: "/favicon.ico" },
};

export const revalidate = 0;

async function getData() {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals, { cache: "no-store" }).then((r) => r.json()),
    fetch(requests.fetchTrending, { cache: "no-store" }).then((r) => r.json()),
    fetch(requests.fetchTopRated, { cache: "no-store" }).then((r) => r.json()),
    fetch(requests.fetchActionMovies, { cache: "no-store" }).then((r) => r.json()),
    fetch(requests.fetchComedyMovies, { cache: "no-store" }).then((r) => r.json()),
    fetch(requests.fetchHorrorMovies, { cache: "no-store" }).then((r) => r.json()),
    fetch(requests.fetchRomanceMovies, { cache: "no-store" }).then((r) => r.json()),
    fetch(requests.fetchDocumentaries, { cache: "no-store" }).then((r) => r.json()),
  ]);

  return {
    netflixOriginals: netflixOriginals.results as Movie[],
    trendingNow: trendingNow.results as Movie[],
    topRated: topRated.results as Movie[],
    actionMovies: actionMovies.results as Movie[],
    comedyMovies: comedyMovies.results as Movie[],
    horrorMovies: horrorMovies.results as Movie[],
    romanceMovies: romanceMovies.results as Movie[],
    documentaries: documentaries.results as Movie[],
  };
}

const BannerComp =
  Banner as unknown as React.ComponentType<{ netflixOriginals: Movie[] }>;

const Home: React.FC<Props> = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
  products,
}) => {
  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Header />
      <main>
        <BannerComp netflixOriginals={netflixOriginals} />
      </main>
    </div>
  );
};

export default async function Page() {
  const data = await getData();
  return <Home {...data} products={[]} />;
}
