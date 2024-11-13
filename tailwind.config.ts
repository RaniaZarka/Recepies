import type { Config } from 'tailwindcss'
const {fontFamily} = require("tailwindcss/defaultTheme")

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        primary:"#038C7F",
        secondary: "#F2C641",
        tertiary:{
          dark: "#0568F2",
          light:"#F2C641",
        },

    },
    fontFamily:{
      poppins:['var(--font-poppins)', ...fontFamily.sans] // this should match the variable we declared in layout.tsx
    }
  },
  },
  plugins: [],
}
export default config
