/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./Demos/atrust_global_acceleration*.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'PingFang SC', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: 'var(--color-blue)',
          hover: 'var(--color-blue-l10)',
          active: 'var(--color-blue-d10)',
          lightBg: 'var(--color-blue-l50)',
        },
        risk: 'var(--color-red)',
        warning: 'var(--color-orange)',
        success: 'var(--color-green)',
        text: {
          DEFAULT: 'var(--color-graphite-d40)',
          title: 'var(--color-graphite-d30)',
          mute: 'var(--color-graphite)',
        },
        border: 'var(--color-graphite-l20)',
        bg: {
          light: 'var(--color-graphite-l50)',
          line: 'var(--color-graphite-l30)',
        },
      },
      spacing: {
        4.5: '1.125rem',
      },
      keyframes: {
        flowRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(300%)' },
        },
      },
    },
  },
};