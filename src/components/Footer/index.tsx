import Link from "next/link";
import { openSans } from "@/ui/fonts";

export default function Footer() {
    return (
        <footer className={`${openSans.className} text-black bg-[#cccffe] py-6`}>
            {/* Location and contact */}
            <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-col justify-between">
                <div>Queer Youth Group Nepal</div>

                {/* Office physical address link */}
                <Link
                    key="location"
                    href="https://maps.app.goo.gl/6apehbLTBEmZGDva8"
                >
                    Yala Dhwakha (Patandhoka), Bagmati, Nepal
                </Link>
                 
                <div>+977 9851350665 </div>
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