//require with productsModel

const productsModel = require('../models/productsModel');


//*POST create Data
const productCreate = async (req, res) => {
    try {
        const userData = new productsModel(req.body);
        await userData.save();
        res.status(200).json({ msg: "User created data add successfully database" });

    } catch (error) {
        res.status(500).json({ message: error.message }); // কোডে কোনো ত্রুটি পাওয়া গেলে
    }
};


const productSearching = async (req, res) => {
    try {
       
        const { ProductName,Category } = req.query; 
        // সার্চ কুয়েরি তৈরি করা
        let query = {};

        if (ProductName) {
            query = {ProductName: { $regex: ProductName, $options: 'i' } }; 
            // console.log('Search Query:', query); 
        }
        if (Category) {
            query = {Category: { $regex: Category, $options: 'i' } }; 
            // console.log('Search Query:', query); 
        }

        const result = await productsModel.find(query);
        // console.log('Search Result:', result); 
        res.status(200).send(result);

    } catch (error) {
        console.error('Error:', error.message); 
        res.status(500).send(error.message);
    }
};

//*Sorting API with price 
const sortingProduct = async (req, res) => {
    try {
        const sortOrder = parseFloat(req.query.sortOrder); 
        // 1 for Low to High, -1 for High to Low
        let sortObj = {};
        if (sortOrder )
            {
            sortObj['Price'] = sortOrder;
        }
        // ডাটাবেস থেকে প্রাইস অনুযায়ী ডাটা সর্ট করে আনা
        const sortedProducts = await productsModel.find().sort(sortObj);
        res.status(200).send(sortedProducts);
    } catch (error) {
     
        res.status(500).send(error.message);
    }
};

// *Sorting API with  Date sorting
const sortingProductDate = async (req, res) => {
    const sortDate = req.query.sortDate === "asc" ? 1 : -1;
    try {
        // ডাটাবেস থেকে Date অনুযায়ী ডাটা সর্ট করে আনা
        const sortedProductsData = await productsModel.find().sort({creationDate: sortDate});
        res.status(200).send(sortedProductsData);
    } catch (error) {
     
        res.status(500).send(error.message);
    }
};

//*Products filterProducts API
const filterProducts = async (req, res) => {
    const { brandName, categoryName, minPrice, maxPrice} = req.query;
    
    let filterCriteria = {};

    // Add brand filter if provided
    if (brandName) {
        filterCriteria.ProductName = brandName; //ProductName ta {productSchema} sate mil thakte hobe
    }

    // Add category filter if provided
    if (categoryName) {
        filterCriteria.Category = categoryName; //Category ta {productSchema} sate mil thakte hobe
    }

    // Add price range filter if provided
    if (minPrice && maxPrice) {
        filterCriteria.Price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
        filterCriteria.Price = { $gte: minPrice };
    } else if (maxPrice) {
        filterCriteria.Price = { $lte: maxPrice };
    }
    try {
        // Fetch and filter data from the database based on the criteria
        const filteredProducts = await productsModel.find(filterCriteria);
        res.status(200).send(filteredProducts);
    } catch (error) {
        res.status(500).send("An error occurred while filtering products.");
    }
};

//pagination Api
const productsPagination = async (req,res) =>{
    try {
        const total = await productsModel.estimatedDocumentCount();
        res.send({total})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//*GET ALL create data
const getAllData = async (req, res) => {
    try {
        const allGetData = await productsModel.find();
        res.status(200).json(allGetData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = { productCreate, getAllData,productSearching,sortingProduct,sortingProductDate,filterProducts,productsPagination };