//Import the necessary dependencies
const http = require('http');
const { start } = require('repl');
// Define a prot at which the server will run
const  PORT = process.env.PORT || 5000;

const productsService = require("./productsService");
const getRequestData = require('./utils');

const server = http.createServer(async (request, response) => {
  // Get all products /api/v1/products : GET
  if (request.url === "/api/v1/products" && request.method === "GET") {
    // GET requests
    productsService.getProducts((error, products) => {
      if (!error) {
        response.writeHead(200, {
          "content-type": "application/json",
        });
        response.end(products);
      } else {
        response.writeHead(500, {
          "content-type": "application/json",
        });
        response.end(error);
      }
    });
  }
  // Get a product with specified id /api/v1/products/:id : GET
  else if (request.url.match(/\/api\/v1\/products\/([0-9])/) && request.method === "GET") {
    const id = request.url.split("/")[4];
    productsService.getProductsById(id, (error, product) => {
      if (!error) {
        response.writeHead(200, {
          "content-type": "application/json",
        });
        response.end(product);
      } else {
        response.writeHead(404, {
          "content-type": "application/json",
        });
        response.end(error);
      }
    });
  } else if (request.url === "/api/v1/products" && request.method === "POST") {
    //Create a new product /api/v1/products : POST
    let product_data = await getRequestData(request);
    productsService.saveProduct(product_data, (error, productsList) => {
      if (productsList) {
        response.writeHead(200, {
          "content-type": "application/json",
        });
        response.end(productsList);
      } else {
        response.writeHead(404, {
          "content-type": "application/json",
        });
        response.end(error);
      }
    });
  }
  // Delete a specific Product api/v1/product/:id : DELETE
  else if (request.url.match(/\/api\/v1\/products\/([0-9])/) && request.method === "DELETE") {
    const id = request.url.split("/")[4];
    productsService.deleteProduct(id, (error, productsList) => {
      if (!error) {
        response.writeHead(200, {
          "content-type": "application/json",
        });
        response.end(productsList);
      } else {
        response.writeHead(404, {
          "content-type": "application/json",
        });
        response.end(error);
      }
    });
  }
  // Update a specific product /api/v1/products/:id : UPDATE
  else if (request.url.match(/\/api\/v1\/products\/([0-9])/) && request.method === "PATCH") {
    const id = request.url.split("/")[4];
    let updateData = await getRequestData(request);
    productsService.updateProduct(id, updateData, (error, productsList) => {
      if (!error) {
        response.writeHead(200, {
          "content-type": "application/json",
        });
        response.end(productsList);
      } else {
        response.writeHead(404, {
          "content-type": "application/json",
        });
        response.end(error);
      }
    });
  }
})

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})