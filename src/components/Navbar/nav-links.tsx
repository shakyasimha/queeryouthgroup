"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { alegreyaSans } from "@/ui/fonts";

interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}

interface NavLinksProps {
  className?: string;
  links: NavItem[];
  lang: "en" | "ne";
}

export default function NavLinks({ className, links, lang }: NavLinksProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const isVertical = className?.includes("flex-col");

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => (prev === name ? null : name));
  };

  const getLocalizedHref = (href: string) => {
    if (href === "/") return lang === "en" ? "/" : "/ne";
    return lang === "en" ? href : `/ne${href}`;
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "/ne";
    }
    return lang === "en" ? pathname === href : pathname === `/ne${href}`;
  };

  return (
    <ul
      className={clsx(
        "flex",
        alegreyaSans.className,
        isVertical ? "space-y-2 flex-col" : "space-x-4",
        className
      )}
    >
      {links.map(link => {
        const localizedHref = getLocalizedHref(link.href);
        const active = isActive(link.href);
        const hasChildren = link.children && link.children.length > 0;
        const isOpen = openDropdown === link.name;

        return (
          <li key={link.name} className={clsx("relative", !isVertical && "group")}>
            <div
              className={clsx("flex items-center", isVertical && hasChildren && "cursor-pointer")}
              onClick={(e) => {
                if (hasChildren && isVertical) {
                  e.preventDefault();
                  toggleDropdown(link.name);
                }
              }}
            >
              {link.href && (!hasChildren || !isVertical) ? (
                <Link
                  href={localizedHref}
                  className={clsx(
                    "flex items-center px-2 py-2 text-[#d13467] rounded-md transition duration-300 ease-in-out hover:bg-[#d13467] hover:text-white",
                    { "text-white bg-[#d13467] font-bold": active }
                  )}
                  onClick={(e) => {
                    // For desktop dropdowns, prevent navigation and let hover handle the dropdown
                    if (hasChildren && !isVertical) {
                      e.preventDefault();
                    }
                  }}
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  type="button"
                  className={clsx(
                    "flex items-center w-full px-2 py-2 text-left text-[#d13467] rounded-md transition duration-300 ease-in-out hover:bg-[#d13467] hover:text-white",
                    { "text-white bg-[#d13467] font-bold": isOpen && isVertical }
                  )}
                >
                  {link.name}
                </button>
              )}
            </div>

            {/* Desktop hover dropdown */}
            {hasChildren && !isVertical && (
              <ul className="absolute top-full left-0 bg-[#F5EFE0] shadow-md rounded-md p-2 z-50 min-w-[180px] hidden group-hover:block">
                {link.children!.map((child) => {
                  const childHref = getLocalizedHref(child.href);
                  const childActive = isActive(child.href);
                  return (
                    <li key={child.name}>
                      <Link
                        href={childHref}
                        className={clsx(
                          "block px-3 py-2 text-sm text-[#d13467] hover:bg-[#d13467] hover:text-white rounded-md transition",
                          { "text-white bg-[#d13467] font-bold": childActive }
                        )}
                      >
                        {child.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Mobile dropdown */}
            {hasChildren && isVertical && isOpen && (
              <ul className="bg-white rounded-md shadow pl-4 mt-1 space-y-1 transition-all duration-300 ease-in-out">
                {link.children!.map((child) => {
                  const childHref = getLocalizedHref(child.href);
                  const childActive = isActive(child.href);
                  return (
                    <li key={child.name}>
                      <Link
                        href={childHref}
                        className={clsx(
                          "block px-2 py-1 text-[#d13467] rounded-md hover:bg-[#d13467] hover:text-white transition",
                          { "text-white bg-[#d13467] font-bold": childActive }
                        )}
                      >
                        {child.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}