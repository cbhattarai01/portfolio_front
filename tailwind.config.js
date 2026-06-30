export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 40px rgba(34,197,94,0.16)',
        glass: '0 30px 80px rgba(15,23,42,0.35)',
        soft: '0 10px 40px rgba(15,23,42,0.25)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(34,211,238,0.20), transparent 30%), radial-gradient(circle at 100% 0%, rgba(67,56,202,0.18), transparent 25%)',
        'dashboard-glow': 'radial-gradient(circle at top, rgba(56,189,248,0.14), transparent 18%), radial-gradient(circle at bottom right, rgba(168,85,247,0.12), transparent 20%)',
      },
      colors: {
        surface: {
          DEFAULT: '#0f172a',
          soft: '#111827',
          muted: '#0d1321',
        },
      },
    },
  },
  plugins: [],
}

