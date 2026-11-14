module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3f7ff',
          100: '#e7efff',
          200: '#d0defe',
          300: '#a5c0fc',
          400: '#7d9ff9',
          500: '#5277f1',
          600: '#415ed7',
          700: '#3448a8',
          800: '#2b3d80',
          900: '#243561',
        },
      },
      boxShadow: {
        glow: '0 10px 30px rgba(82, 119, 241, 0.25)',
      },
    },
  },
  plugins: [],
};
