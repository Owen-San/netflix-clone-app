"use client";

import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import Row from "../../components/Row";
import requests from "../../utils/requests";
import useAuth from "../../hooks/useAuth";
import { Movie } from "../../typings";
import { modalState } from "../../atoms/modalAtom";
import { RecoilRoot, useRecoilValue } from "recoil";
import Modal from "../../components/Modal";

const BannerComp = Banner as unknown as React.ComponentType<{
  netflixOriginals: Movie[];
}>;

export default function Page() {
  return (
    <RecoilRoot>
      <HomeContent />
    </RecoilRoot>
  );
}

function HomeContent() {
  const { loading } = useAuth();
  const showModal = useRecoilValue(modalState);

  const [data, setData] = useState<{
    netflixOriginals: Movie[];
    trendingNow: Movie[];
    topRated: Movie[];
    actionMovies: Movie[];
    comedyMovies: Movie[];
    horrorMovies: Movie[];
    romanceMovies: Movie[];
    documentaries: Movie[];
  } | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
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
          fetch(requests.fetchNetflixOriginals, { cache: "no-store" }).then(
            (r) => r.json()
          ),
          fetch(requests.fetchTrending, { cache: "no-store" }).then((r) =>
            r.json()
          ),
          fetch(requests.fetchTopRated, { cache: "no-store" }).then((r) =>
            r.json()
          ),
          fetch(requests.fetchActionMovies, { cache: "no-store" }).then((r) =>
            r.json()
          ),
          fetch(requests.fetchComedyMovies, { cache: "no-store" }).then((r) =>
            r.json()
          ),
          fetch(requests.fetchHorrorMovies, { cache: "no-store" }).then((r) =>
            r.json()
          ),
          fetch(requests.fetchRomanceMovies, { cache: "no-store" }).then((r) =>
            r.json()
          ),
          fetch(requests.fetchDocumentaries, { cache: "no-store" }).then((r) =>
            r.json()
          ),
        ]);

        if (!cancelled) {
          setData({
            netflixOriginals: (netflixOriginals.results ?? []) as Movie[],
            trendingNow: (trendingNow.results ?? []) as Movie[],
            topRated: (topRated.results ?? []) as Movie[],
            actionMovies: (actionMovies.results ?? []) as Movie[],
            comedyMovies: (comedyMovies.results ?? []) as Movie[],
            horrorMovies: (horrorMovies.results ?? []) as Movie[],
            romanceMovies: (romanceMovies.results ?? []) as Movie[],
            documentaries: (documentaries.results ?? []) as Movie[],
          });
        }
      } catch (e) {
        console.error("Failed to fetch home data:", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading || !data) return null;

  const {
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  } = data;

  return (
    <div
      className={`relative h-screen bg-gradient-to-b from-transparent via-[#141414]/40 to-[#141414] lg:h-[140vh]
    ${showModal && "!h-screen overflow-hidden"}`}
    >
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <BannerComp netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  );
}
