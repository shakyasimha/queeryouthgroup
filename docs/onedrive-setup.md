# OneDrive Integration Documentation

## Overview

This document explains how the OneDrive integration was implemented to automatically fetch and display PDF publications from a OneDrive folder on the Next.js website.

## Table of Contents

- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Setup Process](#setup-process)
- [Implementation Details](#implementation-details)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [Security Considerations](#security-considerations)

---

## Architecture

The integration uses Microsoft Graph API to connect to OneDrive and fetch PDF files. The architecture consists of:

1. **Azure AD App Registration** - Provides authentication credentials
2. **Microsoft Graph Client** - Handles API communication
3. **Next.js API Routes** - Server-side endpoints to fetch publications
4. **React Frontend** - Displays publications to users

### Data Flow

```text
OneDrive Folder → Microsoft Graph API → Next.js API Route → Frontend Component → User
```

---

## Prerequisites

Before implementing the OneDrive integration, ensure you have:

- An Azure account with access to Azure Active Directory
- A OneDrive account (personal or business)
- Node.js 18+ installed
- A Next.js 13+ project (App Router)
- Admin access to register Azure AD applications

---

## Setup Process

### 1. Azure AD App Registration

The first step is to register an application in Azure Active Directory to obtain authentication credentials.

#### Steps

1. **Navigate to Azure Portal**
   - Go to [https://portal.azure.com](https://portal.azure.com)
   - Sign in with your Azure account

2. **Create New App Registration**
   - Navigate to **Azure Active Directory** → **App registrations**
   - Click **New registration**
   - Fill in the details:
     - **Name**: `OneDrive Publications Integration`
     - **Supported account types**: Choose based on your needs
       - Single tenant (your organization only)
       - Multitenant (any Azure AD directory)
     - **Redirect URI**: `http://localhost:3000/api/auth/callback` (for development)

3. **Note Down Credentials**
   - After registration, copy the following from the Overview page:
     - **Application (client) ID**
     - **Directory (tenant) ID**

4. **Create Client Secret**
   - Go to **Certificates & secrets**
   - Click **New client secret**
   - Add a description (e.g., "OneDrive API Access")
   - Choose expiration period (recommendation: 24 months)
   - Click **Add** and immediately copy the **Value** (it won't be shown again)

5. **Configure API Permissions**
   - Go to **API permissions**
   - Click **Add a permission** → **Microsoft Graph** → **Application permissions**
   - Add the following permissions:
     - `Files.Read.All` - Read files in all site collections
   - Click **Grant admin consent** (requires admin privileges)

### 2. Environment Configuration

Create a `.env.local` file in your Next.js project root:

```bash
# Microsoft Azure AD Credentials
MICROSOFT_CLIENT_ID=your_application_client_id_here
MICROSOFT_CLIENT_SECRET=your_client_secret_value_here
MICROSOFT_TENANT_ID=your_directory_tenant_id_here

# OneDrive Configuration
ONEDRIVE_DRIVE_ID=your_drive_id_here
ONEDRIVE_FOLDER_ID=your_folder_id_here
```

> **Security Note**: Never commit `.env.local` to version control. Add it to `.gitignore`.

### 3. Finding OneDrive Drive and Folder IDs

To get your Drive ID and Folder ID, you can use the Microsoft Graph Explorer or create a helper script.

#### Option A: Using Microsoft Graph Explorer

1. Go to [Microsoft Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer)
2. Sign in with your account
3. Run this query to get drives:

   ```text
   GET https://graph.microsoft.com/v1.0/me/drives
   ```

4. Copy the `id` of your desired drive
5. To find folders, run:
  
   ```text
   GET https://graph.microsoft.com/v1.0/drives/{driveId}/root/children
   ```

6. Locate your publications folder and copy its `id`

#### Option B: Using a Helper Script

Create `scripts/find-onedrive-info.js`:

```javascript
const fetch = require('node-fetch');

async function getAccessToken() {
  const tokenEndpoint = `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/oauth2/v2.0/token`;
  
  const params = new URLSearchParams({
    client_id: process.env.MICROSOFT_CLIENT_ID,
    client_secret: process.env.MICROSOFT_CLIENT_SECRET,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  });

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    body: params,
  });

  const data = await response.json();
  return data.access_token;
}

async function findDrives() {
  const token = await getAccessToken();
  
  const response = await fetch('https://graph.microsoft.com/v1.0/drives', {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  const data = await response.json();
  console.log('Drives:', JSON.stringify(data, null, 2));
}

findDrives();
```

Run: `node scripts/find-onedrive-info.js`

### 4. Install Dependencies

Install required npm packages:

```bash
npm install @microsoft/microsoft-graph-client isomorphic-fetch pdf-parse
```

**Package purposes:**

- `@microsoft/microsoft-graph-client` - Official Microsoft Graph SDK
- `isomorphic-fetch` - Polyfill for fetch in Node.js
- `pdf-parse` - Extract metadata from PDF files

---

## Implementation Details

### Microsoft Graph Client Setup

The Graph client handles authentication and API requests.

**File**: `lib/microsoft-graph.ts`

```typescript
import { Client } from '@microsoft/microsoft-graph-client';
import 'isomorphic-fetch';

let accessToken: string | null = null;
let tokenExpiry: number = 0;

async function getAccessToken() {
  // Check if we have a valid cached token
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const tokenEndpoint = `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/oauth2/v2.0/token`;
  
  const params = new URLSearchParams({
    client_id: process.env.MICROSOFT_CLIENT_ID!,
    client_secret: process.env.MICROSOFT_CLIENT_SECRET!,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  });

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const data = await response.json();
  accessToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Refresh 1 min early
  
  return accessToken;
}

export async function getGraphClient() {
  const token = await getAccessToken();
  
  return Client.init({
    authProvider: (done) => {
      done(null, token);
    },
  });
}
```

**Key Features:**

- **Token Caching**: Stores access token in memory to avoid unnecessary API calls
- **Auto-refresh**: Refreshes token 1 minute before expiry
- **Client Credentials Flow**: Uses app-only authentication (no user interaction)

### API Route Implementation

**File**: `app/api/publications/route.ts`

This endpoint fetches PDFs from OneDrive and extracts metadata.

```typescript
import { NextResponse } from 'next/server';
import { getGraphClient } from '@/lib/microsoft-graph';
import pdfParse from 'pdf-parse';

interface Book {
  id: string;
  title: string;
  downloadUrl: string;
  coverImage?: string;
  webUrl: string;
  lastModified: string;
  size: number;
}

export async function GET() {
  try {
    const client = await getGraphClient();
    
    // Fetch all PDF files from the specified folder
    const response = await client
      .api(`/drives/${process.env.ONEDRIVE_DRIVE_ID}/items/${process.env.ONEDRIVE_FOLDER_ID}/children`)
      .filter("endswith(name,'.pdf')")
      .select('id,name,webUrl,@microsoft.graph.downloadUrl,size,lastModifiedDateTime')
      .get();

    const books: Book[] = await Promise.all(
      response.value.map(async (file: any) => {
        let title = file.name.replace('.pdf', '');
        let coverImage = null;

        try {
          // Fetch PDF content to extract title
          const pdfResponse = await fetch(file['@microsoft.graph.downloadUrl']);
          const arrayBuffer = await pdfResponse.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          
          // Parse PDF metadata
          const pdfData = await pdfParse(buffer);
          
          // Extract title from PDF metadata if available
          if (pdfData.info?.Title) {
            title = pdfData.info.Title;
          }

          // Generate cover image using Microsoft Graph thumbnails
          coverImage = await generatePdfThumbnail(file.id);
          
        } catch (error) {
          console.error(`Error processing PDF ${file.name}:`, error);
        }

        return {
          id: file.id,
          title,
          downloadUrl: file['@microsoft.graph.downloadUrl'],
          webUrl: file.webUrl,
          lastModified: file.lastModifiedDateTime,
          size: file.size,
          coverImage,
        };
      })
    );

    return NextResponse.json({ books });
  } catch (error) {
    console.error('Error fetching publications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch publications' },
      { status: 500 }
    );
  }
}

async function generatePdfThumbnail(fileId: string): Promise<string | null> {
  try {
    const client = await getGraphClient();
    
    const thumbnail = await client
      .api(`/drives/${process.env.ONEDRIVE_DRIVE_ID}/items/${fileId}/thumbnails`)
      .get();
    
    if (thumbnail.value?.[0]?.large?.url) {
      return thumbnail.value[0].large.url;
    }
  } catch (error) {
    console.error('Error generating thumbnail:', error);
  }
  
  return null;
}
```

**Process Flow:**

1. Authenticate with Microsoft Graph API
2. Fetch all PDF files from specified OneDrive folder
3. For each PDF:
   - Download the file
   - Extract metadata (title, author, etc.)
   - Generate thumbnail using Graph API
4. Return array of book objects

### Frontend Component

**File**: `app/publications/page.tsx`

Displays the publications in a responsive grid layout.

```typescript
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
```

**Features:**

- Responsive grid layout (1-4 columns based on screen size)
- Loading and error states
- Opens PDFs in new tab when clicked
- Displays file size and last modified date
- Shows cover image or fallback icon

---

## API Endpoints

### GET `/api/publications`

Fetches all PDF publications from OneDrive.

**Response Format:**

```json
{
  "books": [
    {
      "id": "01ABCDEF123456789",
      "title": "Sample Publication",
      "downloadUrl": "https://...",
      "coverImage": "https://...",
      "webUrl": "https://onedrive.live.com/...",
      "lastModified": "2024-01-15T10:30:00Z",
      "size": 2457600
    }
  ]
}
```

**Error Response:**

```json
{
  "error": "Failed to fetch publications"
}
```

---

## Automatic Updates

### Option 1: Incremental Static Regeneration (ISR)

Add to `app/publications/page.tsx`:

```typescript
export const revalidate = 300; // Revalidate every 5 minutes
```

This automatically refetches data every 5 minutes.

### Option 2: OneDrive Webhooks (Advanced)

Create a webhook endpoint to receive real-time notifications when files are added/modified.

**File**: `app/api/webhooks/onedrive/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const validationToken = request.nextUrl.searchParams.get('validationToken');
  
  // Handle Microsoft Graph webhook validation
  if (validationToken) {
    return new Response(validationToken, {
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  // Process webhook notification
  const body = await request.json();
  
  // Revalidate publications page
  revalidatePath('/publications');
  
  return NextResponse.json({ success: true });
}
```

**Register Webhook** (one-time setup):

```typescript
const client = await getGraphClient();

await client.api('/subscriptions').post({
  changeType: 'created,updated',
  notificationUrl: 'https://yourdomain.com/api/webhooks/onedrive',
  resource: `/drives/${DRIVE_ID}/root`,
  expirationDateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  clientState: 'secretClientState'
});
```

---

## Troubleshooting

### Common Issues

#### 1. Authentication Errors

**Error**: `401 Unauthorized` or `Invalid client secret`

**Solutions:**

- Verify credentials in `.env.local` match Azure portal
- Check if client secret has expired
- Ensure admin consent was granted for API permissions

#### 2. Files Not Found

**Error**: `404 Not Found` when accessing drive/folder

**Solutions:**

- Verify `ONEDRIVE_DRIVE_ID` and `ONEDRIVE_FOLDER_ID` are correct
- Check if the folder exists and contains PDF files
- Ensure the app has `Files.Read.All` permission

#### 3. Thumbnail Generation Fails

**Error**: No cover images displayed

**Solutions:**

- Thumbnails may take time to generate for new files
- Large PDFs may not generate thumbnails immediately
- Fallback icon is shown if thumbnail unavailable

#### 4. CORS Issues

**Error**: CORS errors in browser console

**Solutions:**

- Ensure API calls are server-side only (not from client)
- Use Next.js API routes as proxy

### Debug Mode

Enable detailed logging:

```typescript
// In microsoft-graph.ts
console.log('Token endpoint:', tokenEndpoint);
console.log('Token response:', data);

// In route.ts
console.log('Fetched files:', response.value);
console.log('Processed books:', books);
```

---

## Security Considerations

### Best Practices

1. **Never Expose Credentials**
   - Keep `.env.local` out of version control
   - Add to `.gitignore`: `.env*.local`
   - Use environment variables in production (Vercel, etc.)

2. **Least Privilege Principle**
   - Only request necessary API permissions
   - Use `Files.Read.All` instead of `Files.ReadWrite.All` if read-only

3. **Token Security**
   - Tokens are cached in memory (server-side only)
   - Tokens expire automatically
   - Never send tokens to client

4. **Input Validation**
   - Validate file types (PDF only)
   - Sanitize file names before display
   - Handle malformed PDF files gracefully

5. **Rate Limiting**
   - Microsoft Graph has rate limits (~2000 requests/minute)
   - Implement caching to reduce API calls
   - Use ISR to limit fetches

### Production Checklist

- [ ] Set up environment variables in hosting platform
- [ ] Update redirect URIs in Azure AD for production domain
- [ ] Enable HTTPS for all endpoints
- [ ] Monitor API usage and costs
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure proper CORS policies
- [ ] Test with large number of PDFs
- [ ] Set up monitoring for webhook failures (if used)

---

## Additional Resources

- [Microsoft Graph Documentation](https://docs.microsoft.com/en-us/graph/)
- [Azure AD App Registration Guide](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)
- [OneDrive API Reference](https://docs.microsoft.com/en-us/graph/api/resources/onedrive)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

## Support

For issues or questions:

1. Check troubleshooting section above
2. Review Microsoft Graph API documentation
3. Contact development team

---

**Last Updated**: January 2026
**Version**: 1.0.0
