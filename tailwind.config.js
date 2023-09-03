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
     
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }
      

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      'ml':'1128px',
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  
    extend: {
      colors: {
        yel: '#FFFF33',
      },
    },
  },
};
