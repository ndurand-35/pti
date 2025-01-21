/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.edge",
    "./resources/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      "colors": {
        "primary": {
          50: "#FCEDF2",
          100: "#FADCE5",
          200: "#F4B8CB",
          300: "#F099B5",
          400: "#EA769B",
          500: "#E55381",
          600: "#D9215B",
          700: "#A41945",
          800: "#6A102D",
          900: "#350816",
          950: "#1B040B"
        },
        "secondary": {
          50: "#FDF6F7",
          100: "#FCEEEF",
          200: "#F9DDDE",
          300: "#F5CBCE",
          400: "#F2BABE",
          500: "#EFA9AE",
          600: "#E2646D",
          700: "#CE2632",
          800: "#8A1A21",
          900: "#450D11",
          950: "#220608"
        },
        "accent": {
          50: "#F6F6F4",
          100: "#EAEAE6",
          200: "#D8D7D0",
          300: "#C3C2B7",
          400: "#B0AFA0",
          500: "#9B9987",
          600: "#807E6B",
          700: "#5F5D4F",
          800: "#403F35",
          900: "#1F1E19",
          950: "#11100E"
        },
        "ternary": {
          50: "#F1EEF0",
          100: "#E3DEE1",
          200: "#C5BAC1",
          300: "#A998A3",
          400: "#8B7483",
          500: "#685762",
          600: "#53464F",
          700: "#40353C",
          800: "#2A2327",
          900: "#161315",
          950: "#0B090A"
        },
        "last": {
          50: "#E8DBF5",
          100: "#D0B7EB",
          200: "#A16FD7",
          300: "#7333B8",
          400: "#461F70",
          500: "#190B28",
          600: "#140920",
          700: "#0F0718",
          800: "#0A0410",
          900: "#050208",
          950: "#030104"
        }

      }
    },
  },
  safelist :[
    {
      pattern: /(px|py)-(3|4|6)/, // Padding pour tailles sm, md, lg
    },
    {
      pattern: /text-(sm|md|lg)/, // Tailles de texte
    },
    {
      pattern: /(bg|hover:bg|text|border)-(primary|secondary|ternary|accent|last)-(600|100|700)/, // Couleurs dynamiques et variantes
    },
    {
      pattern: /(opacity-50|cursor-not-allowed|rounded-lg|font-medium|transition|duration-200)/, // Classes globales fixes
    },
  ],
  plugins: [],
}

