/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      xs: { max: '480px' },
      md: { max: '768px' },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
