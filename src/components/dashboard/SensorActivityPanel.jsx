import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Signal, Battery, AlertTriangle } from 'lucide-react';

const activeSensors = [
  { id: 'SN-4291', type: 'Buoy', location: 'Mariana Trench', reading: 'Temp: 2.1°C', status: 'Optimal', battery: 98 },
  { id: 'UAV-ALPHA', type: 'Drone', location: 'Great Barrier', reading: 'Depth: 12m', status: 'Warning', battery: 45 },
  { id: 'SN-8820', type: 'Buoy', location: 'Mid-Atlantic', reading: 'Salinity: 35 PSU', status: 'Optimal', battery: 91 },
  { id: 'UAV-BETA', type: 'Drone', location: 'Arctic', reading: 'Speed: 4 kts', status: 'Optimal', battery: 76 },
];

export default function SensorActivityPanel() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="h-full">
      <div className="bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl p-6 h-full flex flex-col">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <p className="text-xs uppercase tracking-wider text-[var(--accent-muted)] font-semibold mb-1">Hardware</p>
            <h3 className="font-sans font-bold text-lg text-[var(--text-primary)]">Sensor Activity</h3>
            <p className="text-sm text-[var(--text-secondary)]">Live telemetry from deployed units</p>
          </div>
          <Signal className="w-5 h-5 text-[var(--accent)] animate-pulse" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="space-y-3">
            {activeSensors.map((sensor) => (
              <div key={sensor.id} className="p-3 border border-[var(--glass-border)] rounded-lg bg-[rgba(255,255,255,0.015)] hover:bg-[rgba(255,255,255,0.04)] transition-fast">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className={`w-4 h-4 ${sensor.status === 'Warning' ? 'text-orange-400' : 'text-[var(--accent)]'}`} />
                    <span className="font-sans font-bold text-sm text-[var(--text-primary)]">{sensor.id}</span>
                    <span className="text-[10px] uppercase bg-[rgba(255,255,255,0.1)] px-1.5 py-0.5 rounded text-[var(--text-secondary)]">{sensor.type}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                    <Battery className="w-3 h-3" /> {sensor.battery}%
                  </div>
                </div>
                <div className="text-xs text-[var(--text-secondary)] flex justify-between">
                  <span>{sensor.location}</span>
                  <span className="font-mono text-[var(--text-primary)]">{sensor.reading}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
