const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["fr", "en"],
    localePath: path.resolve("./public/locales"),
  },
};
