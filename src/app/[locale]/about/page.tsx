// "use client";

// forcing dynamic rendering
export const dynamic = "force-dynamic";

import { alegreyaSans, roboto } from "@/ui/fonts";
import { getLocalizedPostWithFallback } from "@/lib/getLocalizedPostWithFallback";
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/client';
import Image from "next/image";

// Base slugs (adjust these to match your Sanity post slugs)
const ABOUT_SLUG = "about-us-";
const LOGO_SLUG = "logo-";

interface PageProps {
    params: Promise<{ locale: string }>;
}

// Custom components for PortableText rendering
const portableTextComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) {
                return null;
            }
            return (
                <div className="my-6">
                    <Image
                        src={urlFor(value).width(800).height(600).url()}
                        alt={value.alt || 'Image'}
                        width={800}
                        height={600}
                        className="rounded-lg"
                    />
                </div>
            );
        },
    },
    block: {
        normal: ({ children }: any) => (
            <p className={`${roboto.className} text-justify text-black mb-4`}>
                {children}
            </p>
        ),
        h1: ({ children }: any) => (
            <h1 className={`${alegreyaSans.className} text-2xl font-bold mb-4`}>
                {children}
            </h1>
        ),
        h2: ({ children }: any) => (
            <h2 className={`${alegreyaSans.className} text-xl font-bold mb-3`}>
                {children}
            </h2>
        ),
    },
};

export default async function Page({ params }: PageProps) {
    const { locale } = await params;
    
    try {
        // Fetch both posts from Sanity
        const [aboutPost, logoPost] = await Promise.all([
            getLocalizedPostWithFallback(locale, ABOUT_SLUG),
            getLocalizedPostWithFallback(locale, LOGO_SLUG),
        ]);

        return (
            <div className="w-full flex flex-col flex-grow bg-[#fafafc]">
                
                {/* About Section */}
                <div className="flex flex-col items-center mt-4 px-16 md:mx-64 sm:mx-2">
                    <h1 className={`${alegreyaSans.className} text-black py-4 font-bold text-2xl`}>
                        {aboutPost.title}
                    </h1>
                    
                    {/* Use PortableText instead of dangerouslySetInnerHTML */}
                    <div className="w-full">
                        <PortableText 
                            value={aboutPost.body} 
                            components={portableTextComponents}
                        />
                    </div>
                </div>

                {/* Logo / Ego Section */}
                <div className="flex flex-col items-center mt-4 px-16 md:mx-64 sm:mx-2 mb-16">
                    <h1 className={`${alegreyaSans.className} text-black py-4 font-bold text-2xl`}>
                        {logoPost.title}
                    </h1>

                    <div className="flex justify-center mb-16">
                        <Image 
                            src="/qyg-logo.svg"
                            alt="organization logo"
                            width={400}
                            height={400}
                        />
                    </div>

                    {/* Use PortableText for logo post content */}
                    <div className="w-full">
                        <PortableText 
                            value={logoPost.body} 
                            components={portableTextComponents}
                        />
                    </div>
                </div>

            </div>
        );

    } catch (error) {
        console.error('Error loading posts from Sanity:', error);

        return (
            <div className="w-full flex flex-col flex-grow bg-[#fafafc]">
                <div className="flex flex-col items-center min-h-[30vh] mt-4">
                    <h1 className={`${alegreyaSans.className} text-red-600 py-4 font-bold text-2xl`}>
                        Content not available
                    </h1>
                    <p className={`${roboto.className} text-gray-600 px-16 py-2`}>
                        Sorry, the content could not be loaded from Sanity at this time.
                    </p>
                </div>
            </div>
        );
    }
}