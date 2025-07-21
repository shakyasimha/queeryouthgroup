import { alegreyaSans } from "@/ui/fonts";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter} from "react-icons/fa6";

export default function Header() {
    return (
        <div className="bg-[#F5EFE0] text-[#d41367] w-full"> {/* Full width container */}
            <div className="max-w-screen-xl mx-auto p-4"> {/* Centered content container */}
                <Link href="/" className="flex items-center justify-between w-full"> {/* Full width flex container */}
                <div className="flex items-center space-x-16"> {/* Logo + text group */}
                    <Image 
                    src="/qyg-logo.svg"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="block"
                    />
                    
                    <div className="flex space-x-16"> {/* Text variants */}
                    <span className={`${alegreyaSans.className} font-bold whitespace-nowrap text-xl`}>
                        Queer Youth Group
                    </span>
                    <span className={`${alegreyaSans.className} font-bold whitespace-nowrap text-xl`}>
                        क्वेयर युथ ग्रुप
                    </span>
                    <span className={`${alegreyaSans.className} font-bold whitespace-nowrap text-xl`}>
                        𑐎𑑂𑐰𑐾𑐫𑐬 𑐫𑐸𑐠 𑐐𑑂𑐬𑐸𑐥
                    </span>
                    </div>
                </div>

                {/* Social media links */}
                <div className="flex gap-6">
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
                </Link>
            </div>
        </div>
    )
}