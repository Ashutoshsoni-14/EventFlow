
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <h1 className="text-7xl font-bold text-violet-400">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-white">Page not found</h2>
      <p className="mt-3 text-slate-400">The page you're looking for doesn't exist.</p>

      <Link to="/" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-500">
        <ArrowLeft size={18} /> Back to Home
      </Link>
    </section>
  );
}
