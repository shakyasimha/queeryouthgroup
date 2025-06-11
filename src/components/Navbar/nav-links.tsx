    import Link from "next/link";
    import clsx from "clsx";
    import { usePathname } from "next/navigation";
    import { alegreyaSans } from "@/ui/fonts"

<<<<<<< HEAD
    interface Link {
        name: string; 
        href: string;
    }
    interface NavLinksProps {
        className?: string;
        links: Link[];
    }
=======
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
>>>>>>> parent of 992fe74 (added our work section in navbar and content)

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