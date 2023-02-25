/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        'primary-darker': 'var(--primary-color-darker)',
        secondary: 'var(--secondary-color)',
        tertiary: 'var(--tertiary-color)',
        complement: 'var(--complement-color)'
      }
    }
  },
  plugins: []
};
