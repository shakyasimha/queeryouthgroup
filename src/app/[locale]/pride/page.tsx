import { alegreyaSans, roboto } from "@/ui/fonts";

// Base slugs for each section
const OVERVIEW_SLUG = "overview-of-pride-parade";
const INTRO_SLUG = "nepal-pride-parade";

// Fetch function with fallback
async function getPostWithFallback(locale: string, baseSlug: string) {
    const slugsToTry = [
        `${baseSlug}-${locale}`,
        ...(locale !== 'en' ? [`${baseSlug}-en`] : []),
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

    try {
        // Fetch both posts
        const [overviewPost, introPost] = await Promise.all([
            getPostWithFallback(locale, OVERVIEW_SLUG),
            getPostWithFallback(locale, INTRO_SLUG),
        ]);

        return (
            <div className="w-full flex flex-col flex-grow bg-[#fafafc]">
                
                {/* Overview Section */}
                <section className="flex flex-col items-center min-h-[30vh] mt-4">
                    <h1 className={`${alegreyaSans.className} text-black py-4 font-bold text-2xl`}>
                        {overviewPost.title?.rendered}
                    </h1>
                    <div 
                        className={`${roboto.className} text-justify px-16 py-2 text-black md:mx-64 sm:mx-2`}
                        dangerouslySetInnerHTML={{ __html: overviewPost.content.rendered }}
                    />
                </section>

                {/* Introduction Section */}
                <section className="flex flex-col items-center min-h-[30vh]">
                    <h1 className={`${alegreyaSans.className} text-black py-4 font-bold text-2xl`}>
                        {introPost.title?.rendered}
                    </h1>
                    <div 
                        className={`${roboto.className} text-justify px-16 py-2 text-black md:mx-64 sm:mx-2 mb-8`}
                        dangerouslySetInnerHTML={{ __html: introPost.content.rendered }}
                    />
                </section>

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
