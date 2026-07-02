import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lk: {
          cream: '#F5EFEA',
          pink: '#E61E6E',
          'pink-dark': '#B81253',
          'pink-medium': '#F25C93',
          'pink-soft': '#F88AFC',
          'gray-rose': '#D8CFCB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '20px',
        '2xl': '28px',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0, 0, 0, 0.08)',
        'soft-md': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'soft-lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
      spacing: {
        'gutter': '2rem',
      },
    },
  },
  plugins: [],
}
export default config
