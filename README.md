# 🎬 Netflix Clone (Next.js + TypeScript)

A sleek Netflix-style streaming UI built with **Next.js, React, TypeScript, Tailwind CSS, Recoil, Firebase Auth, and the TMDB API**.  
Showcases a cinematic UX: dynamic hero banner, interactive rows, and a trailer modal with mute/unmute — all fully responsive.

---

## 📑 Table of Contents
- [🌐 Live Demo](#-live-demo-optional)
- [✨ Introduction](#-introduction)
- [🚀 Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [⚡ Getting Started](#-getting-started)
- [🔑 Environment Variables](#-environment-variables)
- [📂 Project Structure](#-project-structure)
- [📜 Scripts](#-scripts)
- [🎮 Usage Guide](#-usage-guide)
- [🩹 Troubleshooting & Tips](#-troubleshooting--tips)
- [📄 License](#-license)

---

## ✨ Introduction

This project replicates core Netflix experiences with a modern stack:
- Dynamic hero banner featuring Netflix Originals
- Horizontally scrolling rows (Trending, Top Rated, Action, Comedy, Horror, Romance, Documentaries)
- Movie modal with trailer playback (ReactPlayer), metadata, and a mute toggle
- Firebase email/password authentication
- Responsive UI with polished styling

---

## 🚀 Features

- 🎥 Dynamic Hero Banner (rotating artwork/video)
- 📚 Category Rows (Trending, Top Rated, etc.)
- 🎞 Trailer Modal with genres, overview, actions
- 🔊 Mute/Unmute toggle for trailer audio
- 🔐 Firebase Auth (sign up / sign in / logout)
- ⚡ Next/Image optimizations
- 📱 Responsive Tailwind UI
- 🧠 Recoil for modal and current movie state

---

## 🛠 Tech Stack

- Framework: Next.js (App Router) + React 18 + TypeScript
- Styling: Tailwind CSS (v4 compatible)
- State: Recoil (modalState, movieState)
- Auth: Firebase Authentication
- API: TMDB (The Movie Database)
- Video: ReactPlayer
- Icons: Heroicons, React Icons
- Deploy: Vercel

---

## ⚡ Getting Started

1) **Clone the repository**

    git clone https://github.com/Owen-San/netflix-clone-app
    cd netflix-clone

2) **Install dependencies**

    npm install
    # or
    yarn

3) **Add environment variables** (see below)

    Create a file named: .env.local

4) **Run the dev server**

    npm run dev
    # or
    yarn dev

    Open http://localhost:3000

---

## 🔑 Environment Variables

Place these in `.env.local`:

    NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key

    NEXT_PUBLIC_FIREBASE_API_KEY=your_value
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_value
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_value
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_value
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_value
    NEXT_PUBLIC_FIREBASE_APP_ID=your_value

⚠️ Tip: Values used in the client should be prefixed with `NEXT_PUBLIC_`. Restart the dev server after changes.

---

## 📂 Project Structure

    .
    ├─ app/
    │  ├─ globals.css
    │  ├─ layout.tsx
    │  └─ page.tsx                 # Fetches categories, renders Banner + Rows
    │
    ├─ atoms/
    │  └─ modalAtom.ts             # Recoil atoms: modalState, movieState
    │
    ├─ components/
    │  ├─ Banner.tsx               # Dynamic hero section
    │  ├─ Header.tsx               # Top navigation
    │  ├─ Modal.tsx                # Trailer + details + mute toggle
    │  ├─ Row.tsx                  # Horizontal row for a category
    │  └─ Thumbnail.tsx            # Individual movie tile
    │
    ├─ hooks/
    │  └─ useAuth.tsx              # Firebase auth provider
    │
    ├─ utils/
    │  ├─ requests.ts              # TMDB endpoints
    │  └─ constants/
    │     └─ movie.ts              # baseUrl, helpers
    │
    ├─ typings.d.ts                # Types for Movie, Genre, etc.
    ├─ firebase.ts                 # Firebase client config
    ├─ public/
    │  └─ favicon.ico
    │
    ├─ .env.local                  # Not committed
    ├─ package.json
    ├─ tailwind.config.js
    └─ tsconfig.json

---

## 📜 Scripts

    {
      "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "next lint"
      }
    }

---

## 🎮 Usage Guide

1) **Auth** — sign up or log in with email/password  
2) **Browse** — scroll rows and pick a title  
3) **Modal** — view trailer, overview, genres; close via X/outside click  
4) **Audio** — toggle mute/unmute on the trailer  
5) **Responsive** — polished experience on desktop and mobile

---

## 🩹 Troubleshooting & Tips

- 🎞 Trailer not appearing? Some titles don’t have a TMDB video key. Check your fetch for `/videos`.
- 🖼 Images not loading? Add `image.tmdb.org` to `images.domains` in `next.config.js`.
- 🔄 Env updates not applied? Restart the dev server after editing `.env.local`.
- 🧾 Types mismatch? Align `typings.d.ts` with the exact TMDB fields you consume.
- 🧱 One modal at a time — ensure only one modal component mounts; control via Recoil atoms.

---

## 🌐 Live Demo

  - [Vercel Deployment](https://netflix-clone-app-murex-five.vercel.app/)

---

## 📄 License

MIT © Owen Sanchez
