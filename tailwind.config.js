/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: { page: 'var(--surface-page)', card: 'var(--surface-card)' },
        ink: 'var(--ink-950)',
        paper: 'var(--paper-50)',
        accent: { DEFAULT: 'var(--accent)', mist: 'var(--accent-mist)', muted: 'var(--accent-muted)', clay: 'var(--accent-clay)' },
        alert: { none: '#3E7CB1', watch: '#E8C547', warning: '#E8842C', alert1: '#D1452C', alert2: '#7A2338' },
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        editorial: ['Outfit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        7: 'var(--space-7)',
        8: 'var(--space-8)',
        9: 'var(--space-9)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
      }
    },
  },
  plugins: [],
}
