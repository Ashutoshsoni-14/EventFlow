
import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';

export default function MyBookings() {
  return (
    <section className="mx-auto min-h-[70vh] max-w-5xl px-5 py-16">
      <h1 className="text-3xl font-bold text-white">My Bookings</h1>
      <p className="mt-3 text-slate-400">Manage your event reservations.</p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/3 p-10 text-center">
        <Ticket size={40} className="mx-auto text-violet-400" />
        <h2 className="mt-4 text-xl font-semibold text-white">No bookings to display yet</h2>
        <p className="mt-2 text-slate-400">Your confirmed and pending bookings will appear here.</p>
        <Link to="/events" className="mt-6 inline-block rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-500">
          Find Events
        </Link>
      </div>
    </section>
  );
}
