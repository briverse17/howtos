/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        logoSpin: {
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        logoSpin: 'logoSpin 10s linear infinite',
      },
    },
  },
  plugins: [],
}

