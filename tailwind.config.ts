import type { Config } from "tailwindcss";
import theme from "tailwindcss/defaultTheme";
const { fontFamily } = theme;

const config: Config = {
	content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
				"./src/**/*.{js,ts,jsx,tsx}",
				"./index.html",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-inter)", ...fontFamily.sans],
				inter: ["var(--font-inter)", ...fontFamily.sans],
				space: ["var(--font-space)", ...fontFamily.mono],
				bayon: ["var(--font-bayon)", ...fontFamily.sans],
				poppins: ["var(--font-poppins)",...fontFamily.sans],
			},
		},
	},
	plugins: [],
};

export default config;
