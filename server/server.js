const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan"); //logs request or show requests on the terminal 
const mongoose = require("mongoose");
const dotenv = require('dotenv');

//Require the user model schema
const User = require("./models/user");

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

//GET - Getting data from the server
app.get('/', (req, res) => {
    res.json("Amazone clone")
});

//POST - Send data from frontend to backend
app.post('/', (req, res) => {
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(err => {
        if (err){
            res.json(err)
        }else {
            res.json("Successfully saved!")
        }
    });
});


const PORT = 4000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Listening on port ${PORT}`);
    }
});