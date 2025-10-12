import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-coral',
    'bg-teal',
    'bg-gold',
  ],
  theme: {
    extend: {
      colors: {
        coral: '#FF6B61',
        teal: '#0F5960',
        gold: '#F6C85F',
        dark: '#111827',
        cream: '#FBF8F6',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
