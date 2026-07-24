import React from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Satellite, Zap } from 'lucide-react';

const systemStatus = [
  { key: 'api', label: 'API Gateway', status: 'Operational', uptime: '99.99%', icon: Server },
  { key: 'db', label: 'Database Cluster', status: 'Operational', uptime: '99.95%', icon: Database },
  { key: 'sat', label: 'Satellite Uplink', status: 'Degraded', uptime: '98.20%', icon: Satellite },
  { key: 'ml', label: 'ML Inference', status: 'Operational', uptime: '99.90%', icon: Zap },
];

export default function SystemStatusPanel() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6 md:mb-8">
      <div className="bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-[var(--accent-muted)] font-semibold mb-1">Platform health</p>
            <h3 className="font-sans font-bold text-lg text-[var(--text-primary)]">System Status</h3>
            <p className="text-sm text-[var(--text-secondary)]">Infrastructure powering the monitoring network</p>
          </div>
          <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-semibold">
            All systems reporting
          </span>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {systemStatus.map((item) => (
            <div key={item.key} className="flex items-center gap-4 p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--glass-border)]">
              <div className={`p-2 rounded-lg ${item.status === 'Operational' ? 'bg-[rgba(62,107,114,0.15)] text-[var(--accent)]' : 'bg-orange-500/15 text-orange-400'}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--text-primary)] mb-0.5">{item.label}</h4>
                <div className="flex items-center gap-2 text-xs">
                  <span className={item.status === 'Operational' ? 'text-green-400' : 'text-orange-400'}>{item.status}</span>
                  <span className="text-[var(--text-secondary)]">· {item.uptime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
