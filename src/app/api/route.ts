import { NextResponse } from 'next/server';
import { getGraphClient } from '@/lib/microsoft-graph';

const pdfParse = require('pdf-parse');

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
    // You can use either a shared folder ID or a drive/folder path
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
          // Fetch PDF content to extract title and generate cover
          const pdfResponse = await fetch(file['@microsoft.graph.downloadUrl']);
          const arrayBuffer = await pdfResponse.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          
          // Parse PDF to extract metadata
          const pdfData = await pdfParse(buffer);
          
          // Try to get title from PDF metadata
          if (pdfData.info?.Title) {
            title = pdfData.info.Title;
          }

          // Generate cover image (first page thumbnail)
          // Note: For production, consider using a service like pdf2pic or storing thumbnails
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

// Helper function to generate thumbnail
async function generatePdfThumbnail(fileId: string): Promise<string | null> {
  try {
    const client = await getGraphClient();
    
    // Microsoft Graph can generate thumbnails
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