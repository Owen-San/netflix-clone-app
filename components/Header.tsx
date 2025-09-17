// components/Header.tsx
"use client";

import { BellIcon, SearchIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={isScrolled ? "bg-[#141414]" : ""}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Image
          src="/netflix-logo.svg"
          alt="Netflix Logo"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
          priority
        />

        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        {/* <Link href="/account"> */}
          <Image
          onClick={ logout }
            src="/kids.png"
            alt="Kids profile"
            width={32}
            height={32}
            className="cursor-pointer rounded"
          />
        {/* </Link> */}
      </div>
    </header>
  );
}

export default Header;
