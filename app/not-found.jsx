import Link from "next/link";
export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-5 text-center">
      <div>
        <p className="font-serif text-6xl font-extrabold text-gold">404</p>
        <h1 className="mt-2 font-serif text-3xl font-extrabold text-navy">We could not find that page</h1>
        <p className="mx-auto mt-3 max-w-md text-mute">The site may have been removed or the address is wrong.</p>
        <div className="mt-6 flex justify-center gap-3"><Link className="btn btn-wa" href="/sites">See all sites</Link><Link className="btn btn-call text-navy" href="/">Home</Link></div>
      </div>
    </main>
  );
}
