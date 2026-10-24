
import { CalendarPlus, Settings } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <section className="mx-auto min-h-[70vh] max-w-6xl px-5 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">Management</p>
      <h1 className="mt-3 text-3xl font-bold text-white">Admin Dashboard</h1>
      <p className="mt-3 text-slate-400">Manage events and monitor bookings.</p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/3 p-7">
          <CalendarPlus size={30} className="text-violet-400" />
          <h2 className="mt-4 text-xl font-semibold text-white">Create Event</h2>
          <p className="mt-2 text-slate-400">The event creation form will connect to the event service.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/3 p-7">
          <Settings size={30} className="text-violet-400" />
          <h2 className="mt-4 text-xl font-semibold text-white">Manage Events</h2>
          <p className="mt-2 text-slate-400">Event management and booking statistics will appear here.</p>
        </div>
      </div>
    </section>
  );
}
