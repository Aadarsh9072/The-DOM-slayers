import React from 'react';
import { motion } from 'framer-motion';
import modulesData from '../data/modules-data.json';
import { Download, Droplets } from 'lucide-react';
import { exportToCSV, exportToPDF } from '../utils/exportHelpers';
import HealthChart from '../components/charts/HealthChart';
import PollutantBreakdownDonut from '../components/charts/PollutantBreakdownDonut';

export default function PollutionMonitorPage() {
  const handleExportCSV = () => exportToCSV(modulesData.pollution, 'pollution_data.csv');
  const handleExportPDF = () => {
    const dataString = modulesData.pollution.map(p => `Date: ${p.date}\nType: ${p.type}\nRegion: ${p.region}\nDensity: ${p.density}`).join('\n\n');
    exportToPDF('Pollution Monitor Report', dataString, 'pollution_report.pdf');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-sans font-bold text-[var(--text-primary)]">Pollution Monitor</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Analyzing macro & micro plastic densities globally.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExportCSV} className="flex items-center gap-2 text-xs bg-[var(--surface-card)] border border-[var(--glass-border)] px-4 py-2 rounded-lg hover:bg-[var(--glass-fill)] btn-animate">
            <Download className="w-3 h-3" /> CSV
          </button>
          <button onClick={handleExportPDF} className="flex items-center gap-2 text-xs bg-[var(--surface-card)] border border-[var(--glass-border)] px-4 py-2 rounded-lg hover:bg-[var(--glass-fill)] btn-animate">
            <Download className="w-3 h-3" /> PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl p-6 h-[400px]">
          <HealthChart />
        </div>
        <div className="bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl p-6 h-[400px] overflow-y-auto">
          <h3 className="font-sans font-bold mb-4">Recent Detections</h3>
          <div className="space-y-4">
            {modulesData.pollution.map((p, i) => (
              <motion.div 
                key={p.id} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className="p-3 border border-[var(--glass-border)] rounded-lg bg-[rgba(255,255,255,0.02)] transition-fast motion-safe:hover:-translate-y-[2px] hover:bg-[rgba(255,255,255,0.04)]"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-sans font-bold text-sm text-[var(--accent-clay)] flex items-center gap-2">
                    <Droplets className="w-4 h-4" /> {p.type}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)]">{p.date}</span>
                </div>
                <div className="text-sm mb-1">Region: <span className="text-[var(--text-primary)]">{p.region}</span></div>
                <div className="text-sm">Density: <span className="text-[var(--text-primary)]">{p.density}</span></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pollutant Breakdown Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="min-h-[220px]">
          <PollutantBreakdownDonut />
        </div>
      </div>
    </motion.div>
  );
}

