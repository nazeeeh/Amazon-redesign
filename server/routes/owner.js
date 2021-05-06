const router = require('express').Router();
const Owner = require('../models/owner');

const upload = require("../middlewares/upload-photo")

//POST REQUEST
router.post('/owners', async (req, res) =>{

    try {
        const owner = new Owner();
        owner.name = req.body.name;
        owner.about = req.body.about;

        await owner.save();
        res.json({
            status: true,
            message: "Successfully Created an Owner"
        })
        
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
        
    }
})

//GET REQUEST

router.get('/owners', async (req, res) =>{

    try {
        let owners = await Owner.find();

        res.json({
            status: true,
            Owners: owners
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

module.exports = router;