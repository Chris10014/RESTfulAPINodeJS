// Import the necessary dependencies
const { reject } = require("lodash");
const lodash = require("lodash");
const productsList = require("./products.json").products;
//import getRequestData function from utilsjs
const getRequestData = require("./utils");


const getProducts = async () => {
  // get all products
 return new Promise((resolve, _) => resolve(productsList));
}

const getProductsById = async (productId, done) => {
  return new Promise ((resolve, reject) => {
    let product = null;
    //get the product
    product = productsList.find((p) => p.id === parseInt(productId));
    // if product exist return product
    if (product) {
      resolve(product);      
    } else { // if not return error
      reject("Requested product doesn't exist..!");      
    }
  })
}

const saveProduct = async (newProduct, done) => {
 // save a product
 return new Promise((resolve, _) => {
   let newProductsList = null;
    productsList.push(JSON.parse(newProduct));
    newProductsList = getProducts()
    resolve(newProductsList)
 })
}
 

const updateProduct = async (productId, updateData, done) => {
  // update the product list
  return new Promise((resolve, reject) => {
    let updatedProductList = null;
    let product = productsList.find(p => p.id === productId)
    if(product) {
      // todo: update an item of an array

    } else {
      reject("Requested product doesn't exist..!");
    }
  });

  // done(null, JSON.stringify(updatedProductList));
}

 // delete a product
const deleteProduct = async (productId, done) => {
  return new Promise ((resolve, reject) => {
     let deletedProduct = null;
     //get product
  let product = productsList.find((p) => p.id === parseInt(productId));
  // if product doesn't exist return an error
  if(!product) {
    reject("Requested product doesn't exist..!");
  } else { // else return the product
    // get index of the product
    index = productsList.indexOf(product)
    // delete the product from the array
    deletedProduct = productsList.splice(index, 1);
    // return the deleted product only
    resolve(deletedProduct);
  }

  })
}


module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}