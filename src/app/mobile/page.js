'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Image from 'next/image';
import { Download, Smartphone, QrCode, Wifi } from 'lucide-react';

export default function MobilePage() {
  const downloadLink = process.env.NEXT_PUBLIC_DOWNLOAD_LINK_APK || '#';

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Whiz POS Mobile (Cashier App)</h1>
          <p className="text-xl text-gray-400">Efficiency on the Go.</p>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">
              <Smartphone className="mx-auto h-16 w-16 text-emerald-300 mb-6" />
              <h2 className="text-2xl font-bold text-white mb-6">Download for Android</h2>
              <Button href={downloadLink} variant="secondary" className="w-full sm:w-auto">
                <Download className="mr-2 h-5 w-5" /> Download Android APK - v5.2.0
              </Button>
              <p className="text-xs text-gray-500 mt-4">Requirements: Android 8.0+, Camera permission (for QR scanning).</p>
           </div>
        </div>
      </section>

      {/* Connection Guide */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-white mb-12 text-center">How to Connect</h2>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
                 <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 text-sky-400 font-bold text-xl">1</div>
                 <Wifi className="mx-auto h-10 w-10 text-gray-400 mb-4" />
                 <h3 className="text-lg font-bold text-white mb-2">Connect WiFi</h3>
                 <p className="text-gray-400 text-sm">Ensure your phone is on the same WiFi network as the Windows POS.</p>
              </div>
               <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
                 <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 text-sky-400 font-bold text-xl">2</div>
                 <MonitorIcon className="mx-auto h-10 w-10 text-gray-400 mb-4" />
                 <h3 className="text-lg font-bold text-white mb-2">Find QR Code</h3>
                 <p className="text-gray-400 text-sm">Open Whiz POS Desktop -&gt; Settings -&gt; Mobile Sync to view the QR Code.</p>
              </div>
               <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
                 <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 text-sky-400 font-bold text-xl">3</div>
                 <QrCode className="mx-auto h-10 w-10 text-gray-400 mb-4" />
                 <h3 className="text-lg font-bold text-white mb-2">Scan & Sync</h3>
                 <p className="text-gray-400 text-sm">Open the Mobile App and scan the QR Code to connect instantly.</p>
              </div>
           </div>

           <div className="mt-16 bg-slate-950 p-8 rounded-xl flex justify-center items-center">
              {/* Visual showing phone scanning computer */}
               <div className="relative w-full max-w-lg h-64 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800">
                  <span className="text-gray-600">Visual: Phone scanning Desktop QR (Placeholder)</span>
               </div>
           </div>
        </div>
      </section>

      {/* Features Screenshots */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-white mb-12 text-center">Mobile Features</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Login Screen', img: '/assets/Screenshot_20251214_194245_Whiz_Pos.jpg' },
                { title: 'Product Grid', img: '/assets/Screenshot_20251214_194303_Whiz_Pos.jpg' },
                { title: 'Checkout', img: '/assets/Screenshot_20251214_194326_Whiz_Pos.jpg' }
              ].map((item, idx) => (
                 <div key={idx} className="group relative aspect-[9/16] overflow-hidden rounded-xl border border-slate-800">
                    <Image src={item.img} alt={item.title} fill className="object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                       <span className="text-white font-bold">{item.title}</span>
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

function MonitorIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  )
}
