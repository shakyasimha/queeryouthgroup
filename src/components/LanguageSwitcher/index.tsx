"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();
    
    const targetLocale = currentLocale === 'en' ? 'ne' : 'en';
    const buttonText = currentLocale === 'en' ? 'नेपा' : 'EN';
    
    const handleClick = () => {
        // More robust path construction
        const segments = pathname.split('/').filter(Boolean); // Remove empty strings
        
        // Check if first segment is a locale
        if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'ne')) {
            segments[0] = targetLocale;
        } else {
            // If no locale in path, add it at the beginning
            segments.unshift(targetLocale);
        }
        
        const newPath = '/' + segments.join('/');
        router.push(newPath);
    };

    return (
        <button
            className="border border-gray-300 rounded p-2 bg-[#d13467] text-white hover:opacity-80 transition duration-300 ease-in-out"
            onClick={handleClick}
            type="button"
            aria-label={`Switch to ${targetLocale === 'en' ? 'English' : 'Nepali'}`}
        > 
            {buttonText}
        </button>
    );
}