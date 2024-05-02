const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("*", {
      target: "http://localhost:3001",
    //  target: "http://52.65.6.27:3001",
      changeOrigin: true,
    })
  );
};
