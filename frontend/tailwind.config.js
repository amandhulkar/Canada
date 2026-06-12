/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#fbfbff',
        'canvas-soft': '#f6f7fb',
        'canvas-muted': '#f1f3f9',
        ink: '#111827',
        muted: '#667085',
        line: '#e5e7eb',
        accent: {
          blue: '#2563eb',
          purple: '#7c3aed',
          cyan: '#38bdf8',
          glow: '#dbe7ff',
          soft: '#eef4ff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.06)',
        float: '0 24px 50px rgba(15, 23, 42, 0.10)',
        glow: '0 12px 28px rgba(37, 99, 235, 0.18)',
      },
      backgroundImage: {
        'hero-grid':
          'linear-gradient(rgba(148, 163, 184, 0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.11) 1px, transparent 1px)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '0.75', transform: 'scale(1.03)' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        glow: 'pulseGlow 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
