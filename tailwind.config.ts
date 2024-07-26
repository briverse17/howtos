import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
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
} satisfies Config;
