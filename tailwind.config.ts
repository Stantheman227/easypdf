import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'easy-blue': {
          DEFAULT: '#7289da',
          '100': '#f0f3fb',
          '200': '#e2e7f7',
          '300': '#d4dbf3',
          '400': '#c6cff0',
          '500': '#b8c4ec',
          '600': '#aab8e8',
          '700': '#9cace5',
          '800': '#8ea0e1',
          '900': '#8094dd',
        },
        'easy-gray': '#99aab5',
        'easy-black': '#2c2f33',
        'hard-black': '#23272a',
         // Replace with your custom color code
      },
    },
  },
  plugins: [],
}

export default config;
