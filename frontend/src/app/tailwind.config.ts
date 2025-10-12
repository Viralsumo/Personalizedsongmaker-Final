import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-accent': '#e85d75',
        'primary-accent-hover': '#d44b65',
        'secondary-accent': '#007b83',
        'secondary-accent-hover': '#01666d',
        'background-base': '#fffaf7',
        'section-accent-1': '#fde8e0',
        'section-accent-2': '#fff1ed',
        'text-base': '#374151', // gray-700
        'text-strong': '#111827', // gray-900
        'text-muted': '#6b7280', // gray-500

        // For backward compatibility with old class names if needed
        coral: '#e85d75',
        'deep-rose': '#d44b65',
        teal: '#007b83',
        'deep-teal': '#01666d',
        'soft-cream': '#fffaf7',
        'light-peach': '#fde8e0',
      },
      textColor: {
        foreground: 'var(--text-base)',
      },
      backgroundColor: {
        background: 'var(--background-base)',
      },
    },
  },
  plugins: [],
};
export default config;