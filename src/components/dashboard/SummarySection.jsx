import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Compass, Globe2, Timer } from 'lucide-react';

const summaryStats = [
  { id: 1, label: 'Reports Generated', value: '1,204', icon: FileText },
  { id: 2, label: 'Regions Monitored', value: '14', icon: Compass },
  { id: 3, label: 'Data Points / Sec', value: '45K', icon: Globe2 },
  { id: 4, label: 'System Uptime', value: '99.9%', icon: Timer },
];

export default function SummarySection() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-xl border border-[var(--glass-border)] rounded-xl p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-[var(--glass-border)] lg:divide-y-0 lg:divide-x lg:divide-[var(--glass-border)]">
          {summaryStats.map((stat, index) => (
            <div key={stat.id} className={`flex items-center gap-4 py-4 lg:py-0 ${index % 2 === 0 ? 'pr-4' : 'pl-4'} lg:px-6 first:lg:pl-0 last:lg:pr-0 transition-fast motion-safe:hover:-translate-y-[2px]`}>
              <div className="w-10 h-10 rounded-lg bg-[rgba(62,107,114,0.1)] text-[var(--accent)] flex items-center justify-center shrink-0">
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-sans font-bold text-[var(--text-primary)] leading-none">{stat.value}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
