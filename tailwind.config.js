/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: I've updated this path to be more robust, covering all files in your src directory.
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    // --- THIS IS THE FIX ---
    // All of your custom additions MUST go inside this 'extend' block.
    extend: {
      colors: {

        'primary': '#93c5fd', // blue-300
        'background': '#f8fafc', // slate-50
        'text': '#334155', // slate-700
        'accent-yellow': '#fde047', // yellow-300
        'accent-pink': '#f9a8d4',   // pink-300
        'accent-green': '#5eead4',  // teal-300
        'accent-peach': '#fed7aa',  // orange-200
      },
      fontFamily: {
        // The key is the class name, e.g., `font-sans`
        sans: ['Nunito', 'sans-serif'],
      },
      // You can also extend other things here, like fonts or spacing, in the future.
    },
  },
  plugins: [],
}
