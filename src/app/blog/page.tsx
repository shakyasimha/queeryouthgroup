import Link from 'next/link'
import { client, POSTS_QUERY, urlFor } from '@/lib/sanity'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  mainImage?: {
    asset: { _ref: string }
    alt?: string
  }
}

export default async function BlogPage() {
  const posts: Post[] = await client.fetch(POSTS_QUERY)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {post.mainImage && (
              <img
                src={urlFor(post.mainImage)}
                alt={post.mainImage.alt || post.title}
                className="w-full h-48 object-cover"
              />
            )}
            
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                <Link 
                  href={`/blog/${post.slug.current}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              
              {post.excerpt && (
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
              )}
              
              <time className="text-sm text-gray-500">
                {new Date(post.publishedAt).toLocaleDateString()}
              </time>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}