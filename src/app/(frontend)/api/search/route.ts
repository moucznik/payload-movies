import { searchMovies } from '@/movies';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query') ?? '';

  return NextResponse.json(await searchMovies(query));
}
