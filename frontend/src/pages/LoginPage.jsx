import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/* Validation schema */
const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data) {
    setLoading(true);
    setServerError('');
    try {
      const res = await axios.post('/api/auth/login', data, { timeout: 10000 });
      // Example: store token & redirect. Backend should set httpOnly cookie ideally.
      const { accessToken } = res.data;
      localStorage.setItem('accessToken', accessToken);
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setServerError('Invalid email or password.');
      } else {
        setServerError('Network error. Try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-card-dark rounded-xl shadow-xl overflow-hidden grid grid-cols-2">
        {/* LEFT: Marketing */}
        <div className="p-10 border-r border-black/10 flex flex-col justify-center gap-6">
          {/* optional small top icon */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center">
              {/* place an SVG or icon here */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-black"><path d="M3 12h3l3 8 4-16 3 8h4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="text-sm text-muted">HabitFlow</div>
          </div>

          <h1 className="text-3xl font-semibold">Master your days, visualize your success.</h1>
          <p className="text-muted">A professional habit tracker built for consistency.</p>

          <div className="mt-6">
            <img src="/mnt/data/fe8aff67-f5b5-4142-8e2b-bd92c85ab795.png" alt="design preview" className="rounded-md opacity-60 max-h-40 object-cover"/>
          </div>
        </div>

        {/* RIGHT: Login form */}
        <div className="p-8 flex items-center justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-1">Sign In</h2>
            <p className="text-sm text-muted mb-6">Enter your account details</p>

            <label className="block text-xs mb-2">Email Address</label>
            <input
              type="email"
              {...register('email')}
              className={`w-full mb-3 px-3 py-2 rounded-md bg-[#111214] border border-black/20 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent`}
              placeholder="name@example.com"
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && <p className="text-xs text-red-400 mb-2">{errors.email.message}</p>}

            <label className="block text-xs mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                className={`w-full mb-3 px-3 py-2 rounded-md bg-[#111214] border border-black/20 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent`}
                placeholder="••••••••"
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-400 mb-2">{errors.password.message}</p>}

            <div className="flex items-center justify-between text-sm text-muted mb-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 accent-accent" />
                Remember me
              </label>
              <a href="#" className="text-accent hover:underline">Forgot password?</a>
            </div>

            {serverError && <div className="text-sm text-red-400 mb-3">{serverError}</div>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md font-semibold text-black ${loading ? 'bg-accent/60' : 'bg-accent hover:bg-accent-dark'}`}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <p className="text-xs text-muted mt-4 text-center">
              Don't have an account? <a href="/register" className="text-accent">Register</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
