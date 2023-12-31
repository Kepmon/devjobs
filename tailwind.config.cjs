/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'hero-bg': "url('/img/bg-header.svg')"
      },
      boxShadow: {
        card: '0 0 1px hsl(0, 0%, 59%)',
        'fotter-light': '5px 0 5px hsl(0, 0%, 80%)',
        'fotter-dark': '5px 0 5px hsl(0, 0%, 20%)'
      },
      colors: {
        blue: {
          100: 'hsl(210, 22%, 96%)',
          200: 'hsl(231, 70%, 96%)',
          300: 'hsl(235, 68%, 86%)',
          400: 'hsl(235, 82%, 70%)',
          500: 'hsl(235, 68%, 61%)'
        },
        gray: {
          200: 'hsl(0, 0%, 79%)',
          500: 'hsl(214, 17%, 51%)',
          600: 'hsl(214, 4%, 34%)',
          700: 'hsl(220, 16%, 22%)',
          800: 'hsl(219, 29%, 14%)',
          900: 'hsl(219, 29%, 10%)'
        },
        red: {
          300: 'hsl(0, 68%, 50%)',
          400: 'hsl(0, 68%, 40%)'
        },
        violet: {
          400: 'hsl(285, 68%, 61%)'
        }
      },
      fontFamily: {
        sans: ['Kumbh Sans', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        xs: 'clamp(0.75rem, 0.7078rem + 0.241vw, 0.875rem)',
        normal: 'clamp(0.875rem, 0.8328rem + 0.241vw, 1rem)',
        md: 'clamp(1.05rem, 0.9825rem + 0.3855vw, 1.25rem)',
        lg: 'clamp(1.26rem, 1.158rem + 0.5831vw, 1.5625rem)',
        xl: 'clamp(1.25rem, 0.9583rem + 1.6667vw, 2.25rem)'
      },
      gridTemplateColumns: {
        'fill-350': 'repeat(auto-fill, minmax(350px, 1fr))'
      },
      animation: {
        fadeIn: 'fadeIn .3s linear forwards',
        fadeOut: 'fadeOut .3s linear forwards'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 }
        },
        fadeOut: {
          '100%': { opacity: 0 }
        }
      },
      screens: {
        xs: '512px'
      },
      scrollbar: {
        visibleDark: {
          size: '10px',
          track: { background: 'transparent' },
          thumb: { background: 'hsl(235 20% 25%)', borderRadius: '100vmax' },
          hover: { background: 'hsl(235 30% 35%)' }
        },
        visibleLight: {
          size: '10px',
          track: { background: 'transparent' },
          thumb: { background: 'hsl(235 20% 75%)', borderRadius: '40px' },
          hover: { background: 'hsl(235 30% 65%)' }
        }
      }
    }
  },
  plugins: [require('@gradin/tailwindcss-scrollbar')]
}
