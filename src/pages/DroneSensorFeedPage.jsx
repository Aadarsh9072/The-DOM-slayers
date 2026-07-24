import React from 'react';
import { motion } from 'framer-motion';
import { Video, Radio } from 'lucide-react';

export default function DroneSensorFeedPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-sans font-bold text-[var(--text-primary)]">Drone & Sensor Feeds</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Live telemetry streams from underwater autonomous vehicles and buoys.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Drone Feed 1 */}
        <div className="bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl overflow-hidden group">
          <div className="relative h-64 bg-black flex items-center justify-center overflow-hidden">
             {/* Simulated video feed static/overlay */}
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544605929-de9be7520e7e?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-60 mix-blend-luminosity grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
             <div className="absolute top-4 left-4 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
               <span className="text-white text-xs font-mono bg-black/50 px-2 py-1 rounded">REC / UAV-ALPHA</span>
             </div>
             <Video className="w-12 h-12 text-white/20 absolute z-0" />
          </div>
          <div className="p-4 flex items-center justify-between">
             <div>
               <h3 className="font-sans font-bold text-sm">Sector 4 - Mariana Trench</h3>
               <p className="text-xs text-[var(--text-secondary)]">Depth: 4200m | Temp: 2.1°C</p>
             </div>
             <span className="text-xs text-[var(--accent)] flex items-center gap-1"><Radio className="w-3 h-3"/> Online</span>
          </div>
        </div>

        {/* Drone Feed 2 */}
        <div className="bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl overflow-hidden group">
          <div className="relative h-64 bg-black flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-60 mix-blend-luminosity grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
             <div className="absolute top-4 left-4 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
               <span className="text-white text-xs font-mono bg-black/50 px-2 py-1 rounded">REC / UAV-BETA</span>
             </div>
             <Video className="w-12 h-12 text-white/20 absolute z-0" />
          </div>
          <div className="p-4 flex items-center justify-between">
             <div>
               <h3 className="font-sans font-bold text-sm">Sector 7 - Great Barrier Reef</h3>
               <p className="text-xs text-[var(--text-secondary)]">Depth: 12m | Temp: 28.5°C</p>
             </div>
             <span className="text-xs text-[var(--accent)] flex items-center gap-1"><Radio className="w-3 h-3"/> Online</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
