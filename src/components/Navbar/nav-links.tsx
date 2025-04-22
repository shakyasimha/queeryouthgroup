"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { alegreyaSans } from "@/ui/fonts"

// Navbar links are here
const links = [
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
        name: 'Research',
        href: '/research'
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
]
interface NavLinksProps {
    className?: string;
}

export default function NavLinks({ className }: NavLinksProps) {
    const pathname = usePathname(); // Get current route 

    return (
        <ul className={`flex space-x-4 ${alegreyaSans.className} ${className}`}>
            {links.map((link) => (
                <li key={link.name}>
                <Link
                    href={link.href}
                    className={`flex items-center px-2 py-2 text-[#d13467] rounded-md transition duration-300 ease-in-out hover:bg-[#d13467] hover:text-white`}
                >
                    <p className="hidden md:block">{link.name}</p>
                </Link>
                </li>
            ))}
        </ul>
    )
}