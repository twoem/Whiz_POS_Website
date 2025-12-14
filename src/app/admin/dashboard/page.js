'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import { Check, X } from 'lucide-react';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/requests');
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (userId, newStatus) => {
    // Prompt for back office details if approving
    let backOfficeLink = '';
    let backOfficeUsername = '';

    if (newStatus === 'approved') {
       backOfficeLink = prompt("Enter Back Office Link for this user:", "https://backoffice.whizpos.com");
       if (!backOfficeLink) return;
       backOfficeUsername = prompt("Enter Back Office Username / Business ID:", "BIZ-12345");
       if (!backOfficeUsername) return;
    }

    try {
      const res = await fetch('/api/admin/verify', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, status: newStatus, backOfficeLink, backOfficeUsername }),
      });

      if (res.ok) {
        fetchUsers(); // Refresh list
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans">
      <Navbar />
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-white">Admin Dashboard</h1>

        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
           <div className="px-6 py-4 border-b border-slate-700">
              <h2 className="text-lg font-medium text-white">Access Requests</h2>
           </div>

           {loading ? (
             <div className="p-6 text-gray-400">Loading requests...</div>
           ) : users.length === 0 ? (
             <div className="p-6 text-gray-400">No requests found.</div>
           ) : (
             <div className="overflow-x-auto">
               <table className="min-w-full divide-y divide-slate-700">
                 <thead className="bg-slate-900/50">
                   <tr>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Company / Contact</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contact Info</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Business Nature</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="bg-slate-800 divide-y divide-slate-700">
                   {users.map((user) => (
                     <tr key={user._id}>
                       <td className="px-6 py-4 whitespace-nowrap">
                         <div className="text-sm font-medium text-white">{user.contactPerson}</div>
                         <div className="text-sm text-gray-400">{user.email}</div>
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                         {user.phone}
                       </td>
                       <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">
                         {user.natureOfBusiness}
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap">
                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                           user.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                           user.status === 'rejected' ? 'bg-red-100 text-red-800' :
                           'bg-yellow-100 text-yellow-800'
                         }`}>
                           {user.status}
                         </span>
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                         {user.status === 'pending' && (
                           <div className="flex justify-end space-x-2">
                             <button
                               onClick={() => handleVerify(user._id, 'approved')}
                               className="text-emerald-400 hover:text-emerald-300 p-1 bg-emerald-400/10 rounded"
                             >
                               <Check size={18} />
                             </button>
                             <button
                               onClick={() => handleVerify(user._id, 'rejected')}
                               className="text-red-400 hover:text-red-300 p-1 bg-red-400/10 rounded"
                             >
                               <X size={18} />
                             </button>
                           </div>
                         )}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
