"use client";

import { isAdminLike, isFaculty, isManagement } from "@/lib/demoAuth";
import { CURRENT_FACULTY } from "@/lib/demoData";

export default function AcademicResultGrading() {
  const isFacultyView = isFaculty() && !isAdminLike() && !isManagement();
  const F = CURRENT_FACULTY;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {isFacultyView ? "My Marks Entry" : "Result & Grading System"}
          </h2>
          <p className="text-slate-500">
            {isFacultyView
              ? "Enter and review marks for your assigned courses."
              : "Manage marks entry, grade calculation, and result publishing workflow."}
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <select className="pl-4 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none shadow-sm font-medium text-slate-700">
              <option>Fall 2026</option>
              <option>Spring 2026</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm">
            {isFacultyView ? "Submit Marks" : "Publish Results"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-500 mb-1">{isFacultyView ? "My Sections" : "Total Sections"}</p>
          <h3 className="text-3xl font-bold text-slate-800">{isFacultyView ? F.assignedCourses.length : 450}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-500 mb-1">Marks Submitted</p>
          <h3 className="text-3xl font-bold text-emerald-600">{isFacultyView ? "7" : "412"} <span className="text-sm font-medium text-slate-400">/ {isFacultyView ? "9" : "450"}</span></h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-500 mb-1">Pending HOD Approval</p>
          <h3 className="text-3xl font-bold text-amber-600">{isFacultyView ? "2" : "25"}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-500 mb-1">Pending Dean Approval</p>
          <h3 className="text-3xl font-bold text-rose-600">{isFacultyView ? "0" : "13"}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-semibold text-slate-800">{isFacultyView ? "My Section Grading Workflow" : "Section Grading Workflow"}</h3>
            <div className="relative">
              <input type="text" placeholder="Search course or faculty..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-64" />
              <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Course (Sec)</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Faculty</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Students</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg GPA</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isFacultyView ? (
                  <>
                    <tr className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">CSE301 (A)</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{F.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">38</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">3.45</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">Pending HOD</span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-indigo-600 hover:text-indigo-900 font-medium text-xs">Enter Marks</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">CSE401 (B)</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{F.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">35</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">-</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">Drafting</span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-indigo-600 hover:text-indigo-900 font-medium text-xs">Enter Marks</button>
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">CSE301 (A)</td>
                      <td className="px-6 py-4 text-sm text-slate-500">Dr. Kamal</td>
                      <td className="px-6 py-4 text-sm text-slate-500">40</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">3.45</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">Pending Dean</span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-indigo-600 hover:text-indigo-900 font-medium text-xs">Review</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">MTH201 (B)</td>
                      <td className="px-6 py-4 text-sm text-slate-500">Dr. Salim</td>
                      <td className="px-6 py-4 text-sm text-slate-500">35</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">2.80</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">Approved</span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-indigo-600 hover:text-indigo-900 font-medium text-xs">View Sheet</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">BBA101 (C)</td>
                      <td className="px-6 py-4 text-sm text-slate-500">Prof. Hasan</td>
                      <td className="px-6 py-4 text-sm text-slate-500">55</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">-</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">Drafting</span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-indigo-600 hover:text-indigo-900 font-medium text-xs">Remind</button>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Grading Scale (UGC Standard)</h3>
          <div className="space-y-3">
            {[
              { marks: "80% and above", grade: "A+", gpa: "4.00" },
              { marks: "75% to < 80%", grade: "A", gpa: "3.75" },
              { marks: "70% to < 75%", grade: "A-", gpa: "3.50" },
              { marks: "65% to < 70%", grade: "B+", gpa: "3.25" },
              { marks: "60% to < 65%", grade: "B", gpa: "3.00" },
              { marks: "55% to < 60%", grade: "B-", gpa: "2.75" },
              { marks: "50% to < 55%", grade: "C+", gpa: "2.50" },
              { marks: "45% to < 50%", grade: "C", gpa: "2.25" },
              { marks: "40% to < 45%", grade: "D", gpa: "2.00" },
              { marks: "Less than 40%", grade: "F", gpa: "0.00" },
            ].map((scale, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                <span className="text-slate-600 w-1/2">{scale.marks}</span>
                <span className={`font-bold w-1/4 text-center ${scale.grade === 'F' ? 'text-rose-500' : 'text-slate-800'}`}>{scale.grade}</span>
                <span className="font-mono text-slate-500 w-1/4 text-right">{scale.gpa}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
            Modify Scale
          </button>
        </div>
      </div>
    </div>
  );
}
