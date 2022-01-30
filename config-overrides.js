const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    ["@"]: path.resolve(__dirname, "./src"),
    ["@assets"]: path.resolve(__dirname, "./src/assets"),
    ["@pages"]: path.resolve(__dirname, "./src/pages"),
    ["@components"]: path.resolve(__dirname, "./src/components"),
    ["@utils"]: path.resolve(__dirname, "./src/utils"),
    ["@router"]: path.resolve(__dirname, "./src/router"),
    ["@ui"]: path.resolve(__dirname, "./src/ui"),
    ["@hooks"]: path.resolve(__dirname, "./src/hooks"),
    ["@front"]: path.resolve(__dirname, "./src/front"),
  })
);
