const path = require("path");
const tailwindCss = require("tailwindcss");

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [
      path.join(__dirname, "styles"),
      path.join(__dirname, "components/**"),
    ],
  },
  images: {
    domains: ["s3-us-west-2.amazonaws.com"],
  },
};
