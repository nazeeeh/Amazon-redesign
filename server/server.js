const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan"); //logs request or show requests on the terminal 
const mongoose = require("mongoose");
const dotenv = require('dotenv');

//Require the user model schema
const User = require("./models/user");

//secure database secrets
dotenv.config();

const app = express();

//Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Connect to mongoose database
mongoose.connect(process.env.DATABASE,
{ useNewUrlParser: true , useUnifiedTopology: true},

err => {
    if (err){
        console.log(err)
    } else {
        console.log("DATABASE CONNECTED SUCCESSFULLY");
    }
})

//Require Apis
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const ownerRoutes = require('./routes/owner');

app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', ownerRoutes);

//Listening to PORT
const PORT = 4000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Listening on port ${PORT}`);
    }
});