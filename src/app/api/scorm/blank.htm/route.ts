import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // Read the blank.htm file from the public directory
    const filePath = join(process.cwd(), 'public', 'blank.htm');
    const fileContent = readFileSync(filePath, 'utf-8');

    return new NextResponse(fileContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error reading blank.htm:', error);
    return new NextResponse('File not found', { status: 404 });
  }
}
