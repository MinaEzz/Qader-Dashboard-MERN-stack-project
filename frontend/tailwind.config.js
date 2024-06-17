/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "0.2rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        "primary-300": "#89cfff",
        "primary-400": "#52b4ff",
        "primary-500": "#2a91ff",
        "primary-600": "#0d6efd",
        "primary-700": "#0c5ae9",
        "primary-800": "#1149bc",
        "primary-900": "#144194",
        "coral-red-300": "#ff9595",
        "coral-red-400": "#ff5959",
        "coral-red-500": "#ff2626",
        "coral-red-600": "#fc0606",
        "coral-red-700": "#c70000",
        "coral-red-800": "#af0505",
        "coral-red-900": "#900c0c",
      },
    },
  },
  plugins: [],
};
