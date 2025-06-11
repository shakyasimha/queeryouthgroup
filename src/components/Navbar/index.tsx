"use client";

import Link from "next/link";
import Image from "next/image";
import NavLinks from "@/components/Navbar/nav-links";
import clsx from "clsx";
import { useState } from "react";
import { alegreyaSans } from "@/ui/fonts";
import { FaBars, FaTimes } from 'react-icons/fa';
import translations from '@/locales/en/common.json'; // Fallback to English

// Navbar links are here
const linkData = [
    { 
        name: 'Home', 
        href: '/'
    },
    {
        name: 'About Us',
        href: '/about'
    },
    {
        name: 'Our Team',
        href: '/team'
    },
    {
        name: 'Our Work',
        href: '/work'
    },
    {
        name: 'Legal Resources',
        href: '/resources'
    },
    {
        name: 'Litigations',
        href: '/litigations'
    },
    {
        name: 'Publications',
        href: '/publications'
    },
    {
        name: 'Dictionary',
        href: '/dictionary'
    },
];

export default function Navbar({ lang }: { lang: string }) {
    const [isClick, setisClick] = useState(false);

    // Load translations based on lang, fallback to English
    let messages;
    try {
        messages = require(`@/locales/${lang}/common.json`);
    } catch (error) {
        messages = translations; // Fallback to en/common.json
    }

    // Map linkData to include translated names and localized hrefs
    const links = linkData.map(link => ({
        name: messages.navbar[link.key] || link.key, // Fallback to key if translation is missing
        href: `/${lang}${link.href === '/' ? '' : link.href}`,
    }));
    
    const toggleNavbar = (): void => {
        setisClick(!isClick);
    }

    return(
        <nav className="bg-[#F5EFE0] border-gray-200 relative">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* For logo and link */}
                <Link key="logo" href="/">
                    <div className="flex items-center justify-between">
                        {/* Logo goes here */}
                        <Image 
                            src="/qyg-logo.svg"
                            alt="Logo"
                            width={32}
                            height={32}
                        />
                        <span className={`${alegreyaSans.className} font-bold text-[#D41367] whitespace-nowrap p-4 text-xl`}>
                            {messages.navtitle.title || "Queer Youth Group"}
                        </span>
                    </div>
                </Link>

                {/* Desktop nav link */}
                <div className="hidden md:block">
                    <NavLinks 
                        links={links}
                    />
                </div>

                {/* Burger menu icon */}
                <div className="md:hidden flex items-center">
                    <button 
                        className="text-[#b53a57] text-2xl transition duration-300 ease-in-out"
                        onClick={toggleNavbar}
                    >
                        {isClick ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Mobile dropdown */}
                <div 
                className={clsx(
                    "md:hidden w-full bg-[#F5EFE0] absolute top-full left-0 shadow-md z-10 transition-transform duration-300 ease-in-out",
                    isClick 
                        ? "opacity-100 max-h-144 pointer-events-auto"
                        : "opacity-0 max-h-0 pointer-events-none"
                    )}
                > 
                    <NavLinks 
                        className="flex-col space-y-6 px-4 py-4" 
                        links={links}    
                    />
                </div>
            </div>
        </nav>
    );
}
