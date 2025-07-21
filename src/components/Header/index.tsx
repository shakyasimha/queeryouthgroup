import { alegreyaSans } from "@/ui/fonts";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Header() {
    return (
        <div className="bg-[#F5EFE0] text-[#d41367] w-full">
            <div className="max-w-screen-xl mx-auto p-4">
                <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
                    {/* Logo + Text Group */}
                    <div className="flex items-start md:items-center w-full md:w-auto">
                        {/* Logo stays on left */}
                        <Link href="/" className="flex-shrink-0">
                            <Image 
                                src="/qyg-logo.svg"
                                alt="Logo"
                                width={32}
                                height={32}
                                className="block mt-1 md:mt-0"
                            />
                        </Link>
                        
                        {/* Centered titles on desktop, stacked on mobile */}
                        <div className="flex flex-col ml-4 justify-center items-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-16">
                                <span className={`${alegreyaSans.className} font-bold whitespace-nowrap text-xl text-center`}>
                                    Queer Youth Group
                                </span>
                                <span className={`${alegreyaSans.className} font-bold whitespace-nowrap text-xl text-center`}>
                                    क्वेयर युथ ग्रुप
                                </span>
                                <span className={`${alegreyaSans.className} font-bold whitespace-nowrap text-xl text-center`}>
                                    𑐎𑑂𑐰𑐾𑐫𑐬 𑐫𑐸𑐠 𑐐𑑂𑐬𑐸𑐥
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Social media links (hidden on mobile) */}
                    <div className="hidden md:flex gap-6">
                        <Link href="https://www.facebook.com/QYGnepal" target="_blank" rel="noopener noreferrer">
                            <FaFacebook size={24} />
                        </Link>
                        <Link href="https://www.instagram.com/qygnepal/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={24} />
                        </Link>
                        <Link href="https://twitter.com/qygnepal/" target="_blank" rel="noopener noreferrer">
                            <FaXTwitter size={24} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}