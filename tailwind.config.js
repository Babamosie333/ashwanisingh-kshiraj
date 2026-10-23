/** Theme lives here: change colors/fonts once, whole site updates. */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#14214f", deep: "#0d1738" },
        leaf: { DEFAULT: "#5b8a2e", dark: "#4a7424", soft: "#e8f0dc" },
        gold: "#b8923f",
        paper: "#f7f6f1",
        ink: "#1b2340",
        mute: "#5a6280",
        line: "#e2e1d8",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-figtree)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
