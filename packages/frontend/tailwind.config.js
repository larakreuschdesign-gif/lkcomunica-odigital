/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: '#E8175D',
        'pink-light': '#F04080',
        'pink-dark': '#b5104a',
        'pink-xlight': '#FBEAEF',
        dark: '#0d0d1a',
        'dark-2': '#121226',
        'dark-3': '#1a1a35',
        'off-white': '#F7F1EE',
        cream: '#F5EDE8',
      },
      fontFamily: {
        body: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      boxShadow: {
        sm: '0 2px 8px rgba(232, 23, 93, 0.1)',
        md: '0 8px 32px rgba(232, 23, 93, 0.18)',
        lg: '0 20px 60px rgba(232, 23, 93, 0.22)',
        dark: '0 8px 32px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
}
