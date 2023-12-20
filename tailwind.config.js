/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#164863',
        'buttons-back-color' : '#9bbec8',
        'column-back': '#ddf2fd',
        'question-back' : '#427d9d',
        'text' : '#F5DEB3'
      }
    },
  },
  plugins: [],
}

