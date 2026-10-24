
import { useParams, Link } from 'react-router-dom';

export default function SeatSelection() {
  const { eventId } = useParams();

  return (
    <section className="mx-auto min-h-[70vh] max-w-4xl px-5 py-16">
      <h1 className="text-3xl font-bold text-white">Select Your Seats</h1>
      <p className="mt-3 text-slate-400">Event ID: {eventId}</p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/3 p-8 text-center">
        <div className="mx-auto mb-6 max-w-sm rounded-lg border border-violet-400/40 py-3 text-sm tracking-[0.3em] text-violet-300">
          STAGE
        </div>
        <p className="text-slate-400">Seat availability will load from the seat service.</p>
        <Link to="/events" className="mt-6 inline-block rounded-xl border border-white/15 px-5 py-3 text-white hover:bg-white/5">
          Back to Events
        </Link>
      </div>
    </section>
  );
}
