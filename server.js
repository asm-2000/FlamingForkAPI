const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
server.listen(PORT,()=>{console.log("The server is listening on port: ",PORT)});
