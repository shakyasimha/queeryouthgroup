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
    lang: "en" | "np";
}

export default function NavLinks({ className, links, lang }: NavLinksProps) {
    const pathname = usePathname();
    
    // Handle language prefix for active route matching
    const getLocalizedPath = (href: string) => {
        return lang === "en" ? href : `/np${href === '/' ? '' : href}`;
    };

    return (
        <ul className={`flex space-x-4 ${alegreyaSans.className} ${className}`}>
            {links.map((link) => {
                const localizedHref = getLocalizedPath(link.href);
                const isActive = pathname === localizedHref;
                
                return (
                    <li key={link.name}>
                        <Link
                            href={localizedHref}
                            className={clsx(
                                "flex items-center px-2 py-2 md:width-auto text-[#d13467] rounded-md transition duration-300 ease-in-out hover:bg-[#d13467] hover:text-white",
                                {
                                    "text-white bg-[#d13467] font-bold": isActive,
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