"use client";
// import { useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
    // const [buttonText, setButtonText] = useState('नेपा');

    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();
    
    const targetLocale = currentLocale === 'en' ? 'ne' : 'en';
    const buttonText = currentLocale == 'en' ? 'नेपा' : 'EN';
    
    const handleClick = () => {
        const segments = pathname.split('/');
        segments[1] = targetLocale;
        const newPath = segments.join('/') || '/';
        router.push(newPath);

        // setButtonText(prevText => prevText === 'नेपा' ? 'EN' : 'नेपा');
    }

    return (
        <button
            className="border-1 rounded p-2 bg-[#d13467] text-white hover:opacity-80 transition duration-300 ease-in-out"
            onClick={handleClick}
        > 
            {buttonText}
        </button>
    )
}