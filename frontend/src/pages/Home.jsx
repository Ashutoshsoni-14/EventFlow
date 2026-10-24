
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Ticket, Music, Code, Palette } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080b14] text-white">
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-32">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            <CalendarDays size={16} />
            Your next great experience starts here
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Moments worth
            <span className="block text-violet-400">showing up for.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
            Discover exciting events, book your seats, and make memories
            with EventFlow — your events, all in one place.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold transition hover:bg-violet-500"
            >
              Explore Events <ArrowRight size={18} />
            </Link>

            <Link
              to="/register"
              className="rounded-xl border border-white/15 px-6 py-3 font-semibold transition hover:bg-white/5"
            >
              Create Account
            </Link>
          </div>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {[
            {
              title: 'Live Music',
              description: 'Experience the energy of live performances.',
              icon: Music,
              color: 'text-pink-400',
            },
            {
              title: 'Technology',
              description: 'Meet innovators and explore new ideas.',
              icon: Code,
              color: 'text-violet-400',
            },
            {
              title: 'Arts & Culture',
              description: 'Discover creativity, art, and culture.',
              icon: Palette,
              color: 'text-amber-400',
            },
          ].map((category) => {
            const Icon = category.icon;

            return (
              <Link
                to="/events"
                key={category.title}
                className="rounded-2xl border border-white/10 bg-white/3 p-7 transition hover:-translate-y-1 hover:border-violet-500/40"
              >
                <Icon size={30} className={category.color} />

                <h2 className="mt-5 text-xl font-semibold">
                  {category.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {category.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm text-violet-300">
                  Discover events <ArrowRight size={15} />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 flex items-center gap-3 text-sm text-slate-500">
          <Ticket size={18} />
          Simple booking. Memorable experiences.
        </div>
      </section>
    </div>
  );
}
