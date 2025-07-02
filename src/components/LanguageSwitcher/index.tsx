"use client";
import { useState } from "react";

export default function LanguageSwitcher() {
    const [buttonText, setButtonText] = useState('');

    const handleClick = () => {
        setButtonText(prevText => prevText === 'EN' ? 'नेपा' : 'EN');
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