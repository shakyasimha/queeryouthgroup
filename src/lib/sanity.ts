import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = '2024-01-01'

// Define interface for Sanity image source
interface SanityImageSource {
  asset: {
    _ref: string
  }
  alt?: string
  caption?: string
}

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: apiVersion,
})

// GROQ queries
export const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)`

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  body,
  "author": author->{name, image}
}`

// Helper function to get image URLs
export function urlFor(source: SanityImageSource) {
  if (!source?.asset?._ref) {
    return ''
  }
  
  const ref = source.asset._ref
  // Remove unused 'file' variable - we only need id, dimensions, and format
  const [, id, dimensions, format] = ref.split('-')
  
  if (!id || !dimensions || !format) {
    return ''
  }
  
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
}