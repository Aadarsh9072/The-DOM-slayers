import React from 'react';
import { motion } from 'framer-motion';

const oceanRegions = [
  { key: 'pacific', name: 'Pacific Basin', health: 85, risk: 'Low', sensors: 420 },
  { key: 'atlantic', name: 'Atlantic Basin', health: 72, risk: 'Moderate', sensors: 315 },
  { key: 'indian', name: 'Indian Ocean', health: 64, risk: 'High', sensors: 180 },
  { key: 'arctic', name: 'Arctic Ocean', health: 91, risk: 'Low', sensors: 85 },
  { key: 'southern', name: 'Southern Ocean', health: 88, risk: 'Low', sensors: 120 },
];

export default function OceanRegionsSection() {
  return (
    <div className="mb-6 md:mb-8">
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl font-sans font-bold text-[var(--text-primary)]">Ocean Regions Overview</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Health, risk, and coverage across every monitored basin</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
        {oceanRegions.map((region, index) => (
          <motion.div 
            key={region.key} 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
            className="bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl p-5 transition-fast motion-safe:hover:-translate-y-[2px] hover:shadow-[var(--shadow-card)] hover:bg-[rgba(255,255,255,0.03)]"
          >
            <h3 className="font-sans font-semibold text-[var(--text-primary)] mb-4">{region.name}</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[var(--text-secondary)]">Health</span>
                <span className={`font-bold ${region.health > 80 ? 'text-green-400' : region.health > 70 ? 'text-[var(--accent)]' : 'text-orange-400'}`}>{region.health}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[var(--text-secondary)]">Risk Level</span>
                <span className={`font-medium ${region.risk === 'High' ? 'text-red-400' : region.risk === 'Moderate' ? 'text-orange-400' : 'text-[var(--text-primary)]'}`}>{region.risk}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[var(--text-secondary)]">Active Nodes</span>
                <span className="text-[var(--text-primary)]">{region.sensors}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
