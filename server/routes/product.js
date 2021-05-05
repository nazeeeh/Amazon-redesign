const router = require('express').Router();
const Product = require('../models/product')

//POST REQUEST - Create a new product
router.post("/products", async (req, res) => {
    
    try {

        let product = new Product();
        product.title = req.body.title;
        product.description = req.body.description;
        product.photo = req.body.photo;
        product.price = req.body.price;
        product.stockQuantity = req.body.stockQuantity;
        
        await product.save();
        res.json({
            status: true,
            message: 'Successfully saved'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

})


// GET REQUEST - Get all products


//GET REQUEST - Get a single product


// PUT REQUEST - Update a single product


//DELETE REQUEST - Delete a Product

module.exports = router;