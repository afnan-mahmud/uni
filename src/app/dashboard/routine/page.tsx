"use client";

import { mockRoutine } from "@/lib/mockData";
import { Calendar as CalendarIcon, Clock, MapPin, Printer } from "lucide-react";

export default function RoutinePage() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    
    return (
        <div className="min-h-screen bg-slate-50/50 p-6 space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 tracking-tight">
                        Class Routine
                    </h1>
                    <p className="text-slate-500 mt-2">Weekly academic schedule for Computer Science (5th Semester).</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 hover:shadow-sm transition font-medium shadow-sm">
                    <Printer className="w-4 h-4" /> Print Routine
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50">
                                <th className="p-4 w-48 border-r border-slate-100">
                                    <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm">
                                        <Clock className="w-4 h-4" /> Time
                                    </div>
                                </th>
                                {days.map(day => (
                                    <th key={day} className="p-4 text-center border-r border-slate-100 last:border-0">
                                        <div className="font-bold text-slate-700 capitalize">{day}</div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockRoutine.map((slot, idx) => (
                                <tr key={idx} className="group">
                                    <td className="p-4 border-r border-slate-100 bg-slate-50/30 font-medium text-slate-600 text-sm whitespace-nowrap">
                                        {slot.time}
                                    </td>
                                    {days.map(day => {
                                        const cellContent = slot[day as keyof typeof slot];
                                        const isBreak = cellContent.includes('Break') || cellContent.includes('Prayer');
                                        const isOff = cellContent === 'Off';
                                        
                                        return (
                                            <td key={day} className="p-3 border-r border-slate-100 last:border-0 align-top">
                                                {isOff ? (
                                                    <div className="h-full flex items-center justify-center text-slate-300 text-sm italic py-4">
                                                        -
                                                    </div>
                                                ) : isBreak ? (
                                                    <div className="bg-slate-100 text-slate-500 text-center py-2 rounded-lg text-sm font-medium border border-slate-200/50">
                                                        {cellContent}
                                                    </div>
                                                ) : (
                                                    <div className="bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100 hover:border-indigo-200 rounded-xl p-3 transition group-hover:shadow-sm cursor-pointer">
                                                        <div className="font-bold text-indigo-700 text-sm mb-1">
                                                            {cellContent.split('(')[0].trim()}
                                                        </div>
                                                        <div className="flex items-center gap-1 text-xs text-slate-500">
                                                            <MapPin className="w-3 h-3" />
                                                            {cellContent.match(/\((.*?)\)/)?.[1] || 'TBA'}
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
