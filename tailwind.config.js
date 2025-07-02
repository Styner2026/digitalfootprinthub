/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        // Custom dark theme colors
        'dark-bg': '#1a1a1a',
        'dark-bg-lighter': '#2a2a2a',
        'dark-header': '#111111',
        'dark-sidebar': '#0f0f0f',
        'dark-content': '#161616',
        // Risk level colors - replacing blue/purple theme
        'high-risk': '#dc2626', // red-600
        'high-risk-bg': 'rgba(220, 38, 38, 0.1)',
        'high-risk-border': 'rgba(220, 38, 38, 0.3)',
        'medium-risk': '#f59e0b', // amber-500  
        'medium-risk-bg': 'rgba(245, 158, 11, 0.1)',
        'medium-risk-border': 'rgba(245, 158, 11, 0.3)',
        'resolved': '#16a34a', // green-600
        'resolved-bg': 'rgba(22, 163, 74, 0.1)', 
        'resolved-border': 'rgba(22, 163, 74, 0.3)',
        'protected': '#059669', // emerald-600
        'protected-bg': 'rgba(5, 150, 105, 0.1)',
        'protected-border': 'rgba(5, 150, 105, 0.3)',
      },
      backgroundImage: {
        'golden-gradient': 'linear-gradient(135deg, #8B4513 0%, #CD853F 25%, #DEB887 50%, #F4A460 75%, #D2691E 100%)',
        'dark-gradient': 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 25%, #1f1f1f 50%, #161616 75%, #1a1a1a 100%)',
        'risk-gradient': 'linear-gradient(135deg, #dc2626 0%, #f59e0b 50%, #16a34a 100%)',
        'protected-gradient': 'linear-gradient(135deg, #059669 0%, #16a34a 25%, #22c55e 50%, #4ade80 75%, #86efac 100%)',
        'alert-gradient': 'linear-gradient(135deg, #dc2626 0%, #ef4444 25%, #f87171 50%, #fca5a5 75%, #fecaca 100%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animationDelay: {
        '1s': '1s',
      },
      boxShadow: {
        'dark-heavy': '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(42, 42, 42, 0.5)',
        'dark-soft': '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        'dark-medium': '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
        'dark-subtle': '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(42, 42, 42, 0.3)',
      },
    },
  },
  plugins: [],
};
