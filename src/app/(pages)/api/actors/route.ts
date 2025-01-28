import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Justert import for å bruke navngitt eksport
import { actors } from '@/lib/models'; // Adjust the import based on your models

// Håndter GET- og POST-forespørselene
export async function GET() {
  try {
    const allActors = await db.select({
      id: actors.id,
      name: actors.name,
      birth_year: actors.birth_year,
      moviesdirected: actors.moviesdirected, // Assuming this is a string
    }).from(actors);

    // Convert moviesdirected to an array if it's a string
    const processedActors = allActors.map(actor => ({
      ...actor,
      moviesdirected: typeof actor.moviesdirected === 'string'
        ? actor.moviesdirected.split(',').map(title => title.trim()) // Split and trim titles
        : [] // Default to an empty array if not a string
    }));

    return NextResponse.json(processedActors); // Return processed actors
  } catch (error: unknown) {
    if (error instanceof Error) {
        console.error('Feil ved henting av skuespillere:', error.message);
        console.error('Full error object:', error);
    } else {
        console.error('Feil ved henting av skuespillere:', error);
    }
    return NextResponse.json({ error: 'Kunne ikke hente skuespillere' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { name, birth_year, moviesdirected } = await req.json(); // Hent data fra forespørselen

  try {
    await db.insert(actors).values({ name, birth_year, moviesdirected }); // Sett inn ny skuespiller
    return NextResponse.json({ message: 'Skuespiller lagt til' }, { status: 201 });
  } catch (error) {
    console.error('Feil ved å legge til skuespiller:', error);
    return NextResponse.json({ error: 'Kunne ikke legge til skuespiller' }, { status: 500 });
  }
}