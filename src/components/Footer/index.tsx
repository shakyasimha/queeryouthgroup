import Link from "next/link";
import { openSans, alegreyaSans } from "@/ui/fonts";

export default function Footer() {
    return (
        <footer className={`${openSans.className} text-[#333] bg-[#cccffe] py-6`}>
            <div className="flex flex-row">
                {/* Communication Links in English */}
                <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-col justify-between">
                    <div className={`${alegreyaSans.className} font-bold text-[#333] text-xl`}>Queer Youth Group</div>

                    {/* Office physical address link */}
                    <Link
                        key="location"
                        href="https://maps.app.goo.gl/6apehbLTBEmZGDva8"
                        className="hover:text-[#333]/80 transition duration-400"
                    >
                        Yala Dhwakha (Patandhoka), Bagmati, Nepal
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

                {/* In Nepali */}
                <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-col justify-between">
                    <div className={`${alegreyaSans.className} font-bold text-[#333] text-xl`}>क्वेयर युथ ग्रुप</div>

                    {/* Office physical address link */}
                    <Link
                        key="location"
                        href="https://maps.app.goo.gl/6apehbLTBEmZGDva8"
                        className="hover:text-[#333]/80 transition duration-400"
                    >
                        यल ध्वाखा (पाटनढोका), वागमति प्रदेश, नेपाल
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
                <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-col justify-between">
                    <div className={`${alegreyaSans.className} font-bold text-[#333] text-xl`}>Connect With Us</div>

                </div>
            </div>
            {/* Divider line */}
            <div className="mx-auto w-[90%] h-[1px] bg-gray-400"></div>

            {/* Bottom text */}
            <div className="text-center text-xs mt-4">
                &copy; {new Date().getFullYear()} Queer Youth Group. All rights reserved.
            </div>
        </footer>
    );
}