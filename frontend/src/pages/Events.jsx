
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  MapPin,
  Clock,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import api from '../services/api';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await api.get('/events');

      // Support either an array or a wrapped API response.
      const data = response.data;
      const eventList = Array.isArray(data)
        ? data
        : data.events ?? data.data ?? [];

      if (!Array.isArray(eventList)) {
        throw new Error('Unexpected response from event service.');
      }

      setEvents(eventList);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Unable to load events. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const formatDate = (date) => {
    if (!date) return 'Date to be announced';

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <section className="mx-auto min-h-[70vh] max-w-7xl px-5 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
        Discover
      </p>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Explore Events
          </h1>
          <p className="mt-3 text-slate-400">
            Find your next unforgettable experience.
          </p>
        </div>

        <button
          onClick={fetchEvents}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 disabled:opacity-50"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-64 animate-pulse rounded-2xl border border-white/10 bg-white/5"
            />
          ))}
        </div>
      ) : error ? (
        <div className="mt-10 rounded-2xl border border-red-400/20 bg-red-400/5 p-8">
          <h2 className="text-xl font-semibold text-white">
            Could not load events
          </h2>
          <p className="mt-2 text-sm text-red-300">{error}</p>
          <button
            onClick={fetchEvents}
            className="mt-5 rounded-xl bg-violet-600 px-5 py-2 font-medium text-white hover:bg-violet-500"
          >
            Try again
          </button>
        </div>
      ) : events.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/3 p-10 text-center">
          <CalendarDays
            size={36}
            className="mx-auto text-violet-400"
          />
          <h2 className="mt-4 text-xl font-semibold text-white">
            No events available yet
          </h2>
          <p className="mt-2 text-slate-400">
            Check back later for upcoming events.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const eventId = event._id || event.id;

            return (
              <article
                key={eventId}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/3 p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/5"
              >
                <div className="flex items-center gap-2 text-sm text-violet-300">
                  <CalendarDays size={17} />
                  <span>{formatDate(event.date)}</span>
                </div>

                <h2 className="mt-5 text-xl font-bold text-white">
                  {event.title || 'Untitled event'}
                </h2>

                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-400">
                  {event.description || 'Discover more about this event.'}
                </p>

                <div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <MapPin
                      size={17}
                      className="shrink-0 text-violet-400"
                    />
                    <span>
                      {[event.venue, event.city]
                        .filter(Boolean)
                        .join(', ') || 'Venue to be announced'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock
                      size={17}
                      className="shrink-0 text-violet-400"
                    />
                    <span>{event.startTime || 'Time to be announced'}</span>
                  </div>
                </div>

                {eventId ? (
                  <Link
                    to={`/events/${eventId}`}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-500"
                  >
                    View Event
                    <ArrowRight size={17} />
                  </Link>
                ) : (
                  <p className="mt-6 text-sm text-slate-500">
                    Event details unavailable
                  </p>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
