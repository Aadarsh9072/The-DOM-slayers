import React from 'react';

const Button = ({ variant = 'primary', size = 'md', className = '', children, ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-medium tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
  
  const variants = {
    primary: 'bg-accent text-white hover:brightness-110 rounded-pill',
    secondary: 'bg-transparent border border-[var(--glass-border)] text-[var(--text-primary)] hover:bg-accent/10 rounded-pill',
    clay: 'bg-accent-clay text-white hover:brightness-110 rounded-pill',
    ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
    'nav-glass': 'nav-glass-btn',
  };
  
  const sizes = {
    sm: 'text-xs px-4 py-2',
    md: 'text-sm px-6 py-3',
    lg: 'text-base px-8 py-4',
    nav: '',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
