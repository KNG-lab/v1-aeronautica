/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep cinematic background layers
        ink: {
          DEFAULT: '#06080B',
          900: '#06080B',
          800: '#0A0D12',
          700: '#0F141B',
          600: '#151B24',
          500: '#1C232E',
        },
        // Neutral steel scale for text/borders
        steel: {
          50: '#F4F6F8',
          100: '#E6EAEF',
          200: '#C7CFD9',
          300: '#9AA6B4',
          400: '#6F7C8C',
          500: '#4E5A69',
          600: '#384451',
          700: '#28323D',
          800: '#1B232C',
          900: '#121821',
        },
        // Aviation orange accent
        accent: {
          DEFAULT: '#FF6A1A',
          50: '#FFF2EA',
          100: '#FFE0CC',
          200: '#FFBF99',
          300: '#FF9F66',
          400: '#FF8333',
          500: '#FF6A1A',
          600: '#E5530A',
          700: '#B83F06',
          800: '#7A2A05',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', '"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        eyebrow: '0.28em',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,106,26,0.18), 0 18px 60px -20px rgba(255,106,26,0.35)',
        panel: '0 24px 80px -32px rgba(0,0,0,0.85)',
        card: '0 18px 50px -28px rgba(0,0,0,0.9)',
      },
      backgroundImage: {
        'radial-glow':
          'radial-gradient(60% 60% at 50% 0%, rgba(255,106,26,0.18) 0%, rgba(255,106,26,0) 70%)',
        'grid-faint':
          'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.85' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 5s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
}
