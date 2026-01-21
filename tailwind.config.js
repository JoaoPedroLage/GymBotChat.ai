/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Fonte moderna e limpa
      },
      // Garantindo a paleta neon/dark mode
      colors: {
        background: '#050505',
        surface: '#0F1115',
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-blue-500/10',
    'bg-violet-500/10',
    'bg-emerald-500/10',
    'text-blue-400',
    'text-violet-400',
    'text-emerald-400',
  ],
}