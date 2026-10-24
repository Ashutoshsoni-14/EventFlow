
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn, LoaderCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const message = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email.trim().toLowerCase(), password);

      const destination =
        location.state?.from?.pathname ||
        (user.role === 'ADMIN' ? '/admin' : '/events');

      navigate(destination, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        (err.request
          ? 'Cannot reach the server. Check that EventFlow backend services are running.'
          : 'Login failed. Please try again.')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#080b14] px-4 py-12 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/3 p-7 shadow-2xl sm:p-9">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-400">
            <LogIn size={27} />
          </div>
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to continue with EventFlow.
          </p>
        </div>

        {message && (
          <div className="mb-5 flex gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-300">
            <CheckCircle2 size={18} className="shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div role="alert" className="mb-5 flex gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-xl border border-white/10 bg-[#0c1020] px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-violet-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-xl border border-white/10 bg-[#0c1020] px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-violet-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 font-semibold transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <LoaderCircle size={18} className="animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-violet-400 hover:text-violet-300">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
