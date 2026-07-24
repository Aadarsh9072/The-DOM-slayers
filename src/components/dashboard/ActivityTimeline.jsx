import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Fish, FileText, CheckCircle, Waves, Settings } from 'lucide-react';

const recentActivity = [
  { id: 1, title: 'UAV Alpha detected anomaly', detail: 'Sector 4', time: '12m ago', icon: 'Radio', tone: 'kelp' },
  { id: 2, title: 'Whale Pod Sighting', detail: 'Sector 2', time: '1h ago', icon: 'Fish', tone: 'lumen' },
  { id: 3, title: 'Weekly Report Generated', detail: 'System', time: '2h ago', icon: 'FileText', tone: 'lumen' },
  { id: 4, title: 'Sensor Node Replaced', detail: 'Maintenance', time: '4h ago', icon: 'Settings', tone: 'kelp' },
  { id: 5, title: 'SST Anomaly Resolved', detail: 'Sector 7', time: '1d ago', icon: 'Waves', tone: 'amber' },
];

const ICONS = { Radio, Fish, FileText, CheckCircle, Waves, Settings };
const TONE_CLASS = {
  lumen: 'bg-[rgba(62,107,114,0.1)] text-[var(--accent)] ring-[rgba(62,107,114,0.2)]',
  kelp: 'bg-green-500/10 text-green-400 ring-green-400/20',
  amber: 'bg-amber-500/10 text-amber-400 ring-amber-400/20',
};

export default function ActivityTimeline() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="h-full">
      <div className="bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl p-6 h-full">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wider text-[var(--accent-muted)] font-semibold mb-1">Timeline</p>
          <h3 className="font-sans font-bold text-lg text-[var(--text-primary)]">Recent Activity</h3>
          <p className="text-sm text-[var(--text-secondary)]">Latest monitoring events, most recent first</p>
        </div>

        <ol className="relative">
          {recentActivity.map((event, index) => {
            const Icon = ICONS[event.icon];
            const isLast = index === recentActivity.length - 1;

            return (
              <li key={event.id} className="relative flex gap-4 pb-6 last:pb-0">
                {!isLast && <span className="absolute left-[15px] top-9 bottom-0 w-px bg-[var(--glass-border)]" />}
                <span className={`flex items-center justify-center h-8 w-8 rounded-full ring-4 ring-offset-0 shrink-0 z-10 ${TONE_CLASS[event.tone]}`}>
                  {Icon && <Icon size={14} strokeWidth={2} />}
                </span>
                <div className="min-w-0 flex-1 pt-1">
                  <p className="text-sm font-medium text-[var(--text-primary)] leading-snug">{event.title}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">{event.detail} · {event.time}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </motion.div>
  );
}
