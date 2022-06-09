//Import the necessary dependencies
const http = require('http')
// Define a prot at which the server will run
const  PORT = process.env.PORT || 5000;

const productsService = require("./productsService");
const getRequestData = require('./utils');

const server = http.createServer(async (request, response) => {
  // Get all products /api/v1/products : GET
  if (request.url === "/api/v1/products" && request.method === "GET") {
    // GET requests
    const products = await productsService.getProducts();
    response.writeHead(200, {
      "content-type": "application/json",
    });
    response.end(JSON.stringify(products));
  }
  // Get a product with specified id /api/v1/products/:id : GET
  else if (request.url.match(/\/api\/v1\/products\/([0-9])/) && request.method === "GET") {
    try {
      const id = request.url.split("/")[4];
      const product = await productsService.getProductsById(id);
      response.writeHead(200, {
        "content-type": "application/json",
      });
      response.end(JSON.stringify(product));
    } catch (error) {
      response.writeHead(404, {
        "content-type": "application/json",
      });
      response.end(JSON.stringify({ message: error }));
    }
  } else if (request.url === "/api/v1/products" && request.method === "POST") {
    //Create a new product /api/v1/products : POST

    let product_data = await getRequestData(request);
    const product = await productsService.saveProduct(product_data);
    response.writeHead(200, {
      "content-type": "application/json",
    });
    response.end(JSON.stringify(product));
  }

  // Delete a specific Product api/v1/product/:id : DELETE
  else if (request.url.match(/\/api\/v1\/products\/([0-9])/) && request.method === "DELETE") {
    try {
      const id = request.url.split("/")[4];
      const message = await productsService.deleteProduct(id);
      response.writeHead(200, {
        "content-type": "application/json",
      });
      response.end(JSON.stringify({ message }));
    } catch (error) {
      response.writeHead(404, {
        "content-type": "application/json",
      });
      response.end(JSON.stringify({ message: error }));
    }
  }
  // Update a specific product /api/v1/products/:id : UPDATE
  else if (request.url.match(/\/api\/v1\/products\/([0-9])/) && request.method === "PATCH") {
    try {

    } catch (error) {
      response.writeHead(404, {
        "content-type": "application/json"
      })
      response.end(JSON.stringify({message: error}));
    }

  }
});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})