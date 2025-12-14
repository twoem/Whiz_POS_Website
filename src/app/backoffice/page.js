'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Image from 'next/image';
import { Cloud, Lock, BarChart, Users, Package } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BackOfficePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await fetch('/api/user/me');
          if (res.ok) {
            const data = await res.json();
            setUser(data.user);
          }
        } catch (error) { console.log(error); }
      };
      fetchUser();
    }, []);

  const backOfficeLink = user?.backOfficeLink || '#';

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Cloud Back Office</h1>
          <p className="text-xl text-gray-400">Manage Your Business from Anywhere.</p>
        </div>
      </section>

      {/* Access Section */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">
               <Cloud className="mx-auto h-16 w-16 text-purple-400 mb-6" />
               <h2 className="text-2xl font-bold text-white mb-4">Access Dashboard</h2>
               <p className="text-gray-400 mb-8">Requires an active internet connection.</p>

               {user && user.status === 'approved' && user.backOfficeLink ? (
                  <div>
                      <Button href={user.backOfficeLink} variant="primary" target="_blank">Login to Dashboard</Button>
                      <p className="mt-4 text-sm text-gray-400">
                          Username: <span className="text-white font-mono">{user.backOfficeUsername}</span>
                      </p>
                  </div>
               ) : (
                  <div>
                     <Button href={backOfficeLink === '#' ? '/login' : backOfficeLink} variant="primary" disabled={backOfficeLink === '#'}>
                        Login to Dashboard
                     </Button>
                     {backOfficeLink === '#' && (
                         <p className="text-xs text-gray-500 mt-4">You must be a verified user to access your dashboard link.</p>
                     )}
                  </div>
               )}
            </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               <div className="text-center">
                   <BarChart className="mx-auto h-12 w-12 text-sky-400 mb-4" />
                   <h3 className="text-xl font-bold text-white mb-2">Global Analytics</h3>
                   <p className="text-gray-400">View combined sales from multiple terminals or branches.</p>
               </div>
               <div className="text-center">
                   <Users className="mx-auto h-12 w-12 text-emerald-300 mb-4" />
                   <h3 className="text-xl font-bold text-white mb-2">Staff Management</h3>
                   <p className="text-gray-400">Manage salaries, roles, and performance.</p>
               </div>
               <div className="text-center">
                   <Package className="mx-auto h-12 w-12 text-purple-400 mb-4" />
                   <h3 className="text-xl font-bold text-white mb-2">Advanced Inventory</h3>
                   <p className="text-gray-400">Bulk upload products, manage suppliers.</p>
               </div>
           </div>
        </div>
      </section>

      {/* Screenshot Gallery */}
       <section className="py-20 bg-slate-950">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Interface Preview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                 { title: 'Analytics', img: '/assets/back_office_sales_view.jpg' },
                 { title: 'Employee Management', img: '/assets/user_management_back_office.jpg' },
                 { title: 'Inventory List', img: '/assets/back_office_inventory_page.jpg' },
               ].map((feature, idx) => (
                 <div key={idx} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                    <div className="h-48 relative bg-slate-950">
                       <Image src={feature.img} alt={feature.title} fill className="object-cover" />
                    </div>
                    <div className="p-4 text-center">
                       <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}
