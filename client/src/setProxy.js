const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
    createProxyMiddleware("/rest", {
      target: process.env.REACT_APP_REST_SERVER_URL,     // react server
        changeOrigin: true,
    })
    )
    app.use(
      createProxyMiddleware("/api", {
        target: process.env.REACT_APP_SERVER_URL,     // react server
          changeOrigin: true,
      })
      )
};