import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('deep-sea');

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') || 'deep-sea';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'deep-sea' ? 'light' : 'deep-sea';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-[var(--glass-fill)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      aria-label={theme === 'light' ? "Switch to Deep Sea Mode" : "Switch to Light Mode"}
    >
      {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
}
