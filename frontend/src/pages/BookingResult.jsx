
import { useParams, Link } from 'react-router-dom';
import { Clock3, ArrowRight } from 'lucide-react';

export default function BookingResult() {
  const { bookingId } = useParams();

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-5 py-16">
      <div className="w-full rounded-2xl border border-white/10 bg-white/3 p-8 text-center">
        <Clock3 size={42} className="mx-auto text-amber-400" />
        <h1 className="mt-5 text-3xl font-bold text-white">Booking Status</h1>
        <p className="mt-3 text-slate-400">Payment and confirmation status will appear here.</p>
        <p className="mt-4 break-all text-sm text-slate-500">Booking ID: {bookingId}</p>

        <Link to="/my-bookings" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-500">
          My Bookings <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
