/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F5EF',
        beige: '#EFE6D9',
        lightBeige: '#F5EFE7',
        coffee: '#A98258',
        taupe: '#A98258',
        gold: '#C09A68',
        darkCoffee: '#5C4634',
        textMain: '#22201E',
        textSecondary: '#6C655E',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        heading: ['Rajdhani', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -10px rgba(92, 70, 52, 0.15)',
        card: '0 4px 20px rgba(34, 32, 30, 0.06)',
      },
      maxWidth: {
        content: '1280px',
      },
    },
  },
  plugins: [],
}
