"use client";

// forcing dynamic rendering
export const dynamic = "force-dynamic";

import { alegreyaSans, roboto } from "@/ui/fonts";
// import { getTranslations } from "next-intl/server";
import { getLocalizedPostWithFallback } from "@/lib/getLocalizedPostWithFallback";
import Image from "next/image";

// Base slugs
const ABOUT_SLUG = "about-us-";
const LOGO_SLUG = "logo-";

interface PageProps {
    params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
    const { locale } = await params;
    
        try {
            // Fetch both posts
            const [aboutPost, logoPost] = await Promise.all([
                getLocalizedPostWithFallback(locale, ABOUT_SLUG),
                getLocalizedPostWithFallback(locale, LOGO_SLUG),
            ]);
    
            return (
                <div className="w-full flex flex-col flex-grow bg-[#fafafc]">
                    
                    {/* About Section */}
                    {/* About Us Section (above image) */}
                    <div className="flex flex-col items-center mt-4 px-16 md:mx-64 sm:mx-2">
                        <h1 className={`${alegreyaSans.className} text-black py-4 font-bold text-2xl`}>
                            {aboutPost.title.rendered}
                        </h1>
                        <div 
                            className={`${roboto.className} text-justify text-black mb-4`}
                            dangerouslySetInnerHTML={{ __html: aboutPost.content.rendered }}
                        />
                    </div>

                    {/* Logo / Ego Section (below image) */}
                    <div className="flex flex-col items-center mt-4 px-16 md:mx-64 sm:mx-2 mb-16">
                        <h1 className={`${alegreyaSans.className} text-black py-4 font-bold text-2xl`}>
                            {logoPost.title.rendered}
                        </h1>

                        <div className="flex justify-center mb-16">
                            <Image 
                                src="/qyg-logo.svg"
                                alt="organization logo"
                                width={400}
                                height={400}
                            />
                        </div>

                        <div 
                            className={`${roboto.className} text-justify text-black`}
                            dangerouslySetInnerHTML={{ __html: logoPost.content.rendered }}
                        />
                    </div>
    
                </div>
            );
    
        } catch (error) {
            console.error('Error loading posts:', error);
    
            return (
                <div className="w-full flex flex-col flex-grow bg-[#fafafc]">
                    <div className="flex flex-col items-center min-h-[30vh] mt-4">
                        <h1 className={`${alegreyaSans.className} text-red-600 py-4 font-bold text-2xl`}>
                            Content not available
                        </h1>
                        <p className={`${roboto.className} text-gray-600 px-16 py-2`}>
                            Sorry, the content could not be loaded at this time.
                        </p>
                    </div>
                </div>
            );
        }
}
