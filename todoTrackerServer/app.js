//include http module
const http = require("http");
//define PORT on which the server will run either in an .env file or directly
const PORT = process.env.PORT || 5000;
//include the content of an endpont as json collection
const todos = require("./todos");
//import getRequestData function from utilsjs
const getRequestData = require("./utils");
//build the server
const server = http.createServer(async (request, response) => {
  if (request.url === "/api/v1/todos" && request.method === "GET") { // GET requests
    response.writeHead(200, {
      "content-type": "application/json",
    });
    response.end(JSON.stringify(todos));
  } else if (request.url === "/api/v1/todos" && request.method === "POST") { // POST requests,  doesn't persist the new todos
    let req_body = await getRequestData(request)
    todos.push(JSON.parse(req_body))
    response.writeHead(201, {
        "content-type": "application/json",
    })
    response.end(JSON.stringify(JSON.parse(req_body)))
  } else if (request.url.match(/\/api\/v1\/todos\/([0-9])/) && request.method === "DELETE") { // DELETE request
      const id = request.url.split("/")[4]
      const todo = todos.find(t => t.id === parseInt(id))
      if(!todo) {
          response.writeHead(404, {
              "content-type": "application/json"
          })
          response.end("No todo with id " + id + " found.")
      } else {
          const index = todos.indexOf(todo)
          todos.splice(index, 1)
          response.writeHead(200, {
              "content-type": "application/json"
          })
          response.end("Deleted todo with id " + id)
        }
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
