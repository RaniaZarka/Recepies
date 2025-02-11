import type { Config } from 'tailwindcss'
const {fontFamily} = require("tailwindcss/defaultTheme")

const config: Config = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        softWhite: '#f9f9f9',
        primary:"#A8D5BA",
        secondary: "#FFA500",

        tertiary:{
          dark: "#FF6F61",
          light:"#F2C641",
        },
        text: {
          darkCharcoal: "#333333", // Dark Charcoal for text
        },
        

    },
    fontFamily:{
      poppins:['var(--font-poppins)', ...fontFamily.sans] // this should match the variable we declared in layout.tsx
    }
  },
  },
  plugins: [
     require('@tailwindcss/aspect-ratio'),
  ],
}
export default config
