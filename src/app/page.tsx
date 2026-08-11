import Link from "next/link";
import { ArrowRight, BookOpen, Users, GraduationCap, Building, ShieldCheck, Globe, Zap, BarChart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">University ERP</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition">Features</a>
            <a href="#modules" className="hover:text-indigo-600 transition">Modules</a>
            <a href="#testimonials" className="hover:text-indigo-600 transition">Success Stories</a>
          </div>
          <div className="flex gap-3">
            <Link
              href="/login"
              className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 text-sm font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition hidden sm:block"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-100 to-white rounded-full blur-3xl opacity-50 -z-10"></div>
        <div className="absolute top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
            Introducing ERP 2.0 - The Future of Education Management
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            One Platform for Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Entire University</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Streamline admissions, academics, human resources, and finances in a single, unified enterprise system designed for modern educational institutions.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link
              href="/register"
              className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
            >
              Live Demo
            </Link>
          </div>
        </div>

        {/* Dashboard Preview Image */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="rounded-2xl border border-slate-200/60 bg-white/50 backdrop-blur-sm p-2 sm:p-4 shadow-2xl shadow-indigo-100/50">
            <div className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50 aspect-[16/9] flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50"></div>
              {/* Abstract Representation of UI */}
              <div className="w-full h-full relative p-8">
                 <div className="w-64 h-full bg-white rounded-lg shadow-sm border border-slate-200 absolute left-8 top-8 bottom-8 p-4">
                    <div className="w-32 h-6 bg-slate-100 rounded mb-8"></div>
                    <div className="space-y-3">
                      {[1,2,3,4,5,6].map(i => <div key={i} className="w-full h-8 bg-slate-50 rounded"></div>)}
                    </div>
                 </div>
                 <div className="absolute left-80 right-8 top-8 bottom-8 flex flex-col gap-6">
                    <div className="h-16 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center px-6">
                      <div className="w-48 h-6 bg-slate-100 rounded"></div>
                      <div className="ml-auto w-10 h-10 bg-indigo-100 rounded-full"></div>
                    </div>
                    <div className="flex gap-6 h-32">
                      {[1,2,3,4].map(i => <div key={i} className="flex-1 bg-white rounded-lg shadow-sm border border-slate-200 p-4"><div className="w-10 h-10 bg-indigo-50 rounded-lg mb-3"></div><div className="w-20 h-4 bg-slate-100 rounded mb-2"></div><div className="w-12 h-6 bg-slate-200 rounded"></div></div>)}
                    </div>
                    <div className="flex-1 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center">
                       <BarChart className="w-32 h-32 text-slate-100" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Stats Section */}
      <section className="border-y border-slate-100 bg-slate-50/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-200">
            <div>
              <p className="text-4xl font-extrabold text-indigo-600 mb-2">50+</p>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Universities</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-indigo-600 mb-2">2M+</p>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Active Students</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-indigo-600 mb-2">99.9%</p>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Uptime</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-indigo-600 mb-2">24/7</p>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3">Core Modules</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to run your institution</h3>
            <p className="text-lg text-slate-600">A comprehensive suite of interconnected modules that eliminate data silos and automate administrative workflows.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Academic Management",
                description: "Courses, curriculum, registration, routines, and faculty management in one place.",
                icon: BookOpen,
                color: "bg-blue-50 text-blue-600 border-blue-100"
              },
              {
                title: "Student Lifecycle",
                description: "From admission to graduation — track every student's complete journey.",
                icon: GraduationCap,
                color: "bg-indigo-50 text-indigo-600 border-indigo-100"
              },
              {
                title: "Finance & Administration",
                description: "Fees, payments, payroll, HR, and administrative workflows automated end-to-end.",
                icon: Building,
                color: "bg-emerald-50 text-emerald-600 border-emerald-100"
              },
              {
                title: "Role-Based Access",
                description: "Secure, granular access control for Admins, Teachers, Students, and Parents.",
                icon: ShieldCheck,
                color: "bg-rose-50 text-rose-600 border-rose-100"
              },
              {
                title: "Global Accessibility",
                description: "Cloud-native platform accessible anywhere, anytime, on any device.",
                icon: Globe,
                color: "bg-cyan-50 text-cyan-600 border-cyan-100"
              },
              {
                title: "Real-time Analytics",
                description: "Actionable insights and comprehensive dashboards for data-driven decisions.",
                icon: Zap,
                color: "bg-amber-50 text-amber-600 border-amber-100"
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-slate-200 hover:-translate-y-1 transition-all group"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center border mb-6 ${feature.color} group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-slate-800 pb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">U</span>
                </div>
                <span className="text-xl font-bold text-white">University ERP</span>
              </div>
              <p className="text-slate-400 max-w-sm">The most comprehensive, modern, and reliable enterprise resource planning system for higher education.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Modules</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-slate-500 border-t border-slate-800 pt-8 mt-4 gap-4">
            <div className="flex flex-col space-y-1">
              <p>© {new Date().getFullYear()} University ERP. All rights reserved.</p>
              <p>
                Developed by <a href="https://www.cholobohudur.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 font-semibold transition">Cholo Bohudur</a>.
              </p>
              <p className="text-xs text-slate-600 max-w-lg mt-1 leading-relaxed">
                A proud initiative of <span className="text-slate-400 font-medium">Launchpad</span> — Specializing in AI System Development and Enterprise Custom Software Solutions.
              </p>
            </div>
            <p className="whitespace-nowrap">Made with ❤️ for Education</p>
          </div>
        </div>
      </footer>
    </div>
  );
}