import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    container: { center: true, padding: '1rem', screens: { '2xl': '1280px' } },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0F766E',
          dark: '#0B5953',
          accent: '#F59E0B'
        },
        accent: {
          DEFAULT: '#F97316',
          dark: '#EA580C',
          soft: '#FFEDD5'
        },
        cream: '#FBF7F1',
        ink: '#0F172A',
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(222 47% 11%)',
        muted: 'hsl(210 40% 96%)',
        'muted-foreground': 'hsl(215 16% 47%)',
        border: 'hsl(214 32% 91%)'
      },
      fontFamily: {
        sans: ['var(--font-heebo)', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['var(--font-rubik)', 'var(--font-heebo)', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};

export default config;
