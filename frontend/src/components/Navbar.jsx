
import { Link, NavLink } from 'react-router-dom';
import { Ticket, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `transition-colors hover:text-violet-300 ${
      isActive ? 'text-violet-300' : 'text-slate-300'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080b14]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <span className="rounded-xl bg-violet-600 p-2">
            <Ticket size={21} />
          </span>
          Event<span className="text-violet-400">Flow</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={navClass}>Home</NavLink>
          <NavLink to="/events" className={navClass}>Explore Events</NavLink>
          <NavLink to="/my-bookings" className={navClass}>My Bookings</NavLink>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login" className="rounded-xl px-4 py-2 text-sm text-slate-200 hover:bg-white/5">
            Log in
          </Link>
          <Link to="/register" className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold hover:bg-violet-500">
            Get Started
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-slate-200 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="flex flex-col gap-4 border-t border-white/10 px-5 py-5 md:hidden">
          <Link onClick={() => setOpen(false)} to="/">Home</Link>
          <Link onClick={() => setOpen(false)} to="/events">Explore Events</Link>
          <Link onClick={() => setOpen(false)} to="/my-bookings">My Bookings</Link>
          <Link onClick={() => setOpen(false)} to="/login">Log in</Link>
          <Link onClick={() => setOpen(false)} to="/register">Get Started</Link>
        </div>
      )}
    </header>
  );
}
