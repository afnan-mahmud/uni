"use client";

import { useState } from "react";
import { CURRENT_STUDENT, mockStudents } from "@/lib/demoData";
import { getCurrentRole, isAdminLike, isManagement } from "@/lib/demoAuth";

export default function StudentMasterProfile() {
  const role = getCurrentRole();
  const isAdminView = isAdminLike() || isManagement();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");

  const defaultStudent = CURRENT_STUDENT;
  const [selectedStudent, setSelectedStudent] = useState(defaultStudent);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchError("");
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const found = mockStudents.find(
      (student) =>
        student.id.toLowerCase() === query ||
        student.name.toLowerCase().includes(query)
    );

    if (!found) {
      setSearchError("Student not found. Try STU2026001 or Afnan Mahmud.");
      return;
    }

    setSelectedStudent({
      ...defaultStudent,
      name: found.name,
      email: found.email,
      studentId: found.id,
      program: found.department,
      semester: found.semester,
      status: found.status,
      // Keep the rest (CGPA, attendance, etc.) as demo fallback data.
    });
  }

  function handleClear() {
    setSearchQuery("");
    setSearchError("");
    setSelectedStudent(defaultStudent);
  }

  const s = selectedStudent;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {role === "student" ? "My Master Profile" : "Student Master Profile"}
          </h2>
          <p className="text-slate-500">
            {role === "student"
              ? "Your comprehensive 360-degree academic record."
              : "Comprehensive 360-degree view of student records."}
          </p>
        </div>

        {isAdminView && (
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by student ID or name..."
                className="w-64 md:w-80 pl-4 pr-10 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  ×
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition text-sm"
            >
              Search
            </button>
          </form>
        )}
      </div>

      {searchError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {searchError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-1 mb-4 shadow-lg shadow-indigo-500/30">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={s.avatar}
                alt={s.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-800">{s.name}</h3>
          <p className="text-sm font-medium text-indigo-600 mb-1">ID: {s.studentId}</p>
          <p className="text-xs text-slate-500 mb-4">{s.program}</p>

          <div className="w-full border-t border-slate-100 pt-4 mt-2">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-slate-500">Status</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-medium text-xs">{s.status}</span>
            </div>
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-slate-500">Current Semester</span>
              <span className="text-slate-800 font-medium">{s.semester} ({s.semesterLabel})</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Advisor</span>
              <span className="text-slate-800 font-medium hover:text-indigo-600 cursor-pointer">{s.advisor}</span>
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
              <h4 className="text-2xl font-bold text-slate-800">{s.cgpa.toFixed(2)}</h4>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Credits Completed</p>
              <h4 className="text-2xl font-bold text-slate-800">{s.creditsCompleted} <span className="text-sm font-medium text-slate-400">/ {s.creditsRequired}</span></h4>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Financial Dues</p>
              <h4 className="text-2xl font-bold text-slate-800">৳ {s.financialDue.toFixed(2)}</h4>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Attendance (Avg)</p>
              <h4 className="text-2xl font-bold text-slate-800">{s.attendanceAvg}%</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Academic History */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-semibold text-slate-800">Academic History</h3>
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
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">Summer 2026</td>
                  <td className="px-4 py-3 text-sm text-slate-500">15</td>
                  <td className="px-4 py-3 text-sm text-slate-500">15</td>
                  <td className="px-4 py-3 text-sm font-medium text-indigo-600">3.92</td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">{s.cgpa.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-medium text-xs">Dean&apos;s List</span></td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">Spring 2026</td>
                  <td className="px-4 py-3 text-sm text-slate-500">12</td>
                  <td className="px-4 py-3 text-sm text-slate-500">12</td>
                  <td className="px-4 py-3 text-sm font-medium text-indigo-600">3.75</td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">{(s.cgpa - 0.01).toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm"><span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-medium text-xs">Passed</span></td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">Fall 2025</td>
                  <td className="px-4 py-3 text-sm text-slate-500">15</td>
                  <td className="px-4 py-3 text-sm text-slate-500">15</td>
                  <td className="px-4 py-3 text-sm font-medium text-indigo-600">3.80</td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">{(s.cgpa - 0.03).toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm"><span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-medium text-xs">Passed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Personal Snapshot */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-semibold text-slate-800">Personal Snapshot</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase">Date of Birth</p>
                <p className="text-sm font-medium text-slate-800">{s.dob}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase">Blood Group</p>
                <p className="text-sm font-medium text-slate-800">{s.bloodGroup}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase">Nationality</p>
                <p className="text-sm font-medium text-slate-800">{s.nationality}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase">NID</p>
                <p className="text-sm font-medium text-slate-800">{s.nid}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase">Phone</p>
                <p className="text-sm font-medium text-slate-800">{s.phone}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase">Email</p>
                <p className="text-sm font-medium text-slate-800">{s.email}</p>
              </div>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <p className="text-xs font-medium text-slate-500 uppercase mb-1">Present Address</p>
              <p className="text-sm text-slate-800">{s.presentAddress}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase mb-1">Permanent Address</p>
              <p className="text-sm text-slate-800">{s.permanentAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
