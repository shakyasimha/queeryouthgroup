import { NextResponse } from 'next/server';
import { getAllEntries } from '@/utils/db';

export async function GET() {
  try {
    const entries = getAllEntries();
    return NextResponse.json({ data: entries, error: null });
  } catch (error) {
    console.error('Error fetching dictionary entries:', error);
    return NextResponse.json(
      { 
        data: null, 
        error: error instanceof Error ? error.message : 'Failed to fetch entries' 
      },
      { status: 500 }
    );
  }
}