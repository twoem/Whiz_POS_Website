'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Image from 'next/image';
import { Download, CheckCircle, Lock } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function WindowsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Failed to fetch user', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const downloadLink = process.env.NEXT_PUBLIC_DOWNLOAD_LINK_WINDOWS || '#'; // Should be from user data or env

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Whiz POS for Windows</h1>
          <p className="text-xl text-gray-400">The Heart of Your Operations.</p>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">
             <h2 className="text-2xl font-bold text-white mb-6">Get the Desktop Application</h2>

             {loading ? (
               <p>Loading status...</p>
             ) : user ? (
                user.status === 'approved' ? (
                   <div>
                       <p className="text-emerald-400 mb-4 font-medium">Your account is verified.</p>
                       <Button href={downloadLink} variant="primary" className="w-full sm:w-auto">
                        <Download className="mr-2 h-5 w-5" /> Download Installer (.exe) - v5.2.0
                      </Button>
                      <p className="text-xs text-gray-500 mt-4">Windows 10/11, 4GB RAM recommended.</p>
                   </div>
                ) : user.status === 'pending' ? (
                   <div className="p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
                      <p className="text-yellow-500">Your request is pending verification by the admin.</p>
                   </div>
                ) : (
                    <div className="p-4 bg-red-900/20 border border-red-700/50 rounded-lg">
                      <p className="text-red-500">Your request was rejected. Please contact support.</p>
                   </div>
                )
             ) : (
               <div className="text-center">
                 <Lock className="mx-auto h-12 w-12 text-slate-600 mb-4" />
                 <p className="text-gray-400 mb-6">Access to the Windows installer is protected. Please request access or login.</p>
                 <div className="flex justify-center gap-4">
                    <Button href="/request-access" variant="primary">Request Access</Button>
                    <Button href="/login" variant="outline">Login</Button>
                 </div>
               </div>
             )}
          </div>

          <div className="mt-12 text-left">
            <h3 className="text-xl font-bold text-white mb-4">Installation Guide</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-400">
              <li>Download the installer (once verified).</li>
              <li>Run the setup file as Administrator.</li>
              <li>Follow the setup wizard to complete installation.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Features & Docs */}
      <section className="py-20 bg-slate-900">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                 { title: 'Dashboard', desc: 'Real-time sales tracking.', img: '/assets/main_pos_and_cart.jpg' },
                 { title: 'Point of Sale', desc: 'Fast checkout with Barcode scanning and Touch interface.', img: '/assets/desktop_checkout_modal.jpg' },
                 { title: 'Inventory Management', desc: 'Track stock levels, set low-stock alerts.', img: '/assets/back_office_inventory_page.jpg' }, // Using back office img as proxy if needed, or desktop setting
                 { title: 'Reports', desc: 'Generate Z-Reports, Monthly Profit/Loss statements.', img: '/assets/back_office_sales_view.jpg' },
                 { title: 'Settings', desc: 'Configure printers, tax rates, and user roles.', img: '/assets/desktop_login.jpg' },
               ].map((feature, idx) => (
                 <div key={idx} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                    <div className="h-48 relative bg-slate-950">
                       <Image src={feature.img} alt={feature.title} fill className="object-cover" />
                    </div>
                    <div className="p-6">
                       <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                       <p className="text-gray-400 text-sm">{feature.desc}</p>
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
