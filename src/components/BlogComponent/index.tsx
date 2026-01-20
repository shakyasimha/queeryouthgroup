"use client";

import Link from 'next/link';

interface BlogComponentProps {
  title: string;
  excerpt: string;
  publishedAt: string;
  slug: string;
  author?: string;
  category?: string;
  locale: string;
}

export default function BlogComponent({
  title,
  excerpt,
  publishedAt,
  slug,
  author,
  category,
  locale
}: BlogComponentProps) {
  // Format the date
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div 
      className="w-[calc(100%-2rem)] mx-4 md:w-[600px] lg:w-[700px] xl:w-[800px] md:mx-auto mt-4 mb-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {title}
        </h2>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <time>{formattedDate}</time>
          {author && (
            <>
              <span>•</span>
              <span>by {author}</span>
            </>
          )}
          {category && (
            <>
              <span>•</span>
              <span className="text-blue-600">{category}</span>
            </>
          )}
        </div>
        
        <p className="text-gray-600 mb-4">
          {excerpt}
        </p>
        
        <Link 
          href={`/${locale}/blog/${slug}`}
          className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
        >
          Read more...
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}