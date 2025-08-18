import { alegreyaSans, roboto } from "@/ui/fonts";
// import { getTranslations } from "next-intl/server";
import { getLocalizedPostWithFallback } from "@/lib/getLocalizedPostWithFallback";

// Base slug without locale suffix
const BASE_SLUG = "our-history";
interface PageProps {
    params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
    const { locale } = await params;
    // const t = await getTranslations('pridePage');
    
    try {
        // Use the fallback version for better error handling
        const pridePost = await getLocalizedPostWithFallback(locale, BASE_SLUG);

        return(
            <div className="w-full flex flex-col flex-grow bg-[#fafafc]">
                <div className="flex flex-col items-center min-h-[30vh] mt-4">
                    <div className="text-center text-2xl">
                        <h1 className={`${alegreyaSans.className} text-black py-4 font-bold`}>
                            {pridePost.title.rendered}
                        </h1>
                    </div>

                    <div 
                        className={`${roboto.className} text-bg text-justify px-16 py-2 text-black md:mx-64 sm:mx-2 mb-8`}
                        dangerouslySetInnerHTML={{
                            __html: pridePost.content.rendered,
                        }}
                    />
                    
                    {/* Debug info (remove in production) */}
                    {/* <div className="text-xs text-gray-500 mt-2">
                        Current locale: {locale} | Post ID: {pridePost.id}
                    </div> */}
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