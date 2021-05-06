const router = require('express').Router();
const Product = require('../models/product');

const upload = require('../middlewares/upload-photo');

//POST REQUEST - Create a new product
router.post("/products", upload.single("photo"), async (req, res) => {

    try {
        let product = new Product();
        product.title = req.body.title;
        product.description = req.body.description;
        product.photo = req.file.location;
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
router.get('/products', async (req, res) => {

    try {
        let products = await Product.find();
        res.json({
            status: true,
            products : products
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        }); 
    }
})


//GET REQUEST - Get a single product
router.get('/products/:id', async (req, res) => {

    try {
        let product = await Product.findOne({ _id: req.params.id});
        res.json({
            status: true,
            product : product
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        }); 
    }
})

// PUT REQUEST - Update a single product
router.put('/products/:id', upload.single("photo"), async (req, res) => {

    try {
        let product = await Product.findOneAndUpdate({ _id: req.params.id}, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                category: req.body.categoryID,
                photo: req.file.location,
                owner: req.body.ownerID
            },
        }, {upsert: true}
        
        );

        res.json({
            status: true,
            updatedProduct : product
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        }); 
    }
})

//DELETE REQUEST - Delete a Product

module.exports = router;