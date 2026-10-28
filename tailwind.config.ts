import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: { black: '#0a0a0f', dark: '#12121a', card: '#1a1a25', neon: { purple: '#b24bf3', pink: '#ff3cac', blue: '#00d4ff', green: '#00ff9d', yellow: '#ffeb3b' } },
      fontFamily: { sans: ['Anuphan', 'K2D', 'sans-serif'] },
    },
  },
  plugins: [],
};
export default config;