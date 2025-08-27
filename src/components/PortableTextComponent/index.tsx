// @/components/PortableTextComponent/index.tsx
import React, { ReactNode } from 'react';
import { PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/client';
import { alegreyaSans, roboto, notoSansDevanagari } from '@/ui/fonts';

// Type for Sanity image in PortableText
interface SanityImageValue {
  asset: {
    _ref: string;
  };
  alt?: string;
  caption?: string;
}

// Properly typed component props that match @portabletext/react expectations
interface BlockComponentProps {
  children?: ReactNode;
  value?: unknown;
}

interface MarkComponentProps {
  children?: ReactNode;
  value?: {
    href?: string;
    [key: string]: unknown;
  };
}

interface ListComponentProps {
  children?: ReactNode;
}

// Helper function to detect if text contains Nepali (Devanagari) characters
const hasNepaliText = (text: string): boolean => {
  // Unicode range for Devanagari script (0900-097F)
  const devanagariRegex = /[\u0900-\u097F]/;
  return devanagariRegex.test(text);
};

// Helper function to get appropriate font class based on text content and type
const getFontClass = (children?: ReactNode, isHeader: boolean = false): string => {
  if (!children) {
    return isHeader ? alegreyaSans.className : roboto.className;
  }
  
  // Convert children to string to check for Nepali characters
  const textContent = React.Children.toArray(children).join('');
  
  if (hasNepaliText(textContent)) {
    // Use Noto Sans Devanagari for all Nepali text (both headers and body)
    return notoSansDevanagari.className;
  }
  
  // Use appropriate English fonts
  return isHeader ? alegreyaSans.className : roboto.className;
};

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImageValue }): React.JSX.Element | null => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-6 flex justify-center flex-col items-center">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Image'}
            width={600}
            height={400}
            className="rounded-lg object-contain max-w-full h-auto shadow-md"
            style={{ objectFit: 'contain' as const }}
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-600 mt-2">
              {value.caption}
            </figcaption>
          )}
        </div>
      );
    },
    code: ({ value }: { value: { code: string; language: string } }) => (
      <pre className="bg-gray-100 p-4 rounded-lg my-6 overflow-x-auto border border-gray-200">
        <code className={`text-sm ${roboto.className} font-mono`}>{value?.code}</code>
      </pre>
    ),
  },
  block: {
    normal: ({ children }: BlockComponentProps) => (
      <p className={`${getFontClass(children)} text-justify text-gray-800 mb-4 leading-relaxed`}>
        {children}
      </p>
    ),
    h1: ({ children }: BlockComponentProps) => (
      <h1 className={`${getFontClass(children, true)} text-3xl md:text-4xl text-center font-bold my-6 text-gray-900`}>
        {children}
      </h1>
    ),
    h2: ({ children }: BlockComponentProps) => (
      <h2 className={`${getFontClass(children, true)} text-2xl md:text-3xl text-center font-bold my-5 text-gray-900`}>
        {children}
      </h2>
    ),
    h3: ({ children }: BlockComponentProps) => (
      <h3 className={`${getFontClass(children, true)} text-xl md:text-2xl text-center font-bold my-4 text-gray-900`}>
        {children}
      </h3>
    ),
    h4: ({ children }: BlockComponentProps) => (
      <h4 className={`${getFontClass(children, true)} text-lg md:text-xl text-center font-bold my-3 text-gray-900`}>
        {children}
      </h4>
    ),
    blockquote: ({ children }: BlockComponentProps) => (
      <blockquote className={`${getFontClass(children)} border-l-4 border-blue-500 pl-4 italic my-6 bg-blue-50 py-3 px-4 rounded-r text-gray-700`}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: MarkComponentProps) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }: MarkComponentProps) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }: MarkComponentProps) => (
      <a 
        href={value?.href} 
        className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200 font-medium"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: ListComponentProps) => (
      <ul className={`${getFontClass(children)} text-gray-800 mb-6 pl-6 list-disc space-y-2`}>
        {children}
      </ul>
    ),
    number: ({ children }: ListComponentProps) => (
      <ol className={`${getFontClass(children)} text-gray-800 mb-6 pl-6 list-decimal space-y-2`}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: ListComponentProps) => (
      <li className={`${getFontClass(children)} text-gray-800`}>
        {children}
      </li>
    ),
    number: ({ children }: ListComponentProps) => (
      <li className={`${getFontClass(children)} text-gray-800`}>
        {children}
      </li>
    ),
  },
};

// Optional: Create a variant for compact spacing
export const compactPortableTextComponents: PortableTextComponents = {
  ...portableTextComponents,
  block: {
    ...(portableTextComponents.block as Record<string, PortableTextComponents['block']>),
    normal: ({ children }: BlockComponentProps) => (
      <p className={`${getFontClass(children)} text-justify text-gray-800 mb-2 leading-relaxed`}>
        {children}
      </p>
    ),
  },
};


// Default export for easier imports
export default portableTextComponents;