import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#05060c',
        ink: '#0b0d18',
        neon: {
          blue: '#3aa6ff',
          cyan: '#7cf2ff',
          violet: '#9b6bff',
          pink: '#ff5cd1',
        },
        silver: {
          50: '#f5f7fb',
          100: '#dfe3ee',
          200: '#aab1c4',
          300: '#7a8198',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        'mega': '0.5em',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'drift': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(20px, -20px)' },
          '66%': { transform: 'translate(-10px, 10px)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'drift': 'drift 14s ease-in-out infinite',
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'shimmer': 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
