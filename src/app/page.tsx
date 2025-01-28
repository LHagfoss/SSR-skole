import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-screen p-8 flex flex-col justify-center items-center relative inset-0">
      <div className="container flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold mb-8 text-center">Filmbibliotek</h1>
        <div className="flex flex-col gap-4">
          <Link href="/actors" className="bg-zinc-100 text-zinc-900 p-4 rounded-lg">Skuespillere</Link>
          <Link href="/movies" className="bg-zinc-100 text-zinc-900 p-4 rounded-lg">Filmer</Link>
        </div>
      </div>
      <footer className="w-full h-36 p-4 bg-zinc-800 flex flex-col justify-center items-center absolute bottom-0">
        <p>Made by <a href="https://github.com/lhagfoss" className="text-zinc-100">Lucas</a></p>
        <p>Les Readme fil for mer informasjon</p>
      </footer>
    </div>
  );
}