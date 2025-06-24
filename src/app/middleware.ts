import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname; 

    // Skip if alreeady /en or API routes
    if (pathname.startsWith('/np/') || pathname.startsWith('/api')) {
        return NextResponse.next();
    }

    // Redirect /np to Nepali
    if (pathname == '/np') {
        return NextResponse.redirect(new URL('/np', request.url));
    }

    /// Serve English content from /en/* but hide /en/ prefix
    if (!pathname.startsWith('/en/')) {
        const url = request.nextUrl.clone(); 
        url.pathname = `/en${pathname}`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/'],
}