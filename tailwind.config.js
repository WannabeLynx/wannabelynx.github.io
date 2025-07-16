/** @type {import('tailwindcss').Config} */
module.exports = {
  experimental: {
    applyComplexClasses: true,
  },
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        yellowblue: {
          100: '#ffe700',
          200: '#0000ff'
        },
        blacktransparent: '#00000050',
        whitetransparent: '#ffffff50',
        darkgray: '#181818',
      },
      letterSpacing: {
        tightest: '-.075em',
      },
      fontFamily: {
        solway: ['Solway', 'sens-serif'],
        kalam: ['Kalam', 'sens-serif']
      },
    },
  },
  plugins: [],
}
