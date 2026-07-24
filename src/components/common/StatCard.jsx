import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

import InfoTooltip from './InfoTooltip';

export default function StatCard({ title, value, unit, trend, change }) {
  return (
    <div className="bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl p-5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)] opacity-[0.03] rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 group-hover:opacity-[0.06] transition-opacity" />
      
      <h3 className="text-sm font-sans text-[var(--text-secondary)] mb-4 flex items-center">
        {title}
        <InfoTooltip term={title} />
      </h3>
      
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-4xl font-sans font-bold tracking-tight text-[var(--text-primary)]">
          {value}
        </span>
        {unit && <span className="text-sm text-[var(--text-secondary)]">{unit}</span>}
      </div>
      
      <div className="flex items-center gap-2 text-xs">
        {trend === 'up' && <TrendingUp className="w-4 h-4 text-[#E8C547]" />}
        {trend === 'down' && <TrendingDown className="w-4 h-4 text-[var(--accent)]" />}
        {trend === 'flat' && <Minus className="w-4 h-4 text-[var(--text-secondary)]" />}
        <span className={trend === 'down' ? 'text-[var(--accent)]' : trend === 'up' ? 'text-[#E8C547]' : 'text-[var(--text-secondary)]'}>
          {change} from last month
        </span>
      </div>
    </div>
  );
}
