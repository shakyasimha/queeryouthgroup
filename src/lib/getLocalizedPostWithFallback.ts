import { client } from '@/sanity/lib/client'
import { getPostBySlugQuery, type SanityPost } from '@/sanity/lib/queries'

// Alternative function with error handling and better logging for Sanity
export async function getLocalizedPostWithFallback(
  locale: string, 
  baseSlug: string
): Promise<SanityPost> {
  const slugsToTry: string[] = [
    `${baseSlug}${locale}`,  // Try localized version first (e.g., "about-us-en")
    ...(locale !== 'en' ? [`${baseSlug}en`] : []), // Fallback to English if not already English
    baseSlug.replace(/-$/, '') // Final fallback to base slug without trailing dash (e.g., "about-us")
  ];

  for (const slug of slugsToTry) {
    try {
      console.log(`Attempting to fetch from Sanity: ${slug}`);
      
      const post = await client.fetch<SanityPost>(getPostBySlugQuery, { slug });
      
      if (post) {
        console.log(`Successfully fetched post with slug: ${slug}`);
        return post;
      }
    } catch (error) {
      console.error(`Error fetching slug ${slug} from Sanity:`, error);
      continue;
    }
  }
  
  throw new Error(`No post found in Sanity for any of the attempted slugs: ${slugsToTry.join(', ')}`);
}