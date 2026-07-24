import React from 'react';

const Badge = ({ children, color = 'accent', className = '', ...props }) => {
  const colors = {
    accent: 'bg-accent/15 text-accent border border-accent/30',
    clay: 'bg-accent-clay/15 text-accent-clay border border-accent-clay/30',
    none: 'bg-alert-none/15 text-alert-none border border-alert-none/30',
    watch: 'bg-alert-watch/15 text-alert-watch border border-alert-watch/30',
    warning: 'bg-alert-warning/15 text-alert-warning border border-alert-warning/30',
    alert1: 'bg-alert-alert1/15 text-alert-alert1 border border-alert-alert1/30',
    alert2: 'bg-alert-alert2/15 text-alert-alert2 border border-alert-alert2/30',
    neutral: 'bg-[var(--text-secondary)]/10 text-[var(--text-secondary)] border border-[var(--glass-border)]',
  };

  return (
    <span 
      className={`inline-flex items-center px-2.5 py-1 rounded-sm text-xs uppercase tracking-wider font-mono font-medium ${colors[color]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
