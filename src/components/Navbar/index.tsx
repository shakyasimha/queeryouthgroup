import Link from "next/link";
import Image from "next/image";
import NavLinks from "@/components/Navbar/nav-links";

import { alegreyaSans } from "@/ui/fonts";

export default function Navbar() {
    return(
        <nav className="bg-[#F5EFE0] border-gray-200 relative">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4">
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
                <div className="w-full min-[1200px]:w-auto min-[1200px]:flex space-x-6 transition-all duration-300 ease-in-out overflow-hidden">
                    <NavLinks />
                </div>
            </div>
        </nav>
    );
}