const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007bff",
        secondary: "#ffffff",
        accent: "#add8e6",
        light: "#f0f0f0",
        lighter: "#e6f3ff",
      },
    },
  },
  plugins: [],
};

export default config;