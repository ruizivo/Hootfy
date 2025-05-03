// tailwind.config.js
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Habilita o modo escuro baseado em classes
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        // Você pode adicionar mais cores personalizadas aqui
      },
    },
  },
  plugins: [
    forms,
    function({ addBase }) {
      addBase({
        // Estilos padrão para elementos HTML
        'body': {
          '@apply bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200': {}
        },
        'h1': {
          '@apply text-2xl font-bold mb-4': {}
        },
        'h2': {
          '@apply text-xl font-bold mb-3': {}
        },
        'h3': {
          '@apply text-lg font-bold mb-2': {}
        },
        'p': {
          '@apply mb-4': {}
        },
        'a': {
          '@apply text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300': {}
        },
        'input, select, textarea': {
          '@apply px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white': {}
        },
        'button': {
          '@apply px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-700 dark:hover:bg-primary-600': {}
        },
        'table': {
          '@apply w-full border-collapse': {}
        },
        'th': {
          '@apply px-4 py-2 text-left bg-gray-100 dark:bg-gray-800': {}
        },
        'td': {
          '@apply px-4 py-2 border-t border-gray-200 dark:border-gray-700': {}
        }
      });
    }
  ],
}