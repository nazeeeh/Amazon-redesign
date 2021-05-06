const router = require('express').Router();
const Category = require('../models/category');

//POST REQUEST
router.post('/categories', async (req, res) =>{

    try {
        const category = new Category()
        category.type = req.body.type;

        await category.save();

        res.json({
            status: true,
            message: "Successfully Created a new category"
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
})

//GET REQUEST

router.get('/categories', async (req, res) => {

    try {
        let categories = await Category.find();
        res.json({
            status: true,
            categories: categories
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        }); 
    }
})

module.exports = router;