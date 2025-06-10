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
    }

    export default function NavLinks({ className, links }: NavLinksProps) {
        const pathname = usePathname(); // Get current route 

        return (
            <ul className={`flex space-x-4 ${alegreyaSans.className} ${className}`}>
                {links.map((link) => (
                    <li key={link.name}>
                    <Link
                        href={link.href}
                        className={clsx(
                            "flex items-center px-2 py-2 md:width-auto text-[#d13467] rounded-md transition duration-300 ease-in-out hover:bg-[#d13467] hover:text-white", // default link style
                                {
                                    "text-white bg-[#d13467] font-bold transition-all duration-300 ease-in-out": pathname === link.href, /// active link style</li>
                                }
                        )}
                    >
                        <p className="block">{link.name}</p>
                    </Link>
                    </li>
                ))}
            </ul>
        )
    }