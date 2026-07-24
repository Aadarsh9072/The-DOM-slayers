import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Download, Waves, ThermometerSun, AlertTriangle, TrendingUp } from 'lucide-react';
import { exportToPDF } from '../utils/exportHelpers';
import SSTAnomalyHistogram from '../components/charts/SSTAnomalyHistogram';
import InfoTooltip from '../components/common/InfoTooltip';
export default function CoralHealthPage() {
  const handleExportPDF = () => {
    exportToPDF('Coral Reef Health Report', 'Current SST anomaly indicates potential bleaching events in the Coral Triangle and Great Barrier Reef.', 'coral_report.pdf');
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
          <h1 className="text-2xl font-sans font-bold text-[var(--text-primary)]">Coral Health</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Sea Surface Temperature (SST) and bleaching alerts.</p>
        </div>
        <button onClick={handleExportPDF} className="flex items-center gap-2 text-xs bg-[var(--surface-card)] border border-[var(--glass-border)] px-4 py-2 rounded-lg btn-animate hover:bg-[var(--glass-fill)]">
          <Download className="w-3 h-3" /> Export Report
        </button>
      </div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Healthy Coral */}
        <motion.div variants={cardVariants} className="bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl overflow-hidden flex flex-col">
          <motion.div variants={imageContainerVariants} className="h-48 w-full overflow-hidden relative z-0">
            <motion.img variants={imageVariants} src="https://images.unsplash.com/photo-1546500840-ae38253aba9b?auto=format&fit=crop&q=80&w=800" alt="Healthy Coral" className="w-full h-full object-cover absolute top-0 left-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 z-20">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-white font-sans font-bold">Healthy Ecosystem</span>
            </div>
          </motion.div>
          <div className="p-6 grid grid-cols-2 gap-4 flex-1 relative z-10">
            <div className="bg-[rgba(255,255,255,0.03)] border border-[var(--glass-border)] rounded-lg p-3">
              <div className="flex items-center gap-2 text-[var(--text-secondary)] mb-1">
                <ThermometerSun className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider flex items-center">
                  SST Anomaly
                  <InfoTooltip term="SST Anomaly" />
                </span>
              </div>
              <p className="text-lg font-bold text-green-400 font-mono">+0.2°C</p>
            </div>
            <div className="bg-[rgba(255,255,255,0.03)] border border-[var(--glass-border)] rounded-lg p-3">
              <div className="flex items-center gap-2 text-[var(--text-secondary)] mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider flex items-center">
                  Recovery Prob.
                  <InfoTooltip term="Recovery Prob." />
                </span>
              </div>
              <p className="text-lg font-bold text-green-400 font-mono">92%</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Stable thermal conditions observed in the Caribbean sectors. Symbiotic algae populations are thriving with minimal thermal stress.</p>
            </div>
          </div>
        </motion.div>

        {/* Bleached Coral */}
        <motion.div variants={cardVariants} className="bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl overflow-hidden flex flex-col">
          <motion.div variants={imageContainerVariants} className="h-48 w-full overflow-hidden relative z-0">
            <motion.img variants={imageVariants} src="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&q=80&w=800" alt="Bleached Coral" className="w-full h-full object-cover grayscale mix-blend-luminosity absolute top-0 left-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 z-20">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-white font-sans font-bold">Severe Bleaching Watch</span>
            </div>
          </motion.div>
          <div className="p-6 grid grid-cols-2 gap-4 flex-1 relative z-10">
            <div className="bg-[rgba(255,255,255,0.03)] border border-[var(--glass-border)] rounded-lg p-3">
              <div className="flex items-center gap-2 text-[var(--text-secondary)] mb-1">
                <ThermometerSun className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider flex items-center">
                  SST Anomaly
                  <InfoTooltip term="SST Anomaly" />
                </span>
              </div>
              <p className="text-lg font-bold text-red-400 font-mono">+2.1°C</p>
            </div>
            <div className="bg-[rgba(255,255,255,0.03)] border border-[var(--glass-border)] rounded-lg p-3">
              <div className="flex items-center gap-2 text-[var(--text-secondary)] mb-1">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider flex items-center">
                  Threat Level
                  <InfoTooltip term="Threat Level" />
                </span>
              </div>
              <p className="text-lg font-bold text-red-400 font-mono">CRITICAL</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Extended period of thermal stress in the Great Barrier Reef sector has led to massive expulsion of zooxanthellae. Urgent intervention required.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* SST Anomaly Histogram */}
      <div className="mt-6">
        <SSTAnomalyHistogram />
      </div>
    </motion.div>
  );
}

