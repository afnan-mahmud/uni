import React from 'react';

export default function StudentMasterProfile() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Student Master Profile</h2>
          <p className="text-slate-500">Comprehensive 360-degree view of student records.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <input type="text" placeholder="Search by ID or Name..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-64 shadow-sm" />
            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm">
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-1 mb-4 shadow-lg shadow-indigo-500/30">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Afnan+Mahmud&background=random&size=128" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-800">Afnan Mahmud</h3>
          <p className="text-sm font-medium text-indigo-600 mb-1">ID: 191-15-12345</p>
          <p className="text-xs text-slate-500 mb-4">BSc in Computer Science & Engineering</p>
          
          <div className="w-full border-t border-slate-100 pt-4 mt-2">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-slate-500">Status</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-medium text-xs">Active</span>
            </div>
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-slate-500">Current Semester</span>
              <span className="text-slate-800 font-medium">Fall 2026 (8th)</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Advisor</span>
              <span className="text-slate-800 font-medium hover:text-indigo-600 cursor-pointer">Dr. Kamal Uddin</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">CGPA</p>
              <h4 className="text-2xl font-bold text-slate-800">3.85</h4>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Credits Completed</p>
              <h4 className="text-2xl font-bold text-slate-800">105 <span className="text-sm font-medium text-slate-400">/ 144</span></h4>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Financial Dues</p>
              <h4 className="text-2xl font-bold text-slate-800">৳ 0.00</h4>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Attendance (Avg)</p>
              <h4 className="text-2xl font-bold text-slate-800">92%</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="border-b border-slate-100 bg-slate-50/50 flex overflow-x-auto">
          <button className="px-6 py-4 text-sm font-semibold text-indigo-600 border-b-2 border-indigo-600 whitespace-nowrap">Academic History</button>
          <button className="px-6 py-4 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">Financial Ledger</button>
          <button className="px-6 py-4 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">Documents</button>
          <button className="px-6 py-4 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">Disciplinary</button>
        </div>
        <div className="p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Semester</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Credits Attempted</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Credits Earned</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">SGPA</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">CGPA</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50 transition">
                <td className="px-4 py-3 text-sm font-medium text-slate-800">Spring 2026</td>
                <td className="px-4 py-3 text-sm text-slate-500">15</td>
                <td className="px-4 py-3 text-sm text-slate-500">15</td>
                <td className="px-4 py-3 text-sm font-medium text-indigo-600">3.92</td>
                <td className="px-4 py-3 text-sm font-medium text-slate-800">3.85</td>
                <td className="px-4 py-3 text-sm"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-medium text-xs">Dean's List</span></td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition">
                <td className="px-4 py-3 text-sm font-medium text-slate-800">Fall 2025</td>
                <td className="px-4 py-3 text-sm text-slate-500">12</td>
                <td className="px-4 py-3 text-sm text-slate-500">12</td>
                <td className="px-4 py-3 text-sm font-medium text-indigo-600">3.75</td>
                <td className="px-4 py-3 text-sm font-medium text-slate-800">3.84</td>
                <td className="px-4 py-3 text-sm"><span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-medium text-xs">Passed</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
