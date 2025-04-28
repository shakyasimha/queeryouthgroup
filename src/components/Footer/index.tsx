import Link from "next/link";
import { openSans, alegreyaSans } from "@/ui/fonts";
import { FaFacebook, FaInstagram} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className={`${openSans.className} text-[#333] bg-[#cccffe] py-6`}>
            <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row">
                {/* Communication Links in English */}
                <div className="flex-1 py-4 flex flex-col gap-2">
                    <div className={`${alegreyaSans.className} font-bold text-[#333] text-xl`}>Queer Youth Group</div>

                    {/* Office physical address link */}
                    <Link
                        key="location"
                        href="https://maps.app.goo.gl/6apehbLTBEmZGDva8"
                        className="hover:text-[#333]/80 transition duration-400"
                    >
                        Yala Dhwakha (Patandhoka), Lalitpur-11, Nepal
                    </Link>

                    {/* Email address */}
                    <Link
                        key="email"
                        href="mailto:communications.qyg@gmail.com"
                        className="hover:text-[#333]/80 transition duration-400"
                    >
                        communications.qyg@gmail.com
                    </Link>
                    
                    <div>+977 9851350665</div>
                </div>

                {/* Social Media Links */}
                <div className="flex-1 py-4 flex flex-col gap-2">
                    <div className={`${alegreyaSans.className} font-bold text-[#333] text-xl`}>Connect With Us</div>

                    <div className="flex flex-row space-x-6 mt-2">
                        {/* Facebook icon */}
                        <Link 
                            key="facebook" 
                            href="https://www.facebook.com/QYGnepal" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#333]/80 transition duration-400"
                        >
                            <FaFacebook size={24}/>
                        </Link>

                        {/* Instagram icon */}
                        <Link 
                            key="instagram" 
                            href="https://www.instagram.com/qygnepal/"
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="hover:text-[#333]/80 transition duration-400"
                        >
                            <FaInstagram size={24}/>
                        </Link>
                        
                        {/* X/Twitter icon */}
                        <Link 
                            key="twitter" 
                            href="https://www.instagram.com/qygnepal/" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#333]/80 transition duration-400"
                        >
                            <FaXTwitter size={24}/>
                        </Link>
                    </div>
                </div>
            </div>
            {/* Divider line */}
            <div className="mx-auto w-[90%] h-[1px] bg-gray-400 mt-6"></div>

            {/* Bottom text */}
            <div className="text-center text-xs mt-4">
                &copy; {new Date().getFullYear()} Queer Youth Group. All rights reserved.
            </div>
        </footer>
    );
}