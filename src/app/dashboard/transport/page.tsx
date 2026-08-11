"use client";

import { mockTransport } from "@/lib/mockData";
import { Bus, MapPin, Users, Info, Settings } from "lucide-react";

export default function TransportDashboard() {
    return (
        <div className="min-h-screen bg-slate-50/50 p-6 space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 tracking-tight">
                        Transport Management
                    </h1>
                    <p className="text-slate-500 mt-2">Manage bus routes, drivers, and student subscriptions.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 hover:shadow-sm transition font-medium shadow-sm">
                    <Settings className="w-4 h-4" /> Manage Routes
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockTransport.map((route) => {
                    const utilization = Math.round((route.registered / route.capacity) * 100);
                    
                    return (
                        <div key={route.routeId} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400">
                                        <Bus className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                                            {route.name}
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider
                                                ${route.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 
                                                  route.status === 'Overloaded' ? 'bg-rose-50 text-rose-600' : 
                                                  'bg-slate-100 text-slate-500'}`}>
                                                {route.status}
                                            </span>
                                        </h3>
                                        <p className="text-sm text-slate-500 mt-1">Bus: <span className="font-medium text-slate-700">{route.busNumber}</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 mt-2 space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 flex items-center gap-2"><Users className="w-4 h-4" /> Utilization</span>
                                    <span className="font-bold text-slate-700">{route.registered} / {route.capacity} ({utilization}%)</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full ${utilization >= 100 ? 'bg-rose-500' : utilization > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                        style={{ width: `${Math.min(utilization, 100)}%` }}
                                    />
                                </div>
                                
                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                                    <div className="text-slate-500">
                                        Driver: <span className="font-medium text-slate-800">{route.driver}</span>
                                    </div>
                                    <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1 transition">
                                        <Info className="w-4 h-4" /> Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
