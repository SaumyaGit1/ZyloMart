/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // Define custom screen sizes
        'sm': '640px',   // Small devices (mobile)
        'md': '821px',   // Medium devices (tablet)
        'lg': '1024px',  // Large devices (desktops)
        'xl': '1280px',  // Extra large devices (large desktops)
        '2xl': '1536px', // 2xl devices
        'between-764-820': {'min': '764px', 'max': '820px'}, // Custom range
      },
    },
  },
  plugins: [],
}

