import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Justert import for å bruke navngitt eksport
import { movies } from '@/lib/models'; // Adjust the import based on your models

// Håndter GET- og POST-forespørselene
export async function GET() {
  try {
    const allMovies = await db.select().from(movies); // Hent alle filmer
    return NextResponse.json(allMovies); // Returner filmer som JSON
  } catch (error) {
    console.error('Feil ved henting av filmer:', error);
    return NextResponse.json({ error: 'Kunne ikke hente filmer' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { title, release_year, director, genre } = await req.json(); // Hent data fra forespørselen

  try {
    await db.insert(movies).values({ title, release_year, director, genre }); // Sett inn ny film
    return NextResponse.json({ message: 'Film lagt til' }, { status: 201 });
  } catch (error) {
    console.error('Feil ved å legge til film:', error);
    return NextResponse.json({ error: 'Kunne ikke legge til film' }, { status: 500 });
  }
} 