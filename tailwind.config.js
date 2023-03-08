/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './Components/**/*.{js,ts,jsx,tsx}',
    //'./node_modules/tw-elements/dist/js/**/*.js',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    require('flowbite/plugin'),
    // require('tw-elements/dist/plugin')
  ],
  theme: {
    extend: {
      colors: {
        yel: '#FFFF33',
      },
    },
  },
};
