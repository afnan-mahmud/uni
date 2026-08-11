import React from 'react';

export default function Payroll() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Payroll Management</h2>
          <p className="text-slate-500">Manage staff salaries, bonuses, and tax deductions.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm">
            Run Payroll
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Payroll (Aug)</p>
          <h3 className="text-2xl font-bold text-slate-800">৳ 8,450,000</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-500 mb-1">Employees</p>
          <h3 className="text-2xl font-bold text-slate-800">142</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-500 mb-1">Taxes Withheld</p>
          <h3 className="text-2xl font-bold text-slate-800">৳ 450,000</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-500 mb-1">Next Pay Date</p>
          <h3 className="text-2xl font-bold text-slate-800">Aug 31</h3>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Employee Salary Roll</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Base Salary</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Net Pay</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Dr. Kamal Uddin', dept: 'Computer Science', base: 120000, net: 105000, status: 'Draft' },
                { name: 'Prof. Anisur Rahman', dept: 'Business Admin', base: 115000, net: 101000, status: 'Draft' },
                { name: 'Nabila Haque', dept: 'Electrical Eng.', base: 95000, net: 84000, status: 'Draft' },
                { name: 'Hasan Mahmud', dept: 'Civil Eng.', base: 90000, net: 80000, status: 'Draft' },
                { name: 'Salma Begum', dept: 'English', base: 85000, net: 76000, status: 'Draft' },
              ].map((emp, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">{emp.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{emp.dept}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">৳ {emp.base.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">৳ {emp.net.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
