// Create this file: app/api/test-wp/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
    try {
        console.log('🚀 Testing server-side fetch to WordPress...');
        
        const testUrl = "https://cms.queeryouthgroup.org.np/~queeryouthgroup/wp-json/wp/v2/posts";
        console.log(`📡 Fetching: ${testUrl}`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
        
        const res = await fetch(testUrl, {
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'NextJS-Server/1.0',
            },
        });
        
        clearTimeout(timeoutId);
        
        console.log(`📊 Response status: ${res.status}`);
        console.log(`📊 Response headers:`, Object.fromEntries(res.headers.entries()));
        
        if (!res.ok) {
            const errorText = await res.text();
            console.error(`❌ HTTP Error: ${res.status} - ${res.statusText}`);
            console.error(`❌ Error body:`, errorText);
            
            return NextResponse.json({ 
                success: false,
                error: `HTTP ${res.status}: ${res.statusText}`,
                errorBody: errorText,
                url: testUrl,
                timestamp: new Date().toISOString()
            }, { status: 500 });
        }
        
        const data = await res.json();
        console.log(`✅ Success! Got ${data.length} posts`);
        
        if (data.length > 0) {
            console.log(`📄 First post:`, {
                id: data[0].id,
                slug: data[0].slug,
                title: data[0].title?.rendered?.substring(0, 50)
            });
        }
        
        return NextResponse.json({ 
            success: true,
            postsFound: data.length,
            firstPost: data[0] ? {
                id: data[0].id,
                slug: data[0].slug,
                title: data[0].title?.rendered,
                hasContent: !!data[0].content?.rendered,
                contentLength: data[0].content?.rendered?.length || 0
            } : null,
            url: testUrl,
            serverTime: new Date().toISOString(),
            nodeVersion: process.version,
            platform: process.platform
        });
        
    } catch (error) {
        console.error('💥 Server fetch failed:', error);
        
        const errorDetails = {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            errorName: error instanceof Error ? error.name : 'Unknown',
            // @ts-expect-error
            errorCode: error?.code,
            timestamp: new Date().toISOString(),
            nodeVersion: process.version,
            platform: process.platform,
            // Add specific SSL/Network error details
            isSSLError: error instanceof Error && error.message.includes('certificate'),
            isTimeoutError: error instanceof Error && error.name === 'AbortError',
            isNetworkError: error instanceof Error && error.message.includes('fetch')
        };
        
        // Log error message separately to avoid circular reference
        console.error('Error message:', error instanceof Error ? error.message : error);
        console.error('Error name:', error instanceof Error ? error.name : 'Unknown');
        
        return NextResponse.json(errorDetails, { status: 500 });
    }
}