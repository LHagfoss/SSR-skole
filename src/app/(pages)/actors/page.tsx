'use client'; // Indikerer at dette er en client-komponent og ikke SSR fordi vi bruker fetch fra Next.js

import { useEffect, useState } from 'react';

interface ActorProps {
  id: number;
  name: string;
  birth_year: number;
  moviesdirected: string[];
}

export default function ActorsPage() {
  const [actors, setActors] = useState<ActorProps[]>([]);
  const [newActor, setNewActor] = useState<{ name: string; birth_year: string; moviesdirected: string[] }>({ name: '', birth_year: '', moviesdirected: [] });
  const [error, setError] = useState<string | null>(null);

  // Fetcher skuespillere fra API'en
  const fetchActors = async () => {
    try {
      const response = await fetch('/api/actors');
      if (!response.ok) throw new Error('Failed to fetch actors');
      const data = await response.json();
      setActors(data);
    } catch (error) {
      console.error('Error fetching actors:', error);
      setError('Kunne ikke hente skuespillere'); // setter error til at det ikke gikk an å hente skuespillere
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/actors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newActor),
      });
      if (!response.ok) throw new Error('Failed to add actor');
      setNewActor({ name: '', birth_year: '', moviesdirected: [] }); // Reset form
      fetchActors(); // Refresh actor list
    } catch (error) {
      console.error('Error adding actor:', error);
      setError('Kunne ikke legge til skuespiller'); // setter error til at det ikke gikk an å legge til skuespiller
    }
  };

  useEffect(() => { // useEffect brukes til å hente skuespillere når komponenten blir rendret
    fetchActors();
  }, []);

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen p-10 flex justify-center">
      <div className="container flex justify-between gap-5">
        <div className="h-full flex flex-col">
          <h1 className="text-4xl font-bold mb-8">Skuespillere</h1>
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4 max-w-sm p-5 bg-zinc-900 rounded-xl">
            <h1 className='text-3xl'>Legg til skuespiller</h1>
            <input type="text" placeholder="Navn" className="p-2 rounded text-zinc-950 focus:text-zinc-950" value={newActor.name} onChange={(e) => setNewActor({ ...newActor, name: e.target.value })} required />
            <input type="number" placeholder="Fødselsår" className="p-2 rounded text-zinc-950 focus:text-zinc-950" value={newActor.birth_year} onChange={(e) => setNewActor({ ...newActor, birth_year: e.target.value.slice(0, 4) })} required />
            <input type="text" placeholder="Filmografi" className="p-2 rounded text-zinc-950 focus:text-zinc-950" value={newActor.moviesdirected.join(', ')} onChange={(e) => setNewActor({ ...newActor, moviesdirected: e.target.value.split(',').map(f => f.trim()) })} required />
            <button type="submit" className="bg-zinc-700 text-zinc-100 p-2 rounded">Legg til skuespiller</button>
          </form>
          <button onClick={() => window.history.back()} className="bg-zinc-700 text-zinc-100 p-2 rounded mt-4">Tilbake</button>
        </div>
        
        <div className="w-full flex flex-col">
          <h1 className="text-4xl font-bold mb-8">Liste over skuespillere</h1>
          <div className="flex flex-col gap-5 p-5 bg-zinc-900 rounded-xl">
            {error && <p>{error}</p>}
            <ul>
              {actors.map((actor) => (
                <div key={actor.id} className="p-5 border-2 border-zinc-800 rounded-lg mb-4">
                  <h2 className="text-2xl font-bold mb-2">{actor.name}</h2>
                  <p className='text-zinc-500'><strong>Fødselsår:</strong> {actor.birth_year}</p>
                  <p className='text-zinc-500'><strong>Filmografi:</strong> {actor.moviesdirected.join(', ')}</p>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}