const http = require("http");
const app = require("./app");

const port = 3000;

const server = http.createServer(app);


server.on("error", (error) => {
    console.log(error);
    process.exit(1);
});

server.on("listening", () => {
    console.log(`Server is listening on port ${port}`);
});

server.listen(port);