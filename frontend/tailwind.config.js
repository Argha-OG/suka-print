/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    blue: '#00AEEF',
                    magenta: '#EC008C', // Gradient end
                    DEFAULT: '#00AEEF',
                },
                accent: {
                    DEFAULT: '#F7941D',
                    hover: '#e08315',
                },
                glass: {
                    white: 'rgba(255, 255, 255, 0.1)',
                    dark: 'rgba(0, 0, 0, 0.5)',
                    border: 'rgba(255, 255, 255, 0.2)',
                }
            },
            backgroundImage: {
                'gradient-main': 'linear-gradient(135deg, #00AEEF 0%, #EC008C 100%)',
            },
        },
    },
    plugins: [],
}
