/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#1E40AF',
        'primary-orange': '#F56500',
        'dark-blue': '#1E3A8A',
      },
    },
  },
  plugins: [],
}

