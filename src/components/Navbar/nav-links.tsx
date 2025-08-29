"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { alegreyaSans, notoSansDevanagari } from "@/ui/fonts";

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
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
  const isVertical = className?.includes("flex-col");

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => (prev === name ? null : name));
    setOpenSubDropdown(null); // Close any open sub-dropdowns
  };

  const toggleSubDropdown = (name: string) => {
    setOpenSubDropdown(prev => (prev === name ? null : name));
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
        lang == 'en' ? alegreyaSans.className : notoSansDevanagari.className,
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
                    "flex items-center px-3 py-3 text-lg text-[#d13467] rounded-md transition duration-300 ease-in-out hover:bg-[#d13467] hover:text-white",
                    { "text-white bg-[#d13467] font-bold": active }
                  )}
                  onClick={(e) => {
                    if (hasChildren && !isVertical) {
                      e.preventDefault();
                    }
                  }}
                >
                  {link.name}
                  {hasChildren && <span className="ml-2 text-sm">▼</span>}
                </Link>
              ) : (
                <button
                  type="button"
                  className={clsx(
                    "flex items-center w-full px-3 py-3 text-lg text-left text-[#d13467] rounded-md transition duration-300 ease-in-out hover:bg-[#d13467] hover:text-white",
                    { "text-white bg-[#d13467] font-bold": isOpen && isVertical }
                  )}
                >
                  {link.name}
                  {hasChildren && (
                    <span className={clsx("ml-2 text-sm transition-transform", isOpen && isVertical && "rotate-180")}>
                      ▼
                    </span>
                  )}
                </button>
              )}
            </div>

            {/* Desktop hover dropdown */}
            {hasChildren && !isVertical && (
              <ul className="absolute top-full left-0 bg-[#F5EFE0] shadow-md rounded-md p-2 z-50 min-w-[180px] hidden group-hover:block">
                {link.children!.map((child) => {
                  const childHref = getLocalizedHref(child.href);
                  const childActive = isActive(child.href);
                  const hasGrandchildren = child.children && child.children.length > 0;

                  return (
                    <li key={child.name} className={clsx("relative", hasGrandchildren && "group/sub")}>
                      {child.href && !hasGrandchildren ? (
                        <Link
                          href={childHref}
                          className={clsx(
                            "block px-3 py-2 text-lg text-[#d13467] hover:bg-[#d13467] hover:text-white rounded-md transition",
                            { "text-white bg-[#d13467] font-bold": childActive }
                          )}
                        >
                          {child.name}
                        </Link>
                      ) : (
                        <div className="flex items-center justify-between px-3 py-2 text-lg text-[#d13467] hover:bg-[#d13467] hover:text-white rounded-md transition cursor-pointer">
                          {child.name}
                          {hasGrandchildren && <span className="text-xs ml-2">▶</span>}
                        </div>
                      )}

                      {/* Desktop sub-sub dropdown (appears on the right) */}
                      {hasGrandchildren && (
                        <ul className="absolute top-0 left-full bg-[#F5EFE0] shadow-md rounded-md p-2 z-50 min-w-[160px] hidden group-hover/sub:block">
                          {child.children!.map((grandchild) => {
                            const grandchildHref = getLocalizedHref(grandchild.href);
                            const grandchildActive = isActive(grandchild.href);

                            return (
                              <li key={grandchild.name}>
                                <Link
                                  href={grandchildHref}
                                  className={clsx(
                                    "block px-3 py-2 text-lg text-[#d13467] hover:bg-[#d13467] hover:text-white rounded-md transition",
                                    { "text-white bg-[#d13467] font-bold": grandchildActive }
                                  )}
                                >
                                  {grandchild.name}
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
            )}

            {/* Mobile dropdown */}
            {hasChildren && isVertical && isOpen && (
              <ul className="bg-white rounded-md shadow pl-4 mt-1 space-y-1 transition-all duration-300 ease-in-out">
                {link.children!.map((child) => {
                  const childHref = getLocalizedHref(child.href);
                  const childActive = isActive(child.href);
                  const hasGrandchildren = child.children && child.children.length > 0;
                  const isSubOpen = openSubDropdown === child.name;

                  return (
                    <li key={child.name} className="space-y-1">
                      <div
                        className={clsx("flex items-center", hasGrandchildren && "cursor-pointer")}
                        onClick={(e) => {
                          if (hasGrandchildren) {
                            e.preventDefault();
                            toggleSubDropdown(child.name);
                          }
                        }}
                      >
                        {child.href && !hasGrandchildren ? (
                          <Link
                            href={childHref}
                            className={clsx(
                              "block px-2 py-1 text-[#d13467] rounded-md hover:bg-[#d13467] hover:text-white transition",
                              { "text-white bg-[#d13467] font-bold": childActive }
                            )}
                          >
                            {child.name}
                          </Link>
                        ) : (
                          <button
                            type="button"
                            className={clsx(
                              "flex items-center justify-between w-full px-2 py-1 text-left text-[#d13467] rounded-md hover:bg-[#d13467] hover:text-white transition",
                              { "text-white bg-[#d13467] font-bold": isSubOpen }
                            )}
                          >
                            {child.name}
                            {hasGrandchildren && (
                              <span className={clsx("text-xs transition-transform", isSubOpen && "rotate-90")}>
                                ▶
                              </span>
                            )}
                          </button>
                        )}
                      </div>

                      {/* Mobile sub-sub dropdown (drops below the sub-link) */}
                      {hasGrandchildren && isSubOpen && (
                        <ul className="bg-gray-50 rounded-md shadow pl-4 mt-1 space-y-1 transition-all duration-300 ease-in-out">
                          {child.children!.map((grandchild) => {
                            const grandchildHref = getLocalizedHref(grandchild.href);
                            const grandchildActive = isActive(grandchild.href);

                            return (
                              <li key={grandchild.name}>
                                <Link
                                  href={grandchildHref}
                                  className={clsx(
                                    "block px-2 py-1 text-sm text-[#d13467] rounded-md hover:bg-[#d13467] hover:text-white transition",
                                    { "text-white bg-[#d13467] font-bold": grandchildActive }
                                  )}
                                >
                                  {grandchild.name}
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
            )}
          </li>
        );
      })}
    </ul>
  );
}