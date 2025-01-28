'use client'; // Indikerer at dette er en client-komponent og ikke SSR fordi vi bruker fetch fra Next.js

import { useEffect, useState } from 'react';

interface MovieProps {
  id: number;
  title: string;
  release_year: number;
  director: string;
  genre: string;
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [newMovie, setNewMovie] = useState({ title: '', release_year: '', director: '', genre: '' });
  const [error, setError] = useState<string | null>(null);

  // Fetcher movies fra API'en
  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/movies');
      if (!response.ok) throw new Error('Failed to fetch movies');
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Kunne ikke hente filmer'); // setter error til at det ikke gikk an å hente filmer
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMovie),
      });
      if (!response.ok) throw new Error('Failed to add movie');
      setNewMovie({ title: '', release_year: '', director: '', genre: '' }); // Reset form
      fetchMovies(); // Refresh movie list
    } catch (error) {
      console.error('Error adding movie:', error);
      setError('Kunne ikke legge til film'); // setter error til at det ikke gikk an å legge til film
    }
  };

  useEffect(() => { // useEffect brukes til å hente filmer når komponenten blir rendret
    fetchMovies();
  }, []);

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen p-10 flex justify-center">
      <div className="container flex justify-between gap-5">
        <div className="h-full flex flex-col">
          <h1 className="text-4xl font-bold mb-8">Filmer</h1>
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4 max-w-sm p-5 bg-zinc-900 rounded-xl">
            <h1 className='text-3xl'>Legg til film</h1>
            <input type="text" placeholder="Tittel" className="p-2 rounded text-zinc-950 focus:text-zinc-950" value={newMovie.title} onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })} required />
            <input type="number" placeholder="Utgivelsesår" className="p-2 rounded text-zinc-950 focus:text-zinc-950" value={newMovie.release_year} onChange={(e) => setNewMovie({ ...newMovie, release_year: e.target.value.slice(0, 4) })} required />
            <input type="text" placeholder="Regissør" className="p-2 rounded text-zinc-950 focus:text-zinc-950" value={newMovie.director} onChange={(e) => setNewMovie({ ...newMovie, director: e.target.value })} required />
            <input type="text" placeholder="Sjanger" className="p-2 rounded text-zinc-950 focus:text-zinc-950" value={newMovie.genre} onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })} required />
            <button type="submit" className="bg-zinc-700 text-zinc-100 p-2 rounded">Legg til film</button>
          </form>
          <button onClick={() => window.history.back()} className="bg-zinc-700 text-zinc-100 p-2 rounded mt-4">Tilbake</button>
        </div>
        
        <div className="w-full flex flex-col">
          <h1 className="text-4xl font-bold mb-8">Liste over filmer</h1>
          <div className="flex flex-col gap-5 p-5 bg-zinc-900 rounded-xl">
            {error && <p>{error}</p>}
            <ul>
              {movies.map((movie) => (
                <div key={movie.id} className="p-5 border-2 border-zinc-800 rounded-lg mb-4">
                  <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                  <p className='text-zinc-500'><strong>Utgivelsesår:</strong> {movie.release_year}</p>
                  <p className='text-zinc-500'><strong>Regissør:</strong> {movie.director}</p>
                  <p className='text-zinc-500'><strong>Sjanger:</strong> {movie.genre}</p>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}