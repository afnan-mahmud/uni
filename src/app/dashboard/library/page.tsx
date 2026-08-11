"use client";

import { mockLibrary } from "@/lib/mockData";
import { BookMarked, Search, Plus, Filter, BookOpen } from "lucide-react";

export default function LibraryDashboard() {
    return (
        <div className="min-h-screen bg-slate-50/50 p-6 space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600 tracking-tight">
                        Library Catalog
                    </h1>
                    <p className="text-slate-500 mt-2">Manage books, inventory, and issuances.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl hover:shadow-lg hover:shadow-orange-200 transition font-medium">
                        <Plus className="w-4 h-4" /> Add Book
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div className="relative w-80">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search by title, author, or ID..." 
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition text-sm font-medium">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold bg-slate-50">
                                <th className="p-4 pl-6">Book Title</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Available Copies</th>
                                <th className="p-4 pr-6 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockLibrary.map(book => (
                                <tr key={book.id} className="hover:bg-slate-50/80 transition group">
                                    <td className="p-4 pl-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-14 bg-gradient-to-br from-orange-100 to-amber-100 rounded-md border border-orange-200 flex items-center justify-center text-orange-600 shadow-sm">
                                                <BookMarked className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800">{book.title}</h4>
                                                <p className="text-xs text-slate-500">{book.author} • {book.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                                            {book.category}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                                            ${book.status === 'Available' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                                            {book.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`font-bold ${book.copies > 0 ? 'text-slate-800' : 'text-rose-500'}`}>
                                            {book.copies}
                                        </span>
                                    </td>
                                    <td className="p-4 pr-6 text-right">
                                        <button className={`px-4 py-1.5 rounded-lg text-sm font-medium transition
                                            ${book.copies > 0 
                                                ? 'bg-orange-50 text-orange-700 hover:bg-orange-100' 
                                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                                            disabled={book.copies === 0}
                                        >
                                            Issue Book
                                        </button>
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
