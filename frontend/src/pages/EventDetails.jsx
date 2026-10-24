
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CalendarDays,
  MapPin,
  ArrowLeft,
  Clock,
  Ticket,
  RefreshCw,
} from 'lucide-react';
import api from '../services/api';

export default function EventDetails() {
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEvent = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await api.get(`/events/${eventId}`);

      // Support common API response formats.
      const data = response.data;
      const eventData = data.event ?? data.data ?? data;

      setEvent(eventData);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to load event details. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  const formatDate = (date) => {
    if (!date) return 'Date to be announced';

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return date;

    return parsedDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <section className="mx-auto min-h-[70vh] max-w-4xl px-5 py-16">
      <Link
        to="/events"
        className="inline-flex items-center gap-2 text-slate-400 transition hover:text-white"
      >
        <ArrowLeft size={18} />
        Back to events
      </Link>

      {loading ? (
        <div className="mt-8 animate-pulse rounded-2xl border border-white/10 bg-white/5 p-8">
          <div className="h-4 w-32 rounded bg-white/10" />
          <div className="mt-5 h-8 w-2/3 rounded bg-white/10" />
          <div className="mt-4 h-4 w-full rounded bg-white/10" />
          <div className="mt-3 h-4 w-3/4 rounded bg-white/10" />
        </div>
      ) : error ? (
        <div className="mt-8 rounded-2xl border border-red-400/20 bg-red-400/5 p-8">
          <h1 className="text-2xl font-bold text-white">
            Could not load event
          </h1>
          <p className="mt-3 text-red-300">{error}</p>

          <button
            onClick={fetchEvent}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-500"
          >
            <RefreshCw size={16} />
            Try again
          </button>
        </div>
      ) : !event || !(event._id || event.id || eventId) ? (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/3 p-8">
          <h1 className="text-2xl font-bold text-white">
            Event not found
          </h1>
          <p className="mt-3 text-slate-400">
            This event may no longer be available.
          </p>
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/3 p-8">
          <p className="text-sm font-semibold tracking-widest text-violet-400">
            EVENT DETAILS
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {event.title || 'Untitled event'}
          </h1>

          <p className="mt-4 leading-7 text-slate-400">
            {event.description || 'No description available for this event.'}
          </p>

          <div className="mt-8 space-y-4 border-t border-white/10 pt-6 text-slate-300">
            <p className="flex items-center gap-3">
              <CalendarDays size={20} className="shrink-0 text-violet-400" />
              <span>{formatDate(event.date)}</span>
            </p>

            <p className="flex items-center gap-3">
              <MapPin size={20} className="shrink-0 text-violet-400" />
              <span>
                {[event.venue, event.city].filter(Boolean).join(', ') ||
                  'Venue to be announced'}
              </span>
            </p>

            <p className="flex items-center gap-3">
              <Clock size={20} className="shrink-0 text-violet-400" />
              <span>{event.startTime || 'Time to be announced'}</span>
            </p>

            <p className="flex items-center gap-3">
              <Ticket size={20} className="shrink-0 text-violet-400" />
              <span>
                {event.totalSeats != null
                  ? `${event.totalSeats} total seats`
                  : 'Seat information available during selection'}
              </span>
            </p>
          </div>

          <Link
            to={`/seats/${event._id || event.id || eventId}`}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500"
          >
            Select Seats
            <Ticket size={18} />
          </Link>
        </div>
      )}
    </section>
  );
}
