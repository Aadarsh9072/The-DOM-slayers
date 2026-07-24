import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import modulesData from '../data/modules-data.json';
import { Download } from 'lucide-react';
import { exportToCSV, exportToPDF } from '../utils/exportHelpers';

export default function SpeciesTrackerPage() {
  const handleExportCSV = () => {
    exportToCSV(modulesData.species, 'species_tracking_data.csv');
  };

  const handleExportPDF = () => {
    const dataString = modulesData.species.map(s => `${s.name} (${s.scientific})\nStatus: ${s.status} | Population: ${s.population}`).join('\n\n');
    exportToPDF('Marine Species Tracking Report', dataString, 'species_report.pdf');
  };

  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const imageContainerVariants = {
    hidden: { clipPath: prefersReducedMotion ? "none" : "inset(0 100% 0 0)", opacity: 0 },
    visible: { clipPath: "inset(0 0% 0 0)", opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };

  const imageVariants = {
    hidden: { scale: prefersReducedMotion ? 1 : 1.2 },
    visible: { scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-sans font-bold text-[var(--text-primary)]">Species Tracker</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Monitoring endangered marine life populations and migration patterns.</p>
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

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {modulesData.species.map((s) => (
          <motion.div 
            key={s.id} 
            variants={cardVariants}
            className="bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl overflow-hidden group"
          >
            <motion.div variants={imageContainerVariants} className="h-48 w-full overflow-hidden relative z-0">
              <motion.img variants={imageVariants} src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </motion.div>
            <div className="p-5 relative z-10">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-sans font-bold text-lg">{s.name}</h3>
                <span className={`text-[10px] uppercase px-2 py-1 rounded ${s.status === 'Critically Endangered' ? 'bg-[#D1452C]/20 text-[#D1452C]' : 'bg-[#E8C547]/20 text-[#E8C547]'}`}>{s.status}</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] italic mb-4">{s.scientific}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-secondary)]">Est. Population</span>
                <span className="font-sans font-bold">{s.population.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
