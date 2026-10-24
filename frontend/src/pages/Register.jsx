
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, LoaderCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await register(
        form.name.trim(),
        form.email.trim().toLowerCase(),
        form.password
      );

      setSuccess('Account created successfully! Redirecting to login...');

      setTimeout(() => {
        navigate('/login', {
          state: { message: 'Registration successful. Please log in.' },
        });
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Registration failed. Please try again.'
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
            <UserPlus size={27} />
          </div>
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="mt-2 text-sm text-slate-400">
            Join EventFlow and discover your next experience.
          </p>
        </div>

        {error && (
          <div role="alert" className="mb-5 flex gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div role="status" className="mb-5 flex gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-300">
            <CheckCircle2 size={18} className="shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
              maxLength={100}
              disabled={loading}
              className="w-full rounded-xl border border-white/10 bg-[#0c1020] px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-violet-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
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
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 6 characters"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              disabled={loading}
              className="w-full rounded-xl border border-white/10 bg-[#0c1020] px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-violet-500"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-300">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Enter your password again"
              value={form.confirmPassword}
              onChange={handleChange}
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
                Creating account...
              </>
            ) : (
              'Create account'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-violet-400 hover:text-violet-300">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
