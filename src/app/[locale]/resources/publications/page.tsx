'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Book {
  id: string;
  title: string;
  downloadUrl: string;
  coverImage?: string;
  webUrl: string;
  lastModified: string;
  size: number;
}

export default function PublicationsPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/publications');
      
      if (!response.ok) {
        throw new Error('Failed to fetch publications');
      }
      
      const data = await response.json();
      setBooks(data.books);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading publications...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Publications</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
         <a 
            key={book.id}
            href={book.webUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
          >
            <div className="aspect-[3/4] bg-gray-200 relative">
              {book.coverImage ? (
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600">
                {new Date(book.lastModified).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {(book.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </a>
        ))}
      </div>
      
      {books.length === 0 && (
        <div className="text-center text-gray-600 mt-12">
          No publications found.
        </div>
      )}
    </div>
  );
}