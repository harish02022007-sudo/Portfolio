/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          void: '#050507',
          dark: '#08090D',
          card: '#0A0A0F',
          surface: '#101117',
          border: '#171923',
        },
        cyan: {
          accent: '#62E6FF',
          glow: 'rgba(98, 230, 255, 0.4)',
        },
        violet: {
          accent: '#9B7CFF',
          glow: 'rgba(155, 124, 255, 0.4)',
        },
        green: {
          highlight: '#71F5A3',
        },
        text: {
          primary: '#F4F5F7',
          secondary: '#A0A4B2',
          muted: '#656977',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Orbitron', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'cyan-glow': '0 0 25px rgba(98, 230, 255, 0.25)',
        'violet-glow': '0 0 25px rgba(155, 124, 255, 0.25)',
        'glass-panel': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%': { boxShadow: '0 0 15px rgba(98, 230, 255, 0.2)' },
          '100%': { boxShadow: '0 0 35px rgba(98, 230, 255, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};
