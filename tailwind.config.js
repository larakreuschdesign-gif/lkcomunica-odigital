/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors - LK Comunicação Digital
        pink: {
          50: '#FBE9F0',
          100: '#F88AFC8', // Rosa Suave
          200: '#F5C9D6',
          300: '#F25C93', // Rosa Médio
          400: '#E84A7F',
          500: '#E61E6E', // Rosa LK (principal)
          600: '#D91861',
          700: '#B81253', // Rosa Profundo (hover)
          800: '#8A0D3E',
          900: '#5C0929',
        },
        cream: {
          50: '#FEFDFB',
          100: '#F5EFEA', // Creme Claro (fundo principal)
          200: '#E8DED6',
          300: '#D8CFCB', // Cinza Rosado
          400: '#C8BAB3',
          500: '#B8A89F',
          600: '#9A8A7F',
          700: '#7C6A5F',
          800: '#5E4A3F',
          900: '#402A1F',
        },
        // Paleta neutra
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '28px' }],
        xl: ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
        '5xl': ['48px', { lineHeight: '52px' }],
      },
      fontWeight: {
        thin: '300',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      borderRadius: {
        none: '0',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '28px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(230, 30, 110, 0.05)',
        md: '0 4px 6px -1px rgba(230, 30, 110, 0.1), 0 2px 4px -2px rgba(230, 30, 110, 0.1)',
        lg: '0 10px 15px -3px rgba(230, 30, 110, 0.1), 0 4px 6px -4px rgba(230, 30, 110, 0.1)',
        xl: '0 20px 25px -5px rgba(230, 30, 110, 0.1), 0 8px 10px -6px rgba(230, 30, 110, 0.1)',
      },
      spacing: {
        0: '0',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
        24: '96px',
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(230, 30, 110, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(230, 30, 110, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
