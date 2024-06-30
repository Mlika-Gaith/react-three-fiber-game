/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "play-fair": "Playfair Display",
      },
      cursor: {
        custom:
          'url("https://github.com/chenglou/react-motion/raw/master/demos/demo8-draggable-list/cursor.png") 39 39, auto',
      },
    },
  },
  plugins: [],
};
