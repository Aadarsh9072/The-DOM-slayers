import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, Thermometer, Radar, Battery, Activity } from 'lucide-react';
import InfoTooltip from '../common/InfoTooltip';
export default function DroneTelemetry() {
  const [telemetry, setTelemetry] = useState({
    pitch: 12.3,
    roll: -4.1,
    yaw: 275.4,
    depth: 4200.5,
    speed: 3.2,
    do: 4.2,
    salinity: 35.1,
    temp: 2.1,
    battery: 88.4,
    sonar: 'Active',
    atrConfidence: 94
  });

  // Simulate rapid data changes
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        pitch: +(prev.pitch + (Math.random() - 0.5) * 0.5).toFixed(1),
        roll: +(prev.roll + (Math.random() - 0.5) * 0.5).toFixed(1),
        yaw: +(prev.yaw + (Math.random() - 0.5) * 1).toFixed(1),
        depth: +(prev.depth + (Math.random() - 0.5) * 0.2).toFixed(1),
        do: +(prev.do + (Math.random() - 0.5) * 0.1).toFixed(2),
        battery: +(prev.battery - 0.01).toFixed(2),
        atrConfidence: Math.max(85, Math.min(99, Math.floor(prev.atrConfidence + (Math.random() - 0.5) * 2)))
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-[var(--accent)]" />
        <h2 className="font-sans font-bold text-lg text-[var(--text-primary)]">UAV-ALPHA Telemetry</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Hardware Kinematics */}
        <div className="bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4 text-[var(--text-secondary)]">
            <Compass className="w-4 h-4" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Hardware Kinematics</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-[var(--glass-border)] pb-2">
              <span className="text-xs text-[var(--text-secondary)]">Pitch / Roll</span>
              <span className="text-sm font-bold font-mono text-[var(--text-primary)]">{telemetry.pitch}° / {telemetry.roll}°</span>
            </div>
            <div className="flex justify-between items-center border-b border-[var(--glass-border)] pb-2">
              <span className="text-xs text-[var(--text-secondary)]">Yaw</span>
              <span className="text-sm font-bold font-mono text-[var(--text-primary)]">{telemetry.yaw}°</span>
            </div>
            <div className="flex justify-between items-center border-b border-[var(--glass-border)] pb-2">
              <span className="text-xs text-[var(--text-secondary)]">Depth</span>
              <span className="text-sm font-bold font-mono text-blue-400">{telemetry.depth} m</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-[var(--text-secondary)]">Speed</span>
              <span className="text-sm font-bold font-mono text-[var(--text-primary)]">{telemetry.speed} kts</span>
            </div>
          </div>
        </div>

        {/* Environmental Payload */}
        <div className="bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4 text-[var(--text-secondary)]">
            <Thermometer className="w-4 h-4" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Environmental Payload</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-[var(--glass-border)] pb-2">
              <span className="text-xs text-[var(--text-secondary)]">Dissolved Oxygen (DO)</span>
              <span className="text-sm font-bold font-mono text-[var(--text-primary)]">{telemetry.do} mg/L</span>
            </div>
            <div className="flex justify-between items-center border-b border-[var(--glass-border)] pb-2">
              <span className="text-xs text-[var(--text-secondary)]">Salinity</span>
              <span className="text-sm font-bold font-mono text-[var(--text-primary)]">{telemetry.salinity} psu</span>
            </div>
            <div className="flex justify-between items-center border-b border-[var(--glass-border)] pb-2">
              <span className="text-xs text-[var(--text-secondary)]">Water Temp</span>
              <span className="text-sm font-bold font-mono text-cyan-400">{telemetry.temp} °C</span>
            </div>
          </div>
        </div>

        {/* Perception (ATR) */}
        <div className="bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4 text-[var(--text-secondary)]">
            <Radar className="w-4 h-4" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Perception (ATR)</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-[var(--glass-border)] pb-2">
              <span className="text-xs text-[var(--text-secondary)]">Forward Sonar</span>
              <span className="text-sm font-bold text-green-400 uppercase tracking-wider text-[10px]">{telemetry.sonar}</span>
            </div>
            <div className="flex justify-between items-center border-b border-[var(--glass-border)] pb-2">
              <span className="text-xs text-[var(--text-secondary)] flex items-center">
                ATR Confidence
                <InfoTooltip term="ATR Confidence" />
              </span>
              <span className="text-sm font-bold font-mono text-[var(--text-primary)]">{telemetry.atrConfidence}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs flex items-center gap-2 text-[var(--text-secondary)]"><Battery className="w-3 h-3"/> Main Battery</span>
              <span className="text-sm font-bold font-mono text-[var(--accent)]">{telemetry.battery} V</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
