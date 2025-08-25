import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { client, POST_QUERY, urlFor } from '@/lib/sanity'

// Define proper interfaces for Sanity types
interface SanityImage {
  asset: { _ref: string }
  alt?: string
  caption?: string
}

interface SanityAuthor {
  name: string
  image?: SanityImage
}

interface Post {
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  mainImage?: SanityImage
  body: any[] // This can be more specific with PortableText types
  author?: SanityAuthor
}

// Define proper types for PortableText components
interface ImageValue {
  value: SanityImage
}

interface LinkValue {
  value: {
    href: string
  }
  children: React.ReactNode
}

interface BlockValue {
  children: React.ReactNode
}

// Custom components for PortableText
const components = {
  types: {
    image: ({ value }: ImageValue) => (
      <div className="w-full my-8 rounded-lg overflow-hidden">
        <Image
          src={urlFor(value).url()}
          alt={value.alt || ''}
          width={800}
          height={400}
          className="w-full h-auto"
        />
        {value.caption && (
          <figcaption className="text-center text-sm text-gray-600 mt-2">
            {value.caption}
          </figcaption>
        )}
      </div>
    ),
  },
  marks: {
    link: ({ children, value }: LinkValue) => (
      <a 
        href={value.href} 
        className="text-blue-600 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  block: {
    h1: ({ children }: BlockValue) => <h1 className="text-3xl font-bold my-6">{children}</h1>,
    h2: ({ children }: BlockValue) => <h2 className="text-2xl font-semibold my-5">{children}</h2>,
    h3: ({ children }: BlockValue) => <h3 className="text-xl font-medium my-4">{children}</h3>,
    blockquote: ({ children }: BlockValue) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post: Post = await client.fetch(POST_QUERY, { slug: params.slug })

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {post.mainImage && (
        <div className="w-full h-64 md:h-96 relative mb-8 rounded-lg overflow-hidden">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-gray-600">
          {post.author && (
            <div className="flex items-center gap-2">
              {post.author.image && (
                <div className="w-8 h-8 relative">
                  <Image
                    src={urlFor(post.author.image).url()}
                    alt={post.author.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              )}
              <span>by {post.author.name}</span>
            </div>
          )}
          
          <time>
            {new Date(post.publishedAt).toLocaleDateString()}
          </time>
        </div>

        {post.excerpt && (
          <p className="text-xl text-gray-700 mt-4 italic">{post.excerpt}</p>
        )}
      </header>

      <div className="prose prose-lg max-w-none">
        <PortableText value={post.body} components={components} />
      </div>
    </article>
  )
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts: { slug: { current: string } }[] = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug`
  )

  return posts.map((post) => ({
    slug: post.slug.current,
  }))
}