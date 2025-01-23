/** @type {import('tailwindcss').Config} */
export default {
  content: ['./resources/**/*.edge', './resources/**/*.{js,ts,jsx,tsx,vue}'],
  safelist: [
    'hover:bg-primary-100',
    'px-3',
    'px-4',
    'px-6', // Padding pour tailles spécifiques
    'py-3',
    'py-4',
    'py-6',
    'text-sm',
    'text-md',
    'text-lg', // Tailles de texte
    'bg-primary-600',
    'bg-primary-100',
    'bg-primary-700', // Couleurs dynamiques et variantes
    'hover:bg-primary-600',
    'hover:bg-primary-100',
    'hover:bg-primary-700',
    'text-primary-600',
    'text-primary-100',
    'text-primary-700',
    'border-primary-600',
    'border-primary-100',
    'border-primary-700',
    'bg-secondary-600',
    'bg-secondary-100',
    'bg-secondary-700',
    'hover:bg-secondary-600',
    'hover:bg-secondary-100',
    'hover:bg-secondary-700',
    'text-secondary-600',
    'text-secondary-100',
    'text-secondary-700',
    'border-secondary-600',
    'border-secondary-100',
    'border-secondary-700',
    'bg-ternary-600',
    'bg-ternary-100',
    'bg-ternary-700',
    'hover:bg-ternary-600',
    'hover:bg-ternary-100',
    'hover:bg-ternary-700',
    'text-ternary-600',
    'text-ternary-100',
    'text-ternary-700',
    'border-ternary-600',
    'border-ternary-100',
    'border-ternary-700',
    'bg-accent-600',
    'bg-accent-100',
    'bg-accent-700',
    'hover:bg-accent-600',
    'hover:bg-accent-100',
    'hover:bg-accent-700',
    'text-accent-600',
    'text-accent-100',
    'text-accent-700',
    'border-accent-600',
    'border-accent-100',
    'border-accent-700',
    'bg-last-600',
    'bg-last-100',
    'bg-last-700',
    'hover:bg-last-600',
    'hover:bg-last-100',
    'hover:bg-last-700',
    'text-last-600',
    'text-last-100',
    'text-last-700',
    'border-last-600',
    'border-last-100',
    'border-last-700',
    'opacity-50',
    'cursor-not-allowed',
    'rounded-lg',
    'font-medium',
    'transition',
    'duration-200', // Classes globales fixes
  ],
  plugins: [],
}
