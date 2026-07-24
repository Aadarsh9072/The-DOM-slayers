import React from 'react';
import InteractiveMap from '../components/map/InteractiveMap';
import { motion } from 'framer-motion';

export default function LiveMapPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-[calc(100vh-6rem)] relative"
    >
      <div className="absolute top-4 left-4 z-[500] bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl p-4 shadow-[var(--shadow-card)] w-80">
        <h2 className="text-lg font-sans font-bold text-[var(--text-primary)] mb-1">Global Telemetry</h2>
        <p className="text-xs text-[var(--text-secondary)] mb-4">Real-time overlay of active threats and sensor nodes.</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--text-secondary)]">Active Alerts</span>
            <span className="font-bold text-[#D1452C]">3 Critical</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--text-secondary)]">Sensors Online</span>
            <span className="font-bold text-[var(--accent)]">14,092</span>
          </div>
        </div>
      </div>
      <div className="w-full h-full rounded-xl overflow-hidden border border-[var(--glass-border)]">
         <InteractiveMap />
      </div>
    </motion.div>
  );
}
