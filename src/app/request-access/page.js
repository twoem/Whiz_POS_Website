'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

export default function RequestAccessPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    contactPerson: '',
    phone: '',
    natureOfBusiness: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/login?registered=true');
      } else {
        const data = await res.json();
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to submit request');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans">
      <Navbar />
      <div className="pt-32 pb-20 max-w-md mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Request Windows POS Access</h1>
        <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-xl border border-slate-700 space-y-6">
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Company Email</label>
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

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Contact Person</label>
            <input
              type="text"
              name="contactPerson"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
              value={formData.contactPerson}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Nature of Business</label>
            <textarea
              name="natureOfBusiness"
              required
              rows="3"
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
              value={formData.natureOfBusiness}
              onChange={handleChange}
            ></textarea>
          </div>

          <Button type="submit" variant="primary" className="w-full">Submit Request</Button>
        </form>
      </div>
    </div>
  );
}
