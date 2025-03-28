import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-noto-sans)'], // This will be your default font
                'permanent-marker': ['var(--font-permanent-marker)']
            },
            colors: {
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                tertiary: 'var(--color-tertiary)',
                retroBlue: 'var(--color-blue)',
                dark: 'var(--color-dark)',
                light: 'var(--color-light)',
            },
        },
    },
};
export default config; 