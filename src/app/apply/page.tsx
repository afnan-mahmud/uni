"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, ChevronRight, User, BookOpen, Upload, CreditCard } from "lucide-react";

export default function ApplyPage() {
    const [step, setStep] = useState(1);
    
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 py-4 px-6 md:px-12 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">N</span>
                    </div>
                    <span className="font-bold text-xl text-slate-800">Northern University</span>
                </div>
                <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">
                    Already applied? Login
                </Link>
            </header>

            <main className="flex-1 flex justify-center py-12 px-4">
                <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden flex flex-col md:flex-row">
                    
                    {/* Sidebar / Steps */}
                    <div className="w-full md:w-1/3 bg-slate-900 text-white p-8">
                        <h2 className="text-2xl font-bold mb-8">Admission Application</h2>
                        
                        <div className="space-y-6">
                            <StepIndicator number={1} title="Personal Details" active={step === 1} completed={step > 1} icon={<User className="w-5 h-5" />} />
                            <StepIndicator number={2} title="Academic Record" active={step === 2} completed={step > 2} icon={<BookOpen className="w-5 h-5" />} />
                            <StepIndicator number={3} title="Documents" active={step === 3} completed={step > 3} icon={<Upload className="w-5 h-5" />} />
                            <StepIndicator number={4} title="Payment" active={step === 4} completed={step > 4} icon={<CreditCard className="w-5 h-5" />} />
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col">
                        <div className="flex-1">
                            {step === 1 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800">Personal Details</h3>
                                        <p className="text-slate-500 mt-1">Please provide your basic information.</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">First Name</label>
                                            <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition" placeholder="John" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Last Name</label>
                                            <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition" placeholder="Doe" />
                                        </div>
                                        <div className="col-span-2 space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Email Address</label>
                                            <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition" placeholder="john.doe@example.com" />
                                        </div>
                                        <div className="col-span-2 space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Phone Number</label>
                                            <input type="tel" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition" placeholder="+880 1..." />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800">Academic Record</h3>
                                        <p className="text-slate-500 mt-1">Enter your previous academic history.</p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Program Applied For</label>
                                            <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition">
                                                <option>BSc in Computer Science</option>
                                                <option>BBA</option>
                                                <option>BSc in Electrical Engineering</option>
                                            </select>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700">HSC / A-Level GPA</label>
                                                <input type="number" step="0.01" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition" placeholder="5.00" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700">Passing Year</label>
                                                <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition" placeholder="2025" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800">Documents Upload</h3>
                                        <p className="text-slate-500 mt-1">Upload required certificates and photos.</p>
                                    </div>
                                    <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition cursor-pointer">
                                        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                                            <Upload className="w-6 h-6" />
                                        </div>
                                        <p className="font-medium text-slate-700">Click to upload or drag and drop</p>
                                        <p className="text-sm text-slate-500 mt-1">SVG, PNG, JPG or PDF (max. 10MB)</p>
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800">Application Fee</h3>
                                        <p className="text-slate-500 mt-1">Pay the ৳1,000 application fee to complete.</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-slate-600">Application Fee</span>
                                            <span className="font-bold text-slate-800 text-lg">৳1,000</span>
                                        </div>
                                        <hr className="border-slate-200 mb-4" />
                                        <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-medium shadow-lg shadow-indigo-200 hover:shadow-xl transition">
                                            Pay with bKash / Card
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Controls */}
                        <div className="flex justify-between mt-12 pt-6 border-t border-slate-100">
                            <button 
                                onClick={() => setStep(Math.max(1, step - 1))}
                                className={`px-6 py-2.5 font-medium rounded-xl transition ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-600 hover:bg-slate-100'}`}
                            >
                                Back
                            </button>
                            <button 
                                onClick={() => setStep(Math.min(4, step + 1))}
                                className={`px-6 py-2.5 bg-slate-900 text-white font-medium rounded-xl flex items-center gap-2 hover:bg-slate-800 transition ${step === 4 ? 'hidden' : ''}`}
                            >
                                Continue <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function StepIndicator({ number, title, active, completed, icon }: any) {
    return (
        <div className="flex items-start gap-4">
            <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors duration-300
                ${completed ? 'bg-emerald-500 border-emerald-500 text-white' : 
                  active ? 'bg-indigo-600 border-indigo-600 text-white' : 
                  'border-slate-700 text-slate-500'}`}
            >
                {completed ? <CheckCircle className="w-5 h-5" /> : number}
            </div>
            <div className="flex flex-col justify-center h-10">
                <span className={`text-sm font-semibold transition-colors duration-300 ${active || completed ? 'text-white' : 'text-slate-500'}`}>
                    {title}
                </span>
            </div>
        </div>
    );
}
