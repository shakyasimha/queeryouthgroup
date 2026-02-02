import { client } from '@/sanity/lib/client'
import { type SanityPost } from '@/sanity/lib/queries'

// Define supported locales for better type safety
type SupportedLocale = 'en' | 'ne' | string;

// Alternative function with error handling and better logging for Sanity
export async function getLocalizedPostWithFallback(
  locale: SupportedLocale, 
  baseSlug: string
): Promise<SanityPost> {
  // Strategy 1: Try to find post with matching language field
  try {
    console.log(`Attempting to fetch from Sanity: ${baseSlug} with language: ${locale}`);
    
    const post = await client.fetch<SanityPost>(
      `*[_type == "post" && slug.current == $slug && language == $locale][0] {
        _id,
        title,
        slug,
        body,
        mainImage,
        _createdAt,
        _updatedAt,
        language,
        author->{
          name,
          image
        }
      }`,
      { slug: baseSlug, locale }
    );
    
    if (post) {
      console.log(`Successfully fetched post with slug: ${baseSlug} and language: ${locale}`);
      return post;
    }
  } catch (error) {
    console.error(`Error fetching slug ${baseSlug} with language ${locale}:`, error);
  }

  // Strategy 2: Try localized slug (e.g., "notice-en")
  const localizedSlug = `${baseSlug}-${locale}`;
  try {
    console.log(`Attempting to fetch from Sanity with localized slug: ${localizedSlug}`);
    
    const post = await client.fetch<SanityPost>(
      `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        body,
        mainImage,
        _createdAt,
        _updatedAt,
        language,
        author->{
          name,
          image
        }
      }`,
      { slug: localizedSlug }
    );
    
    if (post) {
      console.log(`Successfully fetched post with localized slug: ${localizedSlug}`);
      return post;
    }
  } catch (error) {
    console.error(`Error fetching localized slug ${localizedSlug}:`, error);
  }

  // Strategy 3: Fallback to English if not already English
  if (locale !== 'en') {
    try {
      console.log(`Attempting fallback to English for slug: ${baseSlug}`);
      
      const post = await client.fetch<SanityPost>(
        `*[_type == "post" && slug.current == $slug && language == "en"][0] {
          _id,
          title,
          slug,
          body,
          mainImage,
          _createdAt,
          _updatedAt,
          language,
          author->{
            name,
            image
          }
        }`,
        { slug: baseSlug }
      );
      
      if (post) {
        console.log(`Successfully fetched English fallback for slug: ${baseSlug}`);
        return post;
      }
    } catch (error) {
      console.error(`Error fetching English fallback for ${baseSlug}:`, error);
    }
  }

  // Strategy 4: Just try the base slug without language filter
  try {
    console.log(`Final attempt: fetching slug ${baseSlug} without language filter`);
    
    const post = await client.fetch<SanityPost>(
      `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        body,
        mainImage,
        _createdAt,
        _updatedAt,
        language,
        author->{
          name,
          image
        }
      }`,
      { slug: baseSlug }
    );
    
    if (post) {
      console.log(`Successfully fetched post with base slug: ${baseSlug}`);
      return post;
    }
  } catch (error) {
    console.error(`Error fetching base slug ${baseSlug}:`, error);
  }
  
  throw new Error(`No post found in Sanity for slug: ${baseSlug} (tried language: ${locale})`);
}