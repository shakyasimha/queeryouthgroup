# Sanity CMS Documentation

## Overview

This project uses [Sanity](https://www.sanity.io/) as a headless CMS for managing content. Sanity Studio is integrated directly into the Next.js application and can be accessed at `/studio`.

## Project Structure

```
src/
├── sanity/
│   ├── lib/
│   │   ├── client.ts        # Sanity client configuration
│   │   ├── image.ts         # Image URL builder (v1)
│   │   ├── imageUrl.ts      # Image URL builder (v2)
│   │   ├── live.ts          # Live content preview setup
│   │   └── queries.ts       # GROQ queries and type definitions
│   ├── schemaTypes/
│   │   ├── authorType.ts    # Author schema
│   │   ├── blockContentType.ts  # Rich text content schema
│   │   ├── blogPostType.ts  # Blog post schema
│   │   ├── categoryType.ts  # Category schema
│   │   ├── postType.ts      # Static page schema
│   │   └── index.ts         # Schema exports
│   ├── env.ts               # Environment variable validation
│   └── structure.ts         # Studio sidebar structure
└── app/
    └── studio/
        ├── [[...tool]]/
        │   └── page.tsx         # Studio route handler
        └── layout.tsx           # Studio layout
```

## Environment Variables

Add these variables to your `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-08-26
```

To find your project ID:
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Copy the Project ID from settings

## Content Types (Schemas)

### 1. Blog Posts (`blogPost`)

Blog posts for your blog section with categorization and authorship.

**Fields:**
- **Title** (required): The blog post title
- **Slug** (required): URL-friendly identifier (auto-generated from title)
- **Author**: Reference to an author document
- **Main Image**: Featured image with alt text support
- **Category** (required): Reference to a category
- **Body**: Rich text content with formatting options
- **Language**: English or Nepali (default: English)
- **Published At**: Publication date and time

**Usage in Studio:**
1. Navigate to "Blog" → "Blog Posts"
2. Click "Create" and select "Blog Post"
3. Fill in all required fields (marked with asterisk)
4. Select or create a category
5. Optionally assign an author
6. Add content to the body using the rich text editor
7. Publish when ready

### 2. Static Pages (`post`)

General website pages with multilingual support.

**Fields:**
- **Title** (required): Page title
- **Slug** (required): URL-friendly identifier
- **Language**: English or Nepali (default: English)
- **Author**: Reference to an author
- **Main Image**: Featured image with alt text
- **Categories**: Array of category references
- **Published At**: Publication date
- **Excerpt**: Brief summary (4 rows)
- **Body**: Rich text content

**Usage in Studio:**
1. Navigate to "Website Pages" → "Static Pages"
2. Create content for general website pages
3. Use language field to create multilingual versions
4. Link related pages using categories

### 3. Authors (`author`)

Author profiles for blog posts and content attribution.

**Fields:**
- **Name** (required): Author's full name
- **Slug**: URL-friendly identifier
- **Image**: Author photo with hotspot support
- **Bio**: Short biography in block format

**Usage in Studio:**
1. Navigate to "Blog" → "Authors"
2. Create author profiles before assigning to posts
3. Upload a profile image
4. Write a brief bio

### 4. Categories (`category`)

Content categorization for organization and filtering.

**Fields:**
- **Title**: Category name
- **Slug**: URL-friendly identifier
- **Description**: Category description

**Usage in Studio:**
1. Navigate to "Blog" → "Categories"
2. Create categories before assigning to blog posts
3. Use descriptive titles and slugs

### 5. Block Content (`blockContent`)

Rich text content type used in post bodies.

**Supported Features:**
- **Styles**: Normal, H1, H2, H3, H4, Blockquote
- **Lists**: Bullet lists
- **Marks**: Bold (Strong), Italic (Emphasis)
- **Links**: URL annotations
- **Images**: Inline images with alt text

## Accessing Sanity Studio

### Local Development
1. Start your Next.js development server: `npm run dev`
2. Navigate to `http://localhost:3000/studio`
3. Sign in with your Sanity account

### Production
Access the studio at `https://yourdomain.com/studio`

## Fetching Content in Next.js

### Using the Sanity Client

```typescript
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

// Example: Fetch all blog posts
const posts = await client.fetch(groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    category->{title, slug},
    author->{name, image},
    publishedAt
  }
`)
```

### Using Pre-defined Queries

```typescript
import { client } from '@/sanity/lib/client'
import { getPostBySlugQuery } from '@/sanity/lib/queries'

// Fetch a single post by slug
const post = await client.fetch(getPostBySlugQuery, { 
  slug: 'my-post-slug' 
})
```

### Handling Images

Use the `urlFor` helper to generate optimized image URLs:

```typescript
import { urlFor } from '@/sanity/lib/imageUrl'

// In your component
<img 
  src={urlFor(post.mainImage).width(800).height(400).url()} 
  alt={post.mainImage.alt || post.title}
/>
```

## GROQ Queries

GROQ (Graph-Relational Object Queries) is Sanity's query language.

### Basic Query Examples

**Get all blog posts:**
```groq
*[_type == "blogPost"]
```

**Get posts with specific language:**
```groq
*[_type == "blogPost" && language == "en"]
```

**Get post by slug:**
```groq
*[_type == "blogPost" && slug.current == "my-slug"][0]
```

**Order by date:**
```groq
*[_type == "blogPost"] | order(publishedAt desc)
```

**Include referenced data:**
```groq
*[_type == "blogPost"] {
  _id,
  title,
  author->{name, image},
  category->{title, slug}
}
```

## Content Workflow

### Creating a New Blog Post

1. **Access Studio**: Navigate to `/studio`
2. **Create Post**: Click "Blog" → "Blog Posts" → "Create"
3. **Add Content**:
   - Enter a compelling title
   - Click "Generate" next to slug field
   - Select a category (create if needed)
   - Optionally select an author
   - Upload a main image with descriptive alt text
   - Write your content in the body editor
   - Choose language (English/Nepali)
4. **Preview**: Use the preview pane to see formatting
5. **Publish**: Click "Publish" when ready

### Rich Text Editing

The body field supports:
- **Headings**: Use H1-H4 for structure
- **Text Formatting**: Bold, italic
- **Links**: Highlight text and click link icon
- **Images**: Click "+" and select image
- **Quotes**: Use blockquote style for quotes
- **Lists**: Add bullet points

### Managing Multilingual Content

1. Create separate documents for each language
2. Use the same slug pattern (e.g., `my-post` and `my-post-ne`)
3. Set the language field appropriately
4. Link related posts in your frontend logic

## Live Preview Setup

The project includes live preview functionality using `@/sanity/lib/live.ts`:

```typescript
import { sanityFetch, SanityLive } from '@/sanity/lib/live'

// In your page/component
const { data } = await sanityFetch({
  query: yourQuery,
  params: yourParams
})

// In your layout, add:
<SanityLive />
```

**Note**: Live preview uses Sanity's experimental API (`vX` version).

## Studio Customization

The studio sidebar is organized in `structure.ts`:
- **Website Pages**: Static page content
- **Blog**: Blog posts, categories, and authors
- **Other Content**: Any additional document types

To modify the structure, edit `@/sanity/structure.ts`.

## Type Safety

TypeScript types are defined in `@/sanity/lib/queries.ts`:

```typescript
interface SanityPost {
  _id: string
  title: string
  slug: { current: string }
  body: PortableTextBlock[]
  mainImage?: {
    asset: { _ref: string }
    alt?: string
  }
  // ... other fields
}
```

Use these types when fetching data for full type safety.

## Best Practices

### Content Creation
- Always add alt text to images for accessibility
- Generate slugs from titles for consistency
- Use descriptive category names
- Publish posts with publication dates for proper ordering

### Image Optimization
- Upload high-quality images (they'll be optimized by Sanity CDN)
- Use the hotspot feature for important image areas
- Always provide alt text

### GROQ Queries
- Select only the fields you need
- Use projections `{}` to shape your data
- Order results when displaying lists
- Handle null/undefined values in your frontend

### Performance
- Use `useCdn: true` in production for faster reads
- Implement proper caching strategies in Next.js
- Use image transformations (width, height, quality)

## Troubleshooting

### Studio Won't Load
- Check environment variables are set correctly
- Verify project ID and dataset name
- Clear browser cache and cookies

### Content Not Appearing
- Ensure documents are published (not drafts)
- Check GROQ query syntax
- Verify the correct dataset is selected

### Image Issues
- Confirm image asset is uploaded
- Check image reference format
- Verify CDN URL generation

### Type Errors
- Ensure schema types match TypeScript interfaces
- Check for null/undefined handling
- Validate GROQ query returns expected shape

## Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet)
- [Next.js Integration Guide](https://www.sanity.io/guides/nextjs-app-router-live-preview)
- [Portable Text Documentation](https://portabletext.org/)

## Support

For issues specific to this implementation, check the project repository. For Sanity-specific questions, refer to [Sanity's documentation](https://www.sanity.io/docs) or their [community Slack](https://slack.sanity.io/).
