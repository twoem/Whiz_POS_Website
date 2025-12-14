'use client';

import { useState, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Redirect based on role or to dashboard
        // Ideally the API returns the role, or we fetch /me after
        // For now, let's just go to windows page or dashboard if we had one
        const data = await res.json();
        if (data.role === 'admin') {
             router.push('/admin/dashboard');
        } else {
             router.push('/windows');
        }
      } else {
        const data = await res.json();
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <>
      <div className="pt-32 pb-20 max-w-md mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Login</h1>

        {registered && (
          <div className="mb-6 p-4 bg-emerald-900/20 border border-emerald-700/50 rounded-lg text-emerald-400 text-center">
            Registration successful! Please login.
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-xl border border-slate-700 space-y-6">
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" variant="primary" className="w-full">Login</Button>

          <p className="text-center text-sm text-gray-400 mt-4">
             Don't have an account? <a href="/request-access" className="text-sky-400 hover:underline">Request Access</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans">
      <Navbar />
      <Suspense fallback={<div className="pt-32 pb-20 text-center">Loading...</div>}>
         <LoginForm />
      </Suspense>
    </div>
  );
}
