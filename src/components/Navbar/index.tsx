"use client";

import Link from "next/link";
import Image from "next/image";
import NavLinks from "@/components/Navbar/nav-links";
import clsx from "clsx";
import { useState } from "react";
import { alegreyaSans } from "@/ui/fonts";
import { FaBars, FaTimes } from "react-icons/fa";
import { navbarLinks } from "@/data/navbar-content";
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaLocationDot } from "react-icons/fa6";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar({ lang = "en" }: { lang?: "en" | "ne" }) {
  const [isClick, setIsClick] = useState(false);
  const links = navbarLinks[lang];
  const title = lang === "en" ? "Queer Youth Group" : "क्वेयर युथ ग्रुप";

  const toggleNavbar = (): void => {
    setIsClick(!isClick);
  };

  return (
    <nav className="bg-[#F5EFE0] border-gray-200 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center justify-center gap-2 w-full">
          <NavLinks links={links} lang={lang} />
          {/* <LanguageSwitcher /> */}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center justify-end flex-1">
          {/* <LanguageSwitcher /> */}
          <button
            className="text-[#b53a57] text-2xl transition duration-300 ease-in-out"
            onClick={toggleNavbar}
          >
            {isClick ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Backdrop that closes menu when tapping outside */}
        {isClick && (
          <div
            className="fixed inset-0 z-[9] md:hidden"
            onClick={toggleNavbar}
          />
        )}

        {/* Mobile sliding menu */}
        <div
            className={clsx(
                "md:hidden w-3/4 min-h-[100dvh] bg-[#F5EFE0] fixed top-0 right-0 shadow-md z-50 transition-transform duration-300 ease-in-out transform flex flex-col justify-between overflow-visible",
                isClick ? "translate-x-0" : "translate-x-full"
            )}
        >

            {/* Close button (top-right) */}
            <button
                className="absolute top-4 right-4 text-[#b53a57] text-2xl p-2"
                onClick={toggleNavbar}
                aria-label="Close menu"
            >
                <FaTimes />
            </button>

            {/* Nav links with extra padding to avoid overlap with close button */}
            <div className="pt-16 px-4 pb-4">
                <NavLinks
                className="flex-col space-y-2"
                links={links}
                lang={lang}
                />
            </div>

            {/* Social media contacts and links */}
            <div className="flex justify-center gap-6 pb-6 text-[#333]">
                <Link href="https://www.facebook.com/QYGnepal" target="_blank" rel="noopener noreferrer">
                    <FaFacebook size={24} />
                </Link>
                <Link href="https://www.instagram.com/qygnepal/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram size={24} />
                </Link>
                <Link href="https://twitter.com/qygnepal/" target="_blank" rel="noopener noreferrer">
                    <FaXTwitter size={24} />
                </Link>
            </div>
        </div>
      </div>
    </nav>
  );
}
