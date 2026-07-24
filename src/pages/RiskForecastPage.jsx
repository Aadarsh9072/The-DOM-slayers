import React from 'react';
import { motion } from 'framer-motion';
import modulesData from '../data/modules-data.json';
import { Download, ShieldAlert } from 'lucide-react';
import { exportToCSV } from '../utils/exportHelpers';
import InfoTooltip from '../components/common/InfoTooltip';
export default function RiskForecastPage() {
  const handleExportCSV = () => exportToCSV(modulesData.riskZones, 'risk_forecast.csv');

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-sans font-bold text-[var(--text-primary)]">Risk Forecast</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Predictive modeling of upcoming threats based on historical data.</p>
        </div>
        <button onClick={handleExportCSV} className="flex items-center gap-2 text-xs bg-[var(--surface-card)] border border-[var(--glass-border)] px-4 py-2 rounded-lg hover:bg-[var(--glass-fill)] btn-animate">
          <Download className="w-3 h-3" /> Export CSV
        </button>
      </div>

      <div className="bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[rgba(255,255,255,0.02)] border-b border-[var(--glass-border)]">
              <th className="p-4 text-xs font-sans text-[var(--text-secondary)] uppercase tracking-wider">Region</th>
              <th className="p-4 text-xs font-sans text-[var(--text-secondary)] uppercase tracking-wider whitespace-nowrap">
                <span className="flex items-center">
                  Risk Score
                  <InfoTooltip term="Risk Score" />
                </span>
              </th>
              <th className="p-4 text-xs font-sans text-[var(--text-secondary)] uppercase tracking-wider">Primary Threat</th>
              <th className="p-4 text-xs font-sans text-[var(--text-secondary)] uppercase tracking-wider whitespace-nowrap">
                <span className="flex items-center">
                  Trend
                  <InfoTooltip term="Trend" />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {modulesData.riskZones.map((zone, i) => (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                key={i} 
                className="border-b border-[var(--glass-border)] hover:bg-[rgba(255,255,255,0.02)] transition-fast"
              >
                <td className="p-4 font-sans text-sm">{zone.region}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-[var(--glass-border)] rounded-full h-2 max-w-[100px]">
                      <div className={`h-2 rounded-full ${zone.score > 80 ? 'bg-[#D1452C]' : 'bg-[#E8C547]'}`} style={{ width: `${zone.score}%` }}></div>
                    </div>
                    <span className="text-xs text-[var(--text-secondary)]">{zone.score}/100</span>
                  </div>
                </td>
                <td className="p-4 text-sm flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[var(--text-secondary)]" /> {zone.threat}
                </td>
                <td className="p-4 text-sm text-[var(--accent-clay)]">{zone.trend}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
