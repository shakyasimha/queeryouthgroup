import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/imageUrl'
import { notFound } from 'next/navigation'
import { alegreyaSans, roboto, notoSansDevanagari } from '@/ui/fonts'

// Generate static params for all blog posts (this makes pages pre-built at build time)
export async function generateStaticParams() {
  const posts = await client.fetch(`
    *[_type == "blogPost"] {
      "slug": slug.current,
      language
    }
  `)
  
  return posts.map((post: any) => ({
    locale: post.language,
    slug: post.slug,
  }))
}

// Fetch individual blog post by slug
async function getPost(slug: string, locale: string) {
  return await client.fetch(`
    *[_type == "blogPost" && slug.current == $slug && language == $locale][0] {
      _id,
      title,
      "slug": slug.current,
      body,
      mainImage,
      publishedAt,
      author->{
        name,
        image,
        bio
      },
      category->{
        title,
        slug
      }
    }
  `, { slug, locale })
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string; locale: string }> 
}) {
  const { slug, locale } = await params
  const post = await getPost(slug, locale)
  
  return {
    title: post?.title || 'Blog Post',
    description: post?.title,
  }
}

// The actual blog post page
export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ slug: string; locale: string }> 
}) {
  const { slug, locale } = await params
  const post = await getPost(slug, locale)
  
  // If post doesn't exist, show 404
  if (!post) {
    notFound()
  }
  
  return (
    <article className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Featured Image */}
        {post.mainImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={urlFor(post.mainImage).width(1200).height(600).url()} 
              alt={post.mainImage.alt || post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        
        {/* Title */}
        <h1 className={`text-4xl md:text-5xl font-bold text-black mb-6 ${
          locale === 'en' ? alegreyaSans.className : notoSansDevanagari.className
        }`}>
          {post.title}
        </h1>
        
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-200">
          {/* Author */}
          {post.author && (
            <div className="flex items-center gap-3">
              {post.author.image && (
                <img 
                  src={urlFor(post.author.image).width(50).height(50).url()} 
                  alt={post.author.name}
                  className="rounded-full w-12 h-12 object-cover"
                />
              )}
              <div>
                <p className={`text-sm text-gray-500 ${
                  locale === 'en' ? roboto.className : notoSansDevanagari.className
                }`}>Written by</p>
                <p className={`font-semibold text-black ${
                  locale === 'en' ? roboto.className : notoSansDevanagari.className
                }`}>{post.author.name}</p>
              </div>
            </div>
          )}
          
          {/* Date */}
          <div className="ml-auto">
            <p className={`text-sm text-gray-500 ${
              locale === 'en' ? roboto.className : notoSansDevanagari.className
            }`}>Published on</p>
            <time className={`font-semibold text-black ${
              locale === 'en' ? roboto.className : notoSansDevanagari.className
            }`}>
              {new Date(post.publishedAt).toLocaleDateString(
                locale === 'en' ? 'en-US' : 'ne-NP',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </time>
          </div>
          
          {/* Category */}
          {post.category && (
            <div className="w-full mt-4">
              <span className="inline-block bg-[#d13467] text-white px-4 py-2 rounded-full text-sm font-medium">
                {post.category.title}
              </span>
            </div>
          )}
        </div>
        
        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          <PortableText 
            value={post.body}
            components={{
              types: {
                image: ({ value }) => (
                  <img
                    src={urlFor(value).width(800).url()}
                    alt={value.alt || 'Blog image'}
                    className="rounded-lg my-8"
                  />
                ),
              },
              marks: {
                link: ({ value, children }) => {
                  const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
                  return (
                    <a 
                      href={value?.href} 
                      target={target}
                      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                      className="text-[#d13467] hover:underline"
                    >
                      {children}
                    </a>
                  )
                },
              },
              block: {
                normal: ({ children }) => <p className={`mb-6 text-gray-900 ${
                  locale === 'en' ? roboto.className : notoSansDevanagari.className
                }`}>{children}</p>,
                h1: ({ children }) => <h1 className={`text-4xl font-bold mt-8 mb-4 text-black ${
                  locale === 'en' ? alegreyaSans.className : notoSansDevanagari.className
                }`}>{children}</h1>,
                h2: ({ children }) => <h2 className={`text-3xl font-bold mt-8 mb-4 text-black ${
                  locale === 'en' ? alegreyaSans.className : notoSansDevanagari.className
                }`}>{children}</h2>,
                h3: ({ children }) => <h3 className={`text-2xl font-bold mt-6 mb-3 text-black ${
                  locale === 'en' ? alegreyaSans.className : notoSansDevanagari.className
                }`}>{children}</h3>,
                h4: ({ children }) => <h4 className={`text-xl font-bold mt-6 mb-3 text-black ${
                  locale === 'en' ? alegreyaSans.className : notoSansDevanagari.className
                }`}>{children}</h4>,
                blockquote: ({ children }) => (
                  <blockquote className={`border-l-4 border-[#d13467] pl-4 italic my-6 ${
                    locale === 'en' ? roboto.className : notoSansDevanagari.className
                  }`}>
                    {children}
                  </blockquote>
                ),
              },
            }}
          />
        </div>
        
        {/* Author Bio (if available) */}
        {post.author?.bio && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className={`text-xl font-bold mb-4 text-black ${
              locale === 'en' ? alegreyaSans.className : notoSansDevanagari.className
            }`}>About the Author</h3>
            <div className="flex items-start gap-4">
              {post.author.image && (
                <img 
                  src={urlFor(post.author.image).width(80).height(80).url()} 
                  alt={post.author.name}
                  className="rounded-full w-20 h-20 object-cover"
                />
              )}
              <div>
                <p className={`font-semibold text-lg mb-2 text-black ${
                  locale === 'en' ? roboto.className : notoSansDevanagari.className
                }`}>{post.author.name}</p>
                <div className={`prose prose-sm text-black ${
                  locale === 'en' ? roboto.className : notoSansDevanagari.className
                }`}>
                  <PortableText value={post.author.bio} />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Back to Blog Link */}
        <div className="mt-12 text-center">
         <a 
            href={`/${locale}/blog`}
            className={`inline-flex items-center gap-2 text-[#d13467] hover:underline font-medium ${
              locale === 'en' ? roboto.className : notoSansDevanagari.className
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {locale === 'en' ? 'Back to Blog' : 'ब्लगमा फर्कनुहोस्'}
          </a>
        </div>
      </div>
    </article>
  )
}