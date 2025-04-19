import { roboto } from "@/ui/fonts";

export default function Footer() {
    return (
        <footer className={`${roboto.className} bg-[#cccffe] py-6`}>
            <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            {/* Footer links and content goes here */}
            </div>
            
            {/* Divider line */}
            <div className="mx-auto w-[90%] h-[1px] bg-gray-400"></div>

            {/* Bottom text */}
            <div className="text-center text-xs mt-4 font-open-sans">
                &copy; {new Date().getFullYear()} Queer Youth Group. All rights reserved.
            </div>
        </footer>
    );
}