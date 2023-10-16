/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    fontSize: {
      base: '12px',
    },
    colors: {
      primary: '#1f6aFF',
      baseColor: '#adadad',
      dividerColor: '#333',
      highlight3: '#dbdbdb'
    },
    backgroundColor: {
      primary: '#1f6aFF',
      panelBg: '#1a1a1a',
      inputBg: '#333',
    },
    screens: {
      'xs': {'max': '480px'},
      'md': {'max': '768px'},
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
