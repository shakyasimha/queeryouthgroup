"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { alegreyaSans } from "@/ui/fonts"

interface Link {
    name: string; 
    href: string;
}

interface NavLinksProps {
    className?: string;
    links: Link[];
    lang: "en" | "ne";
}

export default function NavLinks({ className, links, lang }: NavLinksProps) {
    const pathname = usePathname();
    
    // Handle language prefix for links
    const getLocalizedHref = (href: string) => {
        // Special case for home route
        if (href === '/') return lang === 'en' ? '/' : '/ne';
        return lang === 'en' ? href : `/np${href}`;
    };

    // Handle active route detection
    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/' || pathname === '/ne';
        }
        return lang === 'en' 
            ? pathname === href
            : pathname === `/np${href}`;
    };

    return (
        <ul className={`flex space-x-4 ${alegreyaSans.className} ${className}`}>
            {links.map((link) => {
                const localizedHref = getLocalizedHref(link.href);
                const active = isActive(link.href);
                
                return (
                    <li key={link.name}>
                        <Link
                            href={localizedHref}
                            className={clsx(
                                "flex items-center px-2 py-2 md:width-auto text-[#d13467] rounded-md transition duration-300 ease-in-out hover:bg-[#d13467] hover:text-white",
                                {
                                    "text-white bg-[#d13467] font-bold": active,
                                }
                            )}
                        >
                            <p className="block">{link.name}</p>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}