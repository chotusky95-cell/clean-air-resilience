/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: '#0b0f19',
        darkCard: '#111827',
        darkCardHover: '#1f2937',
        borderMuted: '#1e293b',
        aqiGood: '#10b981',
        aqiMod: '#eab308',
        aqiPoor: '#f97316',
        aqiVeryPoor: '#ef4444',
        aqiSevere: '#a855f7',
        aqiHazardous: '#881337',
      }
    },
  },
  plugins: [],
}
