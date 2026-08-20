import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        slab: 'var(--slab)',
        form: 'var(--form)',
        joint: 'var(--joint)',
        aggregate: 'var(--aggregate)',
        ink: 'var(--ink)',
        chalk: 'var(--chalk)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Arial Narrow', 'Impact', 'sans-serif'],
        body: ['var(--font-body)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
