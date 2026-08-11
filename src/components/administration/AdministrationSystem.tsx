import React from 'react';

export default function AdministrationSystem() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">System Administration & Health</h2>
          <p className="text-slate-500">Monitor server resources, database backups, and API integrations.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-sm font-medium hover:bg-rose-100 transition shadow-sm border border-rose-200">
            Restart Services
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm">
            Manual Backup
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-500/20 border-l-4 border-l-emerald-500">
          <p className="text-sm font-medium text-slate-500 mb-1">System Status</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h3 className="text-2xl font-bold text-emerald-600">All Systems Operational</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-500 mb-1">Server CPU Usage</p>
          <h3 className="text-3xl font-bold text-slate-800">24%</h3>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
            <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '24%' }}></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-500 mb-1">Database Load</p>
          <h3 className="text-3xl font-bold text-amber-600">68%</h3>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '68%' }}></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-500 mb-1">Last Backup</p>
          <h3 className="text-xl font-bold text-slate-800 mt-1">Today 03:00 AM</h3>
          <p className="text-xs text-slate-400 font-medium mt-1">Size: 45.2 GB (AWS S3)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Integrations */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-6">External Integrations</h3>
          <div className="space-y-4">
            {[
              { name: 'Payment Gateway (SSLCommerz)', status: 'Connected', ping: '12ms', icon: '💳' },
              { name: 'SMS Gateway (Twilio)', status: 'Connected', ping: '45ms', icon: '📱' },
              { name: 'Email Server (SendGrid)', status: 'Connected', ping: '24ms', icon: '📧' },
              { name: 'LMS Sync (Moodle)', status: 'Syncing', ping: '120ms', icon: '📚' },
              { name: 'Biometric Attendance (ZK)', status: 'Offline', ping: 'Timeout', icon: '👆' },
            ].map((integration, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 rounded-xl border border-slate-50 hover:bg-slate-50 transition">
                <div className="flex items-center gap-3">
                  <div className="text-xl">{integration.icon}</div>
                  <div>
                    <span className="font-medium text-sm text-slate-700 block">{integration.name}</span>
                    <span className="text-xs text-slate-400">Latency: {integration.ping}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  integration.status === 'Connected' ? 'bg-emerald-100 text-emerald-700' :
                  integration.status === 'Syncing' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {integration.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Master Data Management */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="font-semibold text-slate-800 mb-4">Master Data Caches</h3>
          <p className="text-sm text-slate-500 mb-4">Clear or rebuild Redis caches if the dashboard data appears stale.</p>
          
          <div className="flex-grow space-y-4">
            {[
              { cache: 'Student Master Records', size: '12.4 MB', keys: '24,512' },
              { cache: 'Finance Ledgers', size: '45.1 MB', keys: '142,001' },
              { cache: 'Academic Curriculums', size: '4.2 MB', keys: '1,204' },
              { cache: 'User Sessions', size: '1.1 MB', keys: '850' },
            ].map((cache, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700">{cache.cache}</h4>
                  <p className="text-xs text-slate-500">{cache.keys} Keys • {cache.size}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded text-xs font-medium hover:bg-slate-100">
                    Rebuild
                  </button>
                  <button className="px-3 py-1 bg-rose-50 text-rose-600 border border-rose-100 rounded text-xs font-medium hover:bg-rose-100">
                    Clear
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
