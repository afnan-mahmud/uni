"use client";

import { mockHostel } from "@/lib/mockData";
import { Home, Users, Search, Plus, UserPlus } from "lucide-react";

export default function HostelDashboard() {
    return (
        <div className="min-h-screen bg-slate-50/50 p-6 space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-cyan-600 tracking-tight">
                        Hostel Management
                    </h1>
                    <p className="text-slate-500 mt-2">Manage room allocations and availability.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-600 to-cyan-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-200 transition font-medium">
                    <UserPlus className="w-4 h-4" /> Allocate Room
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockHostel.map((room, idx) => {
                    const isFull = room.capacity === room.occupied;
                    const isEmpty = room.occupied === 0;
                    
                    return (
                        <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition group">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className={`p-3 rounded-xl ${room.type === 'Male' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
                                        <Home className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-lg">Room {room.roomNumber}</h3>
                                        <p className="text-xs text-slate-500">Block {room.block} • {room.type} Hostel</p>
                                    </div>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider
                                    ${isFull ? 'bg-rose-50 text-rose-600 border border-rose-100' : 
                                      isEmpty ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                                      'bg-sky-50 text-sky-600 border border-sky-100'}`}>
                                    {room.status}
                                </span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 flex items-center gap-1.5"><Users className="w-4 h-4" /> Capacity</span>
                                    <span className="font-bold text-slate-800">{room.occupied} / {room.capacity}</span>
                                </div>
                                
                                {/* Visualizer */}
                                <div className="flex gap-2">
                                    {Array.from({ length: room.capacity }).map((_, i) => (
                                        <div 
                                            key={i} 
                                            className={`h-2 flex-1 rounded-full transition-colors ${i < room.occupied ? (room.type === 'Male' ? 'bg-blue-500' : 'bg-pink-500') : 'bg-slate-100'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
