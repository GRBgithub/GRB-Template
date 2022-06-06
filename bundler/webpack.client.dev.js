const { merge } = require("webpack-merge");
const path = require("path");
const glob = require("glob");
const commonConfiguration = require("./webpack.client.common.js");

/*---------------------------------------------------------------
    GO TO ROUTES FILE TO SETUP EVERY ROUTES AND HERE META DATA
-----------------------------------------------------------------*/
const dirSrc = path.join(__dirname, "../src");

//itnext.io/auto-reload-a-full-stack-javascript-project-using-nodemon-and-webpack-dev-server-together-a636b271c4e

let watch = [];
glob.sync("./src/**/**/**.js").reduce(function (obj, el) {
  let f = false;
  let buffer = path.join(dirSrc, el.substring(el.indexOf("./src/") + 6));
  commonConfiguration.entry.forEach((e) => {
    if (e === buffer) f = true;
  });
  if (!f) watch.push(buffer);
}, {});

console.log("--------------FILES TO WATCH------------", watch);

module.exports = merge(commonConfiguration, {
  entry: watch,
  devServer: {
    open: false,
    https: false,
    allowedHosts: "all",
    hot: true,
    watchFiles: ["../src/**"],
    proxy: [
      // allows redirect of requests to webpack-dev-server to another destination
      {
        context: () => true, // can have multiple
        target: "http://localhost:3000", // server and port to redirect to
        secure: false,
        changeOrigin: true,
        headers: {
          Connection: "keep-alive",
        },
      },
    ],
    port: 8080, // port webpack-dev-server listens to, defaults to 8080
  },
});
