"use client";

import React, { useEffect, useState } from 'react';
import { alegreyaSans, roboto } from '@/ui/fonts';

const messages = [
    {
        intro: "Namaste",
        header: "Welcome to Queer Youth Group.",
        body: "Welcome to Queer Youth Group. Here you'll find news and information about our events and initiatives."
    },
    {
        intro: "नमस्ते",
        header: "क्वेयर युथ ग्रुपमा स्वागत छ",
        body: "क्वेयर युथ ग्रुपमा तपाईँहरुलाई स्वागत छ। हाम्रा कार्यक्रम र परियोजनाहरुका बारे यस वेबसाइटमा जानकारी पाउन हुनेछ।"
    },
]

const Welcome = () => {
    const [current, setCurrent] = useState(0);
    const [fade, setFade]  = useState(true);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setFade(false);
            
            setTimeout(()=>{
                setCurrent((prev) => (prev+1) % messages.length);
                setFade(true); // Sets fade
            }, 500); // Half the totan animation duration
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return(
        <div className="mt-16 mb-16 text-center"> 
            <h2 className={`
                ${alegreyaSans.className}
                text-[#333] text-2xl
                  transition-opacity duration-500
                  ${fade ? 'opacity-100': 'opacity-0'}
                `}>
                {messages[current].intro}
            </h2>
            <h1
                className={`
                ${alegreyaSans.className}
                text-[#333] text-3xl font-bold mb-2
                transition-opacity duration-500 ease-in-out
                ${fade ? 'opacity-100': 'opacity-0'}
                `}
                key={current} // key forces re-render for animation
            >
                {messages[current].header}
            </h1>
            <p className={`
                ${roboto.className} 
                text-[#333] max-w-xl mx-auto
                ${fade ? 'opacity-100': 'opacity-0'}
            `}>
                {messages[current].body}
            </p>
        </div>
    )
}

export default Welcome;