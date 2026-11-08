module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended", // If  using React
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    // globals provided by vendor scripts loaded in the HTML templates
    gsap: "readonly",
    SplitText: "readonly",
    ScrollTrigger: "readonly",
    ScrollSmoother: "readonly",
    ScrollToPlugin: "readonly",
    TweenMax: "readonly",
    Quint: "readonly",
    Quart: "readonly",
    Quad: "readonly",
    Ease: "readonly",
    Magnetic: "readonly",
    imagesLoaded: "readonly",
    jQuery: "readonly",
    $: "readonly",
  },
  ignorePatterns: ["js/library/**", "public/**", "coverage/**", "node_modules/**"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
};
