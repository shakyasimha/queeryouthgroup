import { alegreyaSans, roboto } from "@/ui/fonts";
// import { getTranslations } from "next-intl/server";
import Image from "next/image";

// Base slugs
const ABOUT_SLUG = "about-us-";
const LOGO_SLUG = "logo-";

// Fetch function with fallback
async function getPostWithFallback(locale: string, baseSlug: string) {
    const slugsToTry = [
        `${baseSlug}${locale}`,
        ...(locale !== 'en' ? [`${baseSlug}en`] : []),
        baseSlug
    ];

    for (const slug of slugsToTry) {
        try {
            console.log(`Attempting to fetch: ${slug}`);

            const res = await fetch(
                `https://queeryouthgroup.org.np/wp-json/wp/v2/posts?slug=${slug}`,
                { 
                    cache: "no-store",
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            if (res.ok) {
                const posts = await res.json();
                if (posts && posts.length > 0) {
                    console.log(`Successfully fetched post with slug: ${slug}`);
                    return posts[0];
                }
            }
        } catch (error) {
            console.error(`Error fetching slug ${slug}:`, error);
            continue;
        }
    }

    throw new Error(`No post found for slugs: ${slugsToTry.join(', ')}`);
}

interface PageProps {
    params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
    const { locale } = await params;
    // const t = await getTranslations('AboutPage');

    try {
        // Fetch both sections
        const [aboutPost, logoPost] = await Promise.all([
            getPostWithFallback(locale, ABOUT_SLUG),
            getPostWithFallback(locale, LOGO_SLUG),
        ]);

        return (
            <div className="w-full flex flex-grow flex-col bg-[#fafafc]">
                {/* Image section */}
                {/* <div 
                    className="w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[550px] relative overflow-hidden"
                >
                    <Image 
                        key="aboutus"
                        src="/images/about-us-section.jpg"
                        alt="about us"
                        fill
                        className="object-cover"
                    />
                </div> */}
                
                {/* About Us Section (above image) */}
                <div className="flex flex-col items-center mt-4 px-16 md:mx-64 sm:mx-2">
                    <h1 className={`${alegreyaSans.className} text-black py-4 font-bold text-2xl`}>
                        {aboutPost.title.rendered}
                    </h1>
                    <div 
                        className={`${roboto.className} text-justify text-black mb-8`}
                        dangerouslySetInnerHTML={{ __html: aboutPost.content.rendered }}
                    />
                </div>

                {/* Logo / Ego Section (below image) */}
                <div className="flex flex-col items-center mt-4 px-16 md:mx-64 sm:mx-2 mb-8">
                    <h1 className={`${alegreyaSans.className} text-black py-4 font-bold text-2xl`}>
                        {logoPost.title.rendered}
                    </h1>

                    <div className="flex justify-center mb-4">
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
