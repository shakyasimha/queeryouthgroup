"use client";

import Link from "next/link";
import Image from "next/image";
import NavLinks from "@/components/Navbar/nav-links";
import clsx from "clsx";
import { useState } from "react";
import { alegreyaSans } from "@/ui/fonts";
import { FaBars, FaTimes } from 'react-icons/fa';
import { navbarLinks } from "@/data/navbar-content";

export default function Navbar({ lang = "en" }: { lang?: "en" | "np" }) {
    const [isClick, setisClick] = useState(false);
    const links = navbarLinks[lang];
    const title = lang === "en" ? "Queer Youth Group" : "क्वियर युथ ग्रुप";

    const toggleNavbar = (): void => {
        setisClick(!isClick);
    }

    return(
        <nav className="bg-[#F5EFE0] border-gray-200 relative">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo and title */}
                <Link key="logo" href="/">
                    <div className="flex items-center justify-between">
                        <Image 
                            src="/qyg-logo.svg"
                            alt="Logo"
                            width={32}
                            height={32}
                        />
                        <span className={`${alegreyaSans.className} font-bold text-[#D41367] whitespace-nowrap p-4 text-xl`}>
                            {title}
                        </span>
                    </div>
                </Link>

                {/* Desktop nav links */}
                <div className="hidden md:block">
                    <NavLinks 
                        links={links}
                        lang={lang}
                    />
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                    <button 
                        className="text-[#b53a57] text-2xl transition duration-300 ease-in-out"
                        onClick={toggleNavbar}
                    >
                        {isClick ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Mobile dropdown */}
                <div className={clsx(
                    "md:hidden w-full bg-[#F5EFE0] absolute top-full left-0 shadow-md z-10 transition-all duration-300 ease-in-out",
                    isClick 
                        ? "opacity-100 max-h-[1000px] pointer-events-auto"
                        : "opacity-0 max-h-0 pointer-events-none"
                    )}
                > 
                    <NavLinks 
                        className="flex-col space-y-6 px-4 py-4" 
                        links={links}
                        lang={lang}
                    />
                </div>
            </div>
        </nav>
    );
}