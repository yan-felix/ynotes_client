import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['inter', 'sans-serif'],
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors:{
        "body_bg": "#E4E7EF",
        "titles_colour": "#310E01",
        "placeholder": "#666666",
        "submit_button_bg": "#FABCAF",
        "main_colour": "#E1531E",
        "samll_text": "#1C1919",
        "card_buttons": "#9A9797",
        "alert_colour": "#E30505"
      },

      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'fade-in-up': 'fade-in-up 2s ease-out forwards',
        'fade-in': 'fade-in 5s forwards',
        'slide-in-from-right': 'slide-in-from-right 1s ease-out forwards',
        'draw-circle': 'draw-circle 1.5s linear forwards',
        'draw-check': 'draw-check 1.5s ease-in-out forwards',      
      },

      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },

        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          }
        },

        'slide-in-from-right': {
          '0%': {
            transform: 'translateX(50%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },

        'draw-circle': {
          '0%': { strokeDasharray: '0, 100' },
          '100%': { strokeDasharray: '100, 100' },
        },

        'draw-check': {
          '0%': { strokeDashoffset: '100' },
          '70%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
