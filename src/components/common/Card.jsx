import React from 'react';

const Card = ({ children, className = '', variant = 'flat', ...props }) => {
  const variants = {
    flat: 'bg-[var(--surface-card)] text-[var(--text-primary)] border border-[var(--glass-border)]',
    glass: 'glass-panel text-[var(--text-primary)]',
    paper: 'bg-[var(--paper-50)] text-[var(--ink-950)] border border-[rgba(0,0,0,0.08)]',
  };

  return (
    <div 
      className={`rounded-md overflow-hidden transition-transform duration-200 hover:scale-[1.02] ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
