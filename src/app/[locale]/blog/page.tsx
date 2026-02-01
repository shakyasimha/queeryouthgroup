import { client } from '@/sanity/lib/client'
import BlogComponent from '@/components/BlogComponent'

async function getBlogPosts(locale: string) {
  return await client.fetch(`
    *[_type == "blogPost" && language == $locale] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      mainImage,
      author->{
        name,
        image
      },
      category->{
        title
      },
      "excerpt": array::join(string::split((pt::text(body)), "")[0..200], "") + "..."
    }
  `, { locale })
}

export default async function BlogPage({
  params
}: {
  params: Promise<{ locale: string }> // Changed this
}) {
  const { locale } = await params // Added await here
  const posts = await getBlogPosts(locale) // Use destructured locale

  return (
    <div className="flex items-center justify-center flex-col bg-white text-black min-h-screen py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      
      {posts.length === 0 ? (
        <p className="text-gray-500">No blog posts yet.</p>
      ) : (
        posts.map((post: any) => (
          <BlogComponent
            key={post._id}
            title={post.title}
            excerpt={post.excerpt}
            publishedAt={post.publishedAt}
            slug={post.slug}
            author={post.author?.name}
            category={post.category?.title}
            locale={locale} // Use destructured locale
          />
        ))
      )}
    </div>
  )
}