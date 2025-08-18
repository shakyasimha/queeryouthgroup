export async function getLocalizedPost(locale: string, baseSlug: string) {
    // Dynamically create the localized slug
    const localizedSlug = `${baseSlug}-${locale}`;
    
    console.log(`Fetching post with slug: ${localizedSlug}`);
    
    const res = await fetch(
        `https://queeryouthgroup.org.np/wp-json/wp/v2/posts?slug=${localizedSlug}`,
        { 
            cache: "no-store",
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );

    if (!res.ok) {
        console.error(`Failed to fetch post with slug: ${localizedSlug}`);
        
        // Fallback to English version if the localized version doesn't exist
        if (locale !== 'en') {
            console.log(`Falling back to English version: ${baseSlug}-en`);
            return getLocalizedPost('en', baseSlug);
        }
        
        throw new Error(`Failed to fetch post: ${res.status} ${res.statusText}`);
    }
    
    const posts = await res.json();
    
    if (!posts || posts.length === 0) {
        console.error(`No post found with slug: ${localizedSlug}`);
        
        // Fallback to English if no post found
        if (locale !== 'en') {
            console.log(`No post found, falling back to English version`);
            return getLocalizedPost('en', baseSlug);
        }
        
        throw new Error(`No post found with slug: ${localizedSlug}`);
    }
    
    return posts[0];
}

// Example usage:
// const pridePost = await getLocalizedPost('es', 'pride-parade');
// const eventPost = await getLocalizedPost('fr', 'annual-event');