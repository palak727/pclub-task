/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#1E293B',
        royal: '#1D4ED8',
        amber: '#F59E0B',
      },
    },
  },
  plugins: [],
};
