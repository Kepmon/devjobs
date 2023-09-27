/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
        sans: ["Kumbh Sans", ...defaultTheme.fontFamily.sans],
      },
			colors: {
				blue: {
					800: 'hsl(219, 29%, 10%)',
					900: 'hsl(219, 29%, 14%)'
				},
				gray: {
					100: 'hsl(244, 246%, 248%)',
					300: 'hsl(212, 23%, 69%)',
					500: 'hsl(214, 17%, 51%)',
				},
        violet: {
					300: 'hsl(235, 82%, 77%)',
					400: 'hsl(235, 68%, 61%)'
				}
      },
			fontSize: {
        baseFluid: 'clamp(0.81rem, calc(0.78rem + 0.21vw), 0.94rem)',
        lgFluid: 'clamp(0.88rem, calc(0.80rem + 0.42vw), 1.13rem)',
        xlFluid: 'clamp(1.25rem, calc(1.07rem + 1.04vw), 1.88rem)',
        xxlFluid: 'clamp(1.63rem, calc(1.22rem + 2.29vw), 3.00rem)'
      },
		},
	},
	plugins: [],
}
