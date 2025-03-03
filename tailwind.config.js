/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "nsans-light": ["Nsans Light"],
        "nsans-medium": ["Nsans Meidum"],
        "nsans-bold": ["Nsans Bold"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
