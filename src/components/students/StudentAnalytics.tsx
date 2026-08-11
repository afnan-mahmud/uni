"use client";

import { isAdminLike, isFinance, isManagement } from "@/lib/demoAuth";
import { CURRENT_STUDENT } from "@/lib/demoData";

export default function StudentAnalytics() {
  const isAdminView = isAdminLike() || isFinance() || isManagement();
  const s = CURRENT_STUDENT;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {isAdminView ? "Student Analytics & Reports" : "My Academic Analytics"}
          </h2>
          <p className="text-slate-500">
            {isAdminView
              ? "Macro-level insights into enrollment, performance, and retention."
              : "Your personal academic performance and progress overview."}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            {isAdminView ? "Filter: Fall 2026" : "Term: Fall 2026"}
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm">
            {isAdminView ? "Export Dashboard" : "Download Report"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {isAdminView ? (
          <>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-indigo-500">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14v8H4a8 8 0 018-8zM20 14v8h-8v-8h8zM12 2a5 5 0 110 10 5 5 0 010-10z"/></svg>
              </div>
              <p className="text-sm font-medium text-slate-500 mb-1">Total Enrollment</p>
              <h3 className="text-3xl font-bold text-slate-800">12,450</h3>
              <p className="text-xs text-emerald-600 font-medium mt-2">↑ 4.2% from Spring 2026</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
              <p className="text-sm font-medium text-slate-500 mb-1">Average CGPA</p>
              <h3 className="text-3xl font-bold text-slate-800">3.12</h3>
              <p className="text-xs text-slate-400 font-medium mt-2">University Wide</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
              <p className="text-sm font-medium text-slate-500 mb-1">Retention Rate</p>
              <h3 className="text-3xl font-bold text-slate-800">92.4%</h3>
              <p className="text-xs text-emerald-600 font-medium mt-2">↑ 1.1% YOY</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
              <p className="text-sm font-medium text-slate-500 mb-1">Graduation Rate</p>
              <h3 className="text-3xl font-bold text-slate-800">88.5%</h3>
              <p className="text-xs text-slate-400 font-medium mt-2">Class of 2026</p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
              <p className="text-sm font-medium text-slate-500 mb-1">My CGPA</p>
              <h3 className="text-3xl font-bold text-slate-800">{s.cgpa.toFixed(2)}</h3>
              <p className="text-xs text-emerald-600 font-medium mt-2">Top 15% of class</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
              <p className="text-sm font-medium text-slate-500 mb-1">Credits Completed</p>
              <h3 className="text-3xl font-bold text-slate-800">{s.creditsCompleted}</h3>
              <p className="text-xs text-slate-400 font-medium mt-2">of {s.creditsRequired} required</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
              <p className="text-sm font-medium text-slate-500 mb-1">Attendance Avg</p>
              <h3 className="text-3xl font-bold text-slate-800">{s.attendanceAvg}%</h3>
              <p className="text-xs text-emerald-600 font-medium mt-2">Good standing</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
              <p className="text-sm font-medium text-slate-500 mb-1">Current Due</p>
              <h3 className="text-3xl font-bold text-slate-800">৳ {s.financialDue}</h3>
              <p className="text-xs text-emerald-600 font-medium mt-2">No outstanding dues</p>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isAdminView ? (
          <>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-6">Enrollment by Faculty</h3>
              <div className="space-y-4">
                {[
                  { name: "Engineering & IT", value: "4,200 (34%)", width: "34%", color: "bg-indigo-500" },
                  { name: "Business & Economics", value: "3,500 (28%)", width: "28%", color: "bg-emerald-500" },
                  { name: "Law & Human Rights", value: "2,100 (17%)", width: "17%", color: "bg-amber-500" },
                  { name: "Arts & Humanities", value: "1,800 (14%)", width: "14%", color: "bg-rose-500" },
                  { name: "Pharmacy & Health", value: "850 (7%)", width: "7%", color: "bg-cyan-500" },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">{item.name}</span>
                      <span className="text-slate-500">{item.value}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: item.width }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-6">CGPA Distribution</h3>
              <div className="h-48 flex items-end justify-between gap-2 px-2">
                {[
                  { label: "< 2.0", value: 5, color: "bg-rose-400" },
                  { label: "2.0-2.5", value: 15, color: "bg-amber-400" },
                  { label: "2.5-3.0", value: 30, color: "bg-emerald-400" },
                  { label: "3.0-3.5", value: 35, color: "bg-indigo-400" },
                  { label: "> 3.5", value: 15, color: "bg-purple-400" },
                ].map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1 group">
                    <div className={`w-full ${stat.color} rounded-t-md opacity-80 group-hover:opacity-100 transition-all`} style={{ height: `${stat.value}%` }}>
                      <div className="w-full text-center mt-[-24px] text-xs font-bold text-slate-600 opacity-0 group-hover:opacity-100">{stat.value}%</div>
                    </div>
                    <span className="text-xs font-medium text-slate-500 mt-2">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-6">My CGPA Trend</h3>
              <div className="space-y-4">
                {[
                  { label: "Summer 2026", value: "3.92", width: "98%", color: "bg-indigo-500" },
                  { label: "Spring 2026", value: "3.75", width: "94%", color: "bg-indigo-500" },
                  { label: "Fall 2025", value: "3.80", width: "95%", color: "bg-indigo-500" },
                  { label: "Summer 2025", value: "3.85", width: "96%", color: "bg-indigo-500" },
                  { label: "Spring 2025", value: "3.78", width: "95%", color: "bg-indigo-500" },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">{item.label}</span>
                      <span className="text-slate-500">{item.value}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: item.width }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-6">My Course Performance</h3>
              <div className="space-y-4">
                {[
                  { label: "CSE401 - Software Engineering", value: "A (85%)", width: "85%", color: "bg-emerald-500" },
                  { label: "CSE402 - Computer Networks", value: "A+ (91%)", width: "91%", color: "bg-emerald-500" },
                  { label: "CSE403 - Machine Learning", value: "A- (78%)", width: "78%", color: "bg-amber-500" },
                  { label: "CSE404 - Information Security", value: "A (82%)", width: "82%", color: "bg-emerald-500" },
                  { label: "CSE405 - Capstone Design", value: "A+ (88%)", width: "88%", color: "bg-emerald-500" },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">{item.label}</span>
                      <span className="text-slate-500">{item.value}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: item.width }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
