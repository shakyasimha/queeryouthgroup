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
        href: '/legal-resources'
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

export default function NavLinks({ className }: any) {
    const pathname = usePathname(); // Get current route 

    return (
        <ul className={`flex space-x-4 ${alegreyaSans.className} ${className}`}>
            {links.map((link) => (
                <li key={link.name}>
                <Link
                    href={link.href}
                    className={`flex items-center px-3 py-2 text-[#d13467] hover:text-[#264564]`}
                >
                    <p className="hidden md:block">{link.name}</p>
                </Link>
                </li>
            ))}
        </ul>
    )
}