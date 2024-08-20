const express = require('express');
const { productCreate, getAllData, productSearching,sortingProduct,sortingProductDate,filterProducts,productsPagination} = require('../controller/allController');
const sampleRoute = express.Router();


//POST API
sampleRoute.post('/create',productCreate);

//GET ALLDATA API
sampleRoute.get('/getAllData', getAllData);

//GET productSearching API
sampleRoute.get('/productSearching', productSearching);

//GET sortingProduct price API
sampleRoute.get('/sortingProduct', sortingProduct);
//GET sortingProduct Date API
sampleRoute.get('/sortingProductDate', sortingProductDate);

//GET filterProducts { ProductName, Category, minPrice, maxPrice} API
sampleRoute.get('/filterProducts', filterProducts);

// productsPagination Api
sampleRoute.get('/productsPagination', productsPagination);


module.exports=sampleRoute;