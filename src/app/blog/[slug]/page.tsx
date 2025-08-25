import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
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
  body: any[]
  author?: {
    name: string
    image?: {
      asset: { _ref: string }
    }
  }
}

// Custom components for PortableText
const components = {
  types: {
    image: ({ value }: any) => (
      <img
        src={urlFor(value)}
        alt={value.alt || ''}
        className="w-full h-auto my-8 rounded-lg"
      />
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
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
    h1: ({ children }: any) => <h1 className="text-3xl font-bold my-6">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-semibold my-5">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-medium my-4">{children}</h3>,
    blockquote: ({ children }: any) => (
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

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {post.mainImage && (
        <img
          src={urlFor(post.mainImage)}
          alt={post.mainImage.alt || post.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
        />
      )}

      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-gray-600">
          {post.author && (
            <div className="flex items-center gap-2">
              {post.author.image && (
                <img
                  src={urlFor(post.author.image)}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full"
                />
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