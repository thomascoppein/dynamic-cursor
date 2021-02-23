module.exports = {
  env: {
    browser: true,
    es2021: true,
    mocha: true,
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": ["error"],
    "class-methods-use-this": 0,
    "linebreak-style": "off", // windows fix
    "no-new": 0,
    "no-plusplus": "off",
  },
};
