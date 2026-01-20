import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const validationToken = request.nextUrl.searchParams.get('validationToken');
  
  // Microsoft Graph webhook validation
  if (validationToken) {
    return new Response(validationToken, {
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  // Handle actual webhook notification
  const body = await request.json();
  
  // Revalidate the publications page to fetch fresh data
  revalidatePath('/publications');
  
  return NextResponse.json({ success: true });
}