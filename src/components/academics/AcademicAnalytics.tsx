"use client";

import { isAdminLike, isFaculty, isManagement } from "@/lib/demoAuth";
import { CURRENT_FACULTY } from "@/lib/demoData";

export default function AcademicAnalytics() {
  const isFacultyView = isFaculty() && !isAdminLike() && !isManagement();
  const F = CURRENT_FACULTY;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {isFacultyView ? "My Faculty Analytics" : "Academic Analytics & Insights"}
          </h2>
          <p className="text-slate-500">
            {isFacultyView
              ? "Performance insights for your assigned courses and advisees."
              : "University-wide performance, failure rates, and academic trends."}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            Term: Fall 2026
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm">
            Download Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {isFacultyView ? (
          <>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-sm font-medium text-slate-500 mb-1">My Sections</p>
              <h3 className="text-3xl font-bold text-emerald-600">{F.assignedCourses.length}</h3>
              <p className="text-xs text-slate-400 font-medium mt-2">Current semester</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-sm font-medium text-slate-500 mb-1">Total Students Taught</p>
              <h3 className="text-3xl font-bold text-indigo-600">{F.assignedCourses.reduce((sum, c) => sum + c.enrolled, 0)}</h3>
              <p className="text-xs text-slate-400 font-medium mt-2">Across all sections</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-sm font-medium text-slate-500 mb-1">Avg Class Performance</p>
              <h3 className="text-3xl font-bold text-amber-600">76%</h3>
              <p className="text-xs text-slate-400 font-medium mt-2">Class average</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-sm font-medium text-slate-500 mb-1">Advisees</p>
              <h3 className="text-3xl font-bold text-rose-600">{F.advisees.length}</h3>
              <p className="text-xs text-slate-400 font-medium mt-2">Assigned advisees</p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-sm font-medium text-slate-500 mb-1">Overall Pass Rate</p>
              <h3 className="text-3xl font-bold text-emerald-600">89.4%</h3>
              <p className="text-xs text-slate-400 font-medium mt-2">↑ 2.1% from last term</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-sm font-medium text-slate-500 mb-1">University Avg CGPA</p>
              <h3 className="text-3xl font-bold text-indigo-600">3.18</h3>
              <p className="text-xs text-slate-400 font-medium mt-2">Target: 3.20</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-sm font-medium text-slate-500 mb-1">Students on Probation</p>
              <h3 className="text-3xl font-bold text-rose-600">214</h3>
              <p className="text-xs text-slate-400 font-medium mt-2">1.7% of total enrolled</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-sm font-medium text-slate-500 mb-1">Dean&apos;s List Awardees</p>
              <h3 className="text-3xl font-bold text-amber-500">1,450</h3>
              <p className="text-xs text-slate-400 font-medium mt-2">Top 10% bracket</p>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isFacultyView ? (
          <>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-6">My Course Performance</h3>
              <div className="space-y-4">
                {F.assignedCourses.map((course, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">{course.code} - {course.name} ({course.section})</span>
                      <span className="text-slate-500">Avg: {78 + idx * 3}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${78 + idx * 3}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-6">My Advisee Standing</h3>
              <div className="space-y-4">
                {F.advisees.map((advisee, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">{advisee.name} - {advisee.studentId}</span>
                      <span className="text-slate-500">CGPA: {(3.2 + idx * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className={`h-2 rounded-full ${idx % 2 === 0 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${Math.min(95, 75 + idx * 5)}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-6">Avg CGPA by Faculty</h3>
              <div className="space-y-4">
                {[
                  { name: "Faculty of Engineering", cgpa: 3.42, width: "85%", color: "bg-indigo-500" },
                  { name: "Faculty of Business", cgpa: 3.15, width: "75%", color: "bg-emerald-500" },
                  { name: "Faculty of Arts", cgpa: 3.30, width: "80%", color: "bg-amber-500" },
                  { name: "Faculty of Law", cgpa: 2.95, width: "65%", color: "bg-rose-500" },
                  { name: "Faculty of Pharmacy", cgpa: 3.50, width: "90%", color: "bg-cyan-500" },
                ].map((faculty, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">{faculty.name}</span>
                      <span className="text-slate-600 font-bold">{faculty.cgpa}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className={`${faculty.color} h-2 rounded-full`} style={{ width: faculty.width }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
              <h3 className="font-semibold text-slate-800 mb-4">At-Risk Courses (Highest Failure Rates)</h3>
              <p className="text-sm text-slate-500 mb-4">Courses with &gt; 15% drop/fail rate require intervention.</p>
              <div className="flex-grow overflow-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Course</th>
                      <th className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase text-center">Enrolled</th>
                      <th className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase text-center">F/Drop Rate</th>
                      <th className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-slate-800">MTH201 (Calculus II)</td>
                      <td className="px-4 py-3 text-sm text-slate-500 text-center">450</td>
                      <td className="px-4 py-3 text-sm font-bold text-rose-600 text-center">24%</td>
                      <td className="px-4 py-3 text-sm text-right"><span className="px-2 py-1 bg-rose-100 text-rose-700 rounded text-xs">Critical</span></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-slate-800">CSE301 (Algorithms)</td>
                      <td className="px-4 py-3 text-sm text-slate-500 text-center">320</td>
                      <td className="px-4 py-3 text-sm font-bold text-amber-600 text-center">18%</td>
                      <td className="px-4 py-3 text-sm text-right"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">Warning</span></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-slate-800">PHY102 (Physics II)</td>
                      <td className="px-4 py-3 text-sm text-slate-500 text-center">500</td>
                      <td className="px-4 py-3 text-sm font-bold text-amber-600 text-center">16%</td>
                      <td className="px-4 py-3 text-sm text-right"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">Warning</span></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-slate-800">ENG101 (English)</td>
                      <td className="px-4 py-3 text-sm text-slate-500 text-center">800</td>
                      <td className="px-4 py-3 text-sm font-bold text-emerald-600 text-center">2%</td>
                      <td className="px-4 py-3 text-sm text-right"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">Healthy</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
