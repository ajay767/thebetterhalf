const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    ["@"]: path.resolve(__dirname, "./src"),
    ["@services"]: path.resolve(__dirname, "./src/_services"),
    ["@constant"]: path.resolve(__dirname, "./src/_constant"),
    ["@assets"]: path.resolve(__dirname, "./src/assets"),
    ["@layout"]: path.resolve(__dirname, "./src/layout"),
    ["@pages"]: path.resolve(__dirname, "./src/pages"),
    ["@components"]: path.resolve(__dirname, "./src/components"),
    ["@utils"]: path.resolve(__dirname, "./src/utils"),
    ["@router"]: path.resolve(__dirname, "./src/router"),
    ["@ui"]: path.resolve(__dirname, "./src/ui"),
    ["@hooks"]: path.resolve(__dirname, "./src/hooks"),
    ["@front"]: path.resolve(__dirname, "./src/front"),
    ["@context"]: path.resolve(__dirname, "./src/context"),
  })
);
