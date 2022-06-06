//include http module
const http = require("http");
//define PORT on which the server will run either in an .env file or directly
const PORT = process.env.PORT || 5000;
//include the content of an endpont as json collection
const todos = require("./todos");
//build the server
const server = http.createServer(function (request, response) {
  if (request.url === "/api/v1/todos" && request.method === "GET") {
    response.writeHead(200, {
      "content-type": "application/json",
    });
    response.end(JSON.stringify(todos));
  }
});

//Make server listen in the defined PORT
server.listen(PORT, () => {
  console.log("Server is ready and running on port ", PORT);
});
//Error handling
server.on("error", (error) => {
  if ((error.code = "EADRINUSE")) {
    console.log("Port ", PORT + " is already in use.");
  }
});
