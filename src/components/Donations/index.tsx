"use client";

import Image from "next/image";
import { alegreyaSans, notoSansDevanagari } from "@/ui/fonts";
import { useLocale } from "next-intl";

export default function Donations() {
    const currentLocale = useLocale();
    const headerName = currentLocale == 'en' ? 'Support Our Cause' : 'हाम्रो अभियानलाई समर्थन गर्नुहोस्';
    const headerFont = currentLocale == 'en' ? alegreyaSans.className : notoSansDevanagari.className;

    return (
        <div className="bg-[#f5efe0] text-black w-full max-w-[400px] lg:max-w-[800px] mx-auto relative group 
                        p-6 md:p-10 rounded-2xl shadow-md">
            <h1 className={`${headerFont} text-xl font-bold text-center mb-6 text-black sm:text-2xl md:text-3xl`}>
                {headerName}
            </h1>
            
            <div className="relative w-full aspect-auto">
                <Image 
                    src="/qyg-qr-code-donations.jpeg"
                    alt="qyg-qr-code"
                    height={500}
                    width={500}
                />
            </div>
        </div>
    )
}