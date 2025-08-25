// Alternative function with error handling and better logging
export async function getLocalizedPostWithFallback(locale: string, baseSlug: string) {
    const slugsToTry = [
        `${baseSlug}-${locale}`,  // Try localized version first
        ...(locale !== 'en' ? [`${baseSlug}-en`] : []), // Fallback to English if not already English
        baseSlug // Final fallback to base slug without suffix
    ];

    for (const slug of slugsToTry) {
        try {
            console.log(`Attempting to fetch: ${slug}`);
            
            const res = await fetch(
                `http://queeryouthgroup.org.np/~queeryouthgroup/wp-json/wp/v2/posts?slug=${slug}`,
                { 
                    cache: "no-store",
                    headers: {
                        'Content-Type': 'application/json',
                    }
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
    
    throw new Error(`No post found for any of the attempted slugs: ${slugsToTry.join(', ')}`);
}
