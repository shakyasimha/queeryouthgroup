import { notFound } from 'next/navigation'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { client, POST_QUERY, urlFor } from '@/lib/sanity'

interface Post {
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  mainImage?: {
    asset: { _ref: string }
    alt?: string
  }
  body: PortableTextBlock[]
  author?: {
    name: string
    image?: {
      asset: { _ref: string }
    }
  }
}

interface PortableTextBlock {
  _type: string
  _key: string
  children?: PortableTextChild[]
  style?: string
  markDefs?: MarkDef[]
}

interface PortableTextChild {
  _type: 'span'
  text: string
  marks?: string[]
}

interface MarkDef {
  _key: string
  _type: string
  href?: string
}

interface ImageBlock {
  _type: 'image'
  asset: {
    _ref: string
  }
  alt?: string
}

interface LinkMark {
  _type: 'link'
  href: string
}

// Custom components for PortableText with proper types
const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageBlock }) => {
      const imageUrl = urlFor(value)
      if (!imageUrl) return null
      
      return (
        <div className="w-full h-auto my-8">
          <Image
            src={imageUrl}
            alt={value.alt || ''}
            width={800}
            height={400}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value: LinkMark }) => (
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
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-3xl font-bold my-6">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-2xl font-semibold my-5">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-xl font-medium my-4">{children}</h3>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
}

export default async function PostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // Await the params Promise
  const { slug } = await params
  const post: Post = await client.fetch(POST_QUERY, { slug })

  if (!post) {
    notFound()
  }

  const mainImageUrl = post.mainImage ? urlFor(post.mainImage) : null
  const authorImageUrl = post.author?.image ? urlFor(post.author.image) : null

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {mainImageUrl && (
        <div className="w-full h-64 md:h-96 relative mb-8 rounded-lg overflow-hidden">
          <Image
            src={mainImageUrl}
            alt={post.mainImage?.alt || post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-gray-600">
          {post.author && (
            <div className="flex items-center gap-2">
              {authorImageUrl && (
                <div className="w-8 h-8 relative rounded-full overflow-hidden">
                  <Image
                    src={authorImageUrl}
                    alt={post.author.name}
                    fill
                    className="object-cover"
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

// Generate static params for all posts - also updated for Next.js 15
export async function generateStaticParams() {
  const posts: { slug: { current: string } }[] = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug`
  )

  return posts.map((post) => ({
    slug: post.slug.current,
  }))
}