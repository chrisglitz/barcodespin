import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cyber-orange': '#f6921e',
        'cyber-blue': '#1b75bb',
        'cyber-gray': '#4d4d4d',
        'cyber-light-gray': '#d9d9d9',
      },
      boxShadow: {
        'neon-orange': '0 0 10px #f6921e, 0 0 20px #f6921e, 0 0 30px #f6921e',
        'neon-blue': '0 0 10px #1b75bb, 0 0 20px #1b75bb, 0 0 30px #1b75bb',
      },
    },
  },
  plugins: [],
}
export default config
