
import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080b14]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <Ticket size={20} className="text-violet-400" />
          Event<span className="text-violet-400">Flow</span>
        </Link>
        <p className="text-sm text-slate-500">Discover events. Make memories.</p>
        <p className="text-xs text-slate-600">© {new Date().getFullYear()} EventFlow</p>
      </div>
    </footer>
  );
}
