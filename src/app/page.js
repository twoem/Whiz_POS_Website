import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Image from 'next/image';
import { Monitor, Smartphone, Cloud } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-900/40 via-slate-900 to-slate-900 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Power Your Business with <span className="text-sky-400">Whiz POS</span>.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300 mb-10">
            The complete Point of Sale solution for Cafés, Restaurants, and Retail. Seamlessly sync between Desktop, Mobile, and Cloud.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/windows" variant="primary">Download for Windows</Button>
            <Button href="/mobile" variant="secondary">Get the Mobile App</Button>
          </div>

          <div className="mt-16 relative mx-auto max-w-5xl">
            {/* Placeholder for Mockup - using a div with gradient for now or actual image if available */}
             <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 shadow-2xl backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden bg-black">
                         {/* Replace with actual screenshot */}
                         <Image
                           src="/assets/main_pos_and_cart.jpg"
                           alt="Desktop POS"
                           fill
                           className="object-cover"
                         />
                    </div>
                    <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden flex justify-center items-center">
                         <div className="relative h-[90%] w-[50%] border-4 border-slate-700 rounded-3xl overflow-hidden bg-black">
                             <Image
                               src="/assets/Screenshot_20251214_194303_Whiz_Pos.jpg"
                               alt="Mobile POS"
                               fill
                               className="object-cover"
                             />
                         </div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-sky-900/30 rounded-full">
                  <Monitor className="h-10 w-10 text-sky-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Desktop Power</h3>
              <p className="text-gray-400">Robust offline-first point of sale for your main counter.</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-6">
                 <div className="p-4 bg-emerald-900/30 rounded-full">
                  <Smartphone className="h-10 w-10 text-emerald-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mobile Agility</h3>
              <p className="text-gray-400">Take orders tableside or on the go with our Android APK.</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-purple-900/30 rounded-full">
                  <Cloud className="h-10 w-10 text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Cloud Control</h3>
              <p className="text-gray-400">Manage inventory, reports, and staff from anywhere with the Back Office.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">A Fully Integrated Ecosystem</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Your data flows securely across your local network and the cloud. Desktop Server connects to Mobile Apps and syncs with the Cloud Back Office.
          </p>

          <div className="flex justify-center items-center space-x-4 md:space-x-12 text-slate-500">
             <div className="flex flex-col items-center">
                <Monitor size={64} className="text-sky-400 mb-2"/>
                <span className="text-white font-medium">Desktop Server</span>
             </div>
             <div className="h-1 w-12 md:w-32 bg-gradient-to-r from-sky-400 to-emerald-300"></div>
              <div className="flex flex-col items-center">
                <Smartphone size={64} className="text-emerald-300 mb-2"/>
                <span className="text-white font-medium">Mobile App</span>
             </div>
             <div className="h-1 w-12 md:w-32 bg-gradient-to-r from-emerald-300 to-purple-400"></div>
             <div className="flex flex-col items-center">
                <Cloud size={64} className="text-purple-400 mb-2"/>
                <span className="text-white font-medium">Cloud Back Office</span>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
