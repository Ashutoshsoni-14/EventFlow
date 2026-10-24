
import { Link } from 'react-router-dom';
import { CreditCard, ShieldCheck } from 'lucide-react';

export default function Checkout() {
  return (
    <section className="mx-auto min-h-[70vh] max-w-2xl px-5 py-16">
      <h1 className="text-3xl font-bold text-white">Checkout</h1>
      <p className="mt-3 text-slate-400">Review your booking before continuing.</p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/3 p-8">
        <CreditCard size={32} className="text-violet-400" />
        <h2 className="mt-4 text-xl font-semibold text-white">Booking summary</h2>
        <p className="mt-2 text-slate-400">Your selected event, seats, and total will appear here.</p>

        <div className="mt-6 flex items-center gap-2 text-sm text-emerald-400">
          <ShieldCheck size={18} /> Secure checkout
        </div>

        <button type="button" className="mt-7 w-full rounded-xl bg-violet-600 p-3 font-semibold text-white hover:bg-violet-500">
          Continue to Payment
        </button>

        <Link to="/events" className="mt-4 block text-center text-sm text-slate-400 hover:text-white">
          Cancel and return to events
        </Link>
      </div>
    </section>
  );
}
