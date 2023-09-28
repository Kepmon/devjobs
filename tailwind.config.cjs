/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
        sans: ["Kumbh Sans", ...defaultTheme.fontFamily.sans],
      },
			colors: {
				gray: {
					100: 'hsl(244, 246%, 248%)',
					300: 'hsl(212, 23%, 69%)',
					500: 'hsl(214, 17%, 51%)',
					800: 'hsl(219, 29%, 14%)',
					900: 'hsl(219, 29%, 10%)'
				},
        violet: {
					300: 'hsl(235, 82%, 77%)',
					400: 'hsl(235, 68%, 61%)'
				}
      },
			fontSize: {
				xxs: 'clamp(0.6075rem, 0.5965rem + 0.0627vw, 0.64rem)',
				xs: 'clamp(0.75rem, 0.7078rem + 0.241vw, 0.875rem)',
        normal: 'clamp(0.875rem, 0.8328rem + 0.241vw, 1rem)',
        md: 'clamp(1.05rem, 0.9825rem + 0.3855vw, 1.25rem)',
        lg: 'clamp(1.26rem, 1.158rem + 0.5831vw, 1.5625rem)',
        xl: 'clamp(1.5119rem, 1.363rem + 0.8506vw, 1.9531rem)',
        xxl: 'clamp(2.1775rem, 1.8825rem + 1.6855vw, 3.0519rem)'
      },
			boxShadow: {
        card: '0 0 1px hsl(0, 0%, 59%)',
      },
		},
	},
	plugins: [
		require('@shrutibalasa/tailwind-grid-auto-fit')
	],
}
