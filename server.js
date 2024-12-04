const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
function startserver() {
  server.listen(PORT, () => {
    console.log(` Server listening on ${PORT}`);
  });
}
startserver();
