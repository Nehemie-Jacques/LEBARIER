import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: '#FBF7F0',
          100: '#F5EDD8',
          200: '#EFE3C0',
          300: '#E9D9A8',
          400: '#D9C484',
          500: '#C9A961',
          600: '#B8944C',
          700: '#9F8347',
          800: '#87713D',
          900: '#6F5F33',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Custom Colors
        cream: {
          DEFAULT: '#FBF7F0',
          50: '#FEFDFB',
          100: '#FBF7F0',
          200: '#F5EDD8',
          300: '#EFE3C0',
          400: '#E9D9A8',
          500: '#E3CF90',
          600: '#C9A961',
          700: '#9F8347',
          800: '#75612F',
          900: '#4B3F17',
        },
        charcoal: {
          DEFAULT: '#2A2A2A',
          50: '#F7F7F7',
          100: '#EDEDED',
          200: '#D4D4D4',
          300: '#B8B8B8',
          400: '#9B9B9B',
          500: '#7F7F7F',
          600: '#636363',
          700: '#474747',
          800: '#2A2A2A',
          900: '#1A1A1A',
        },
        gold: {
          DEFAULT: '#C9A961',
          50: '#FBF7F0',
          100: '#F5EDD8',
          200: '#EFE3C0',
          300: '#E9D9A8',
          400: '#D9C484',
          500: '#C9A961',
          600: '#B8944C',
          700: '#9F8347',
          800: '#87713D',
          900: '#6F5F33',
        },
        error: '#DC2626',
        success: '#16A34A',
        warning: '#F59E0B',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        heading: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['7rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        display: ['5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        title: ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      boxShadow: {
        'gold': '0 4px 6px -1px rgba(201, 169, 97, 0.3), 0 2px 4px -1px rgba(201, 169, 97, 0.2)',
        'gold-lg': '0 10px 15px -3px rgba(201, 169, 97, 0.3), 0 4px 6px -2px rgba(201, 169, 97, 0.2)',
        'gold-xl': '0 20px 25px -5px rgba(201, 169, 97, 0.3), 0 10px 10px -5px rgba(201, 169, 97, 0.2)',
        'dark': '0 4px 6px -1px rgba(26, 26, 26, 0.3), 0 2px 4px -1px rgba(26, 26, 26, 0.2)',
        'dark-lg': '0 10px 15px -3px rgba(26, 26, 26, 0.3), 0 4px 6px -2px rgba(26, 26, 26, 0.2)',
      },
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'), // TODO: Installer avec npm install tailwindcss-animate
  ],
};

export default config;
