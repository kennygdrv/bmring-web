module.exports = {
  content: ["./public/index.html", "./src/**/*.{vue}"],
  safelist: process.env.NODE_ENV === "development" ? [{ pattern: /.*/ }] : [],
  theme: {
    extend: {},
  },
  plugins: [],
}
