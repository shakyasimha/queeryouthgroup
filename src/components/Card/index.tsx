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
                    key="aboutus"
                    src={image}
                    alt={name}
                    width={300}
                    height={400}
                    className="object-cover"
                />

                <div className="pt-4 px-4 font-bold items-center justify-center">
                    {name}
                </div>

                <div className="pt-4 px-4 font-bold items-center justify-center">
                    {role}
                </div>
            </div>
        </div>
    );
};
