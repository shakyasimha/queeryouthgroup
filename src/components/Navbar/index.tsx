"use client";

import Link from "next/link";
import Image from "next/image";
import NavLinks from "@/components/Navbar/nav-links";
import { useState } from "react";
import { alegreyaSans } from "@/ui/fonts";
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
    const [isClick, setisClick] = useState(false);

    const toggleNavbar = (): void => {
        setisClick(!isClick);
    }

    return(
        <nav className="bg-[#F5EFE0] border-gray-200 relative">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            {/* For logo and link */}
                            <Link 
                                key="logo" 
                                href="/"
                                className="flex items-center space-x-3 hover:text-[#D41367] transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    {/* Logo goes here */}
                                    <Image 
                                        src="/qyg-logo.svg"
                                        alt="Logo"
                                        width={32}
                                        height={32}
                                    />
                                    <span className={`${alegreyaSans.className} text-2xl font-medium text-[#D41367] whitespace-nowrap p-4`}>
                                        Queer Youth Group
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <NavLinks />
                    </div>
                    
                    {/* Burger menu for smaller screens */}
                    <div className="md:hidden flex items-center">
                        <button
                            className="sm:hidden text-[#d41367] text-2xl focus:border-[#d41367] hover:border-[#d41367] transition duration-300 ease-in-out"
                            onClick={toggleNavbar}
                        >
                            {isClick ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
