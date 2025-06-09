import Image from "next/image";
import { alegreyaSans } from "@/ui/fonts"

interface CardProps {
    image: string, 
    name: string, 
    role: string
};

export default function Card({ image, name, role }: CardProps) {
    return (
        <div className={`${alegreyaSans.className} bg-[#f5efe0] text-black w-[300px] h-[500px] rounded shadow`}>
            <div className="w-full h-full relative overflow-hidden rounded">
                <Image 
                    src={image}
                    alt={name}
                    width={300}
                    height={400}
                    className="object-cover"
                />

                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <div className="font-bold text-center text-lg">{name}</div>
                    <div className="text-center mt-2 line-clamp-2">{role}</div>                
                </div>
            </div>
        </div>
    );
};
