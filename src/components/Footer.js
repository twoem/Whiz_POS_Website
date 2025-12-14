import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-400 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Whiz POS</h3>
          <p className="text-sm">
            The complete Point of Sale solution for Cafés, Restaurants, and Retail.
          </p>
        </div>
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Phone: 0740 841 168</li>
            <li>Email: whiz.techke@gmail.com</li>
            <li>GitHub: mburuwhiz</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
             <li><Link href="/" className="hover:text-sky-400">Home</Link></li>
             <li><Link href="/windows" className="hover:text-sky-400">Windows POS</Link></li>
             <li><Link href="/mobile" className="hover:text-sky-400">Mobile App</Link></li>
             <li><Link href="/backoffice" className="hover:text-sky-400">Back Office</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-900 text-center text-sm">
        &copy; {new Date().getFullYear()} Whiz Tech. All rights reserved.
      </div>
    </footer>
  );
}
