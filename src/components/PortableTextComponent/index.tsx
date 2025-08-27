// @/components/PortableTextComponent/index.tsx

import React from 'react';
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
}

// More specific type for component props
interface PortableTextComponentProps {
  children?: React.ReactNode;
  value?: {
    [key: string]: unknown;
  };
}

// Helper function to detect if text contains Nepali (Devanagari) characters
const hasNepaliText = (text: string): boolean => {
  // Unicode range for Devanagari script (0900-097F)
  const devanagariRegex = /[\u0900-\u097F]/;
  return devanagariRegex.test(text);
};

// Helper function to get appropriate font class based on text content and type
const getFontClass = (children: React.ReactNode, isHeader: boolean = false): string => {
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
    image: ({ value }: { value: SanityImageValue }): JSX.Element | null => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-6 flex justify-center">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Image'}
            width={400}
            height={400}
            className="rounded-lg object-contain max-w-full h-auto"
            style={{ objectFit: 'contain' as const }}
          />
        </div>
      );
    },
    code: ({ value }: { value: { code: string; language: string } }) => (
      <pre className="bg-gray-100 p-4 rounded-lg my-6">
        <code>{value.code}</code>
      </pre>
    ),
  },
  block: {
    normal: ({ children }: PortableTextComponentProps) => (
      <p className={`${getFontClass(children)} text-justify text-black mb-4`}>
        {children}
      </p>
    ),
    h1: ({ children }: PortableTextComponentProps) => (
      <h1 className={`${getFontClass(children, true)} text-2xl text-center font-bold mb-4 text-black`}>
        {children}
      </h1>
    ),
    h2: ({ children }: PortableTextComponentProps) => (
      <h2 className={`${getFontClass(children, true)} text-xl text-center font-bold mb-3 text-black`}>
        {children}
      </h2>
    ),
    h3: ({ children }: PortableTextComponentProps) => (
      <h3 className={`${getFontClass(children, true)} text-lg text-center font-bold mb-2 text-black`}>
        {children}
      </h3>
    ),
    h4: ({ children }: PortableTextComponentProps) => (
      <h4 className={`${getFontClass(children, true)} text-base text-center font-bold mb-2 text-black`}>
        {children}
      </h4>
    ),
    blockquote: ({ children }: PortableTextComponentProps) => (
      <blockquote className={`${getFontClass(children)} border-l-4 border-gray-300 pl-4 italic my-4 text-black`}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: PortableTextComponentProps) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: PortableTextComponentProps) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }: PortableTextComponentProps & { value?: { href: string } }) => (
      <a 
        href={value?.href} 
        className="text-blue-600 hover:text-blue-800 underline"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: PortableTextComponentProps) => (
      <ul className={`${getFontClass(children)} text-black mb-4 pl-6 list-disc`}>
        {children}
      </ul>
    ),
    number: ({ children }: PortableTextComponentProps) => (
      <ol className={`${getFontClass(children)} text-black mb-4 pl-6 list-decimal`}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: PortableTextComponentProps) => (
      <li className={`${getFontClass(children)} text-black mb-2`}>
        {children}
      </li>
    ),
    number: ({ children }: PortableTextComponentProps) => (
      <li className={`${getFontClass(children)} text-black mb-2`}>
        {children}
      </li>
    ),
  },
};

// Optional: Create a variant for compact spacing
export const compactPortableTextComponents: PortableTextComponents = {
  ...portableTextComponents,
  block: {
    ...portableTextComponents.block,
    normal: ({ children }: PortableTextComponentProps) => (
      <p className={`${getFontClass(children)} text-justify text-black mb-2`}>
        {children}
      </p>
    ),
  },
};