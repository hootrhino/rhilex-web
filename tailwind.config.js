/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    // screens: {
    //   xs: { max: '480px' },
    //   md: { max: '768px' },
    // },
    boxShadow: {
      login:
        '0 4px 8px -4px rgba(0, 0, 0, 0.13), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 12px 24px 16px rgba(0, 0, 0, 0.04)',
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
