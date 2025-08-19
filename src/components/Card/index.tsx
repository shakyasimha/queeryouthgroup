"use client";

import Image from "next/image";
import { alegreyaSans } from "@/ui/fonts";
import { User } from "lucide-react";
import { useState } from "react";

interface CardProps {
    image?: string | null;
    name: string;
    role?: string;
    pronoun?: string;
    email?: string;
}

export default function Card({ image, name, role, pronoun, email }: CardProps) {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageError = () => {
        setImageError(true);
        setImageLoaded(true);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
        setImageError(false);
    };

    return (
        <div className={`${alegreyaSans.className} bg-[#f5efe0] text-black w-[300px] h-[500px] rounded shadow flex flex-col`}>
            {/* Image Section */}
            <div className="w-full h-[350px] relative overflow-hidden rounded-t bg-gray-100 flex items-center justify-center">
                {!image || imageError ? (
                    <User size={80} className="text-gray-400" />
                ) : (
                    <Image 
                        src={image}
                        alt={name}
                        width={300}
                        height={350}
                        className="object-cover w-full h-full"
                        onError={handleImageError}
                        onLoad={handleImageLoad}
                    />
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-center p-4 space-y-2">
                <div className="font-bold text-center text-lg">{name}</div>
                
                {pronoun && (
                    <div className="text-center text-sm text-gray-600 italic">
                        {pronoun}
                    </div>
                )}
                
                {role && (
                    <div className="text-center mt-2 text-sm line-clamp-2">
                        {role}
                    </div>
                )}
                
                {email && (
                    <div className="text-center mt-2 text-xs text-blue-600 break-all">
                        {email}
                    </div>
                )}
            </div>
        </div>
    );
}