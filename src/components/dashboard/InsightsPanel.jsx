import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, AlertCircle } from 'lucide-react';

const insights = [
  { id: 1, type: 'critical', title: 'Unusual warming detected', desc: 'Sector 4 SST is 1.5°C above the 10-year average. High risk of localized bleaching within 14 days.', icon: AlertCircle, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { id: 2, type: 'positive', title: 'Ghost net density down', desc: 'AI models show a 12% decrease in suspended debris in the North Pacific gyre compared to last month.', icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400/10' },
  { id: 3, type: 'info', title: 'Migration shift', desc: 'Humpback whale pods tracking 40km further north than historical models predict.', icon: Sparkles, color: 'text-[var(--accent)]', bg: 'bg-[rgba(62,107,114,0.15)]' },
];

import InfoTooltip from '../common/InfoTooltip';

export default function InsightsPanel() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="h-full">
      <div className="bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl p-6 h-full flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/10 blur-3xl rounded-full" />
        
        <div className="mb-6 relative z-10">
          <p className="text-xs uppercase tracking-wider text-[var(--accent-muted)] font-semibold mb-1">AI Analysis</p>
          <h3 className="font-sans font-bold text-lg text-[var(--text-primary)] flex items-center">
            Automated Insights
            <InfoTooltip term="Automated Insights" />
          </h3>
          <p className="text-sm text-[var(--text-secondary)]">Machine learning synthesis of current data</p>
        </div>

        <div className="flex-1 space-y-4 relative z-10">
          {insights.map((insight) => (
            <div key={insight.id} className="flex gap-4">
              <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${insight.bg} ${insight.color}`}>
                <insight.icon className="w-4 h-4" />
              </div>
              <div>
                <h4 className={`text-sm font-bold mb-1 ${insight.color}`}>{insight.title}</h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{insight.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
