// Import the necessary dependencies
const { reject } = require("lodash");
const lodash = require("lodash");
const productsList = require("./products.json").products;


const getProducts = (done) => {
  // get all products
  let error = null
  return done(error, JSON.stringify(productsList));
}

const getProductsById = (productId, done) => {
 
    let product = null;
    let error = null;
    //get the product
    product = productsList.find((p) => p.id === parseInt(productId));
    // if product exist return product
    if (!product) {// if no product found return error
      error = "Requested product doesn't exist..!";      
    }
    return done(error, JSON.stringify(product));
}

const saveProduct = (newProduct, done) => {
  // save a product
  let product = null;
  let error = null;
  product = productsList.find(p => p.id === newProduct['id'])
  if(!product) {
  productsList.push(newProduct);
  } else {
    error = "Product already exists..!";
  }
  return done(error, JSON.stringify(productsList));
};
 

const updateProduct = (productId, updateData, done) => {
  // update the product list
    let product = null
    let error = null
    let res = null
    let myObj = null
    product = productsList.find((p) => p.id === parseInt(productId));
    if(!product) {
      error = "Requested product doesn't exist..!";
    } else {
      myObj = JSON.parse(updateData)
      
      for (const key in myObj) {        
        product[key] = myObj[key];      
      }
  }
  return done(error, JSON.stringify(productsList))
}

 // delete a product
const deleteProduct = async (productId, done) => {
     //get product
     let product = null
     let error = null
  product = productsList.find((p) => p.id === parseInt(productId));
  // if product doesn't exist return an error
  if(!product) {
    error = "Requested product doesn't exist..!";
  } else { // else return the product
    // get index of the product
    index = productsList.indexOf(product)
    // delete the product from the array
    productsList.splice(index, 1);
  }
  return done(error, JSON.stringify(productsList));
}


module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}