const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan"); //logs request or show requests on the terminal 
const mongoose = require("mongoose");

const app = express();

//Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Connect to mongoose database
mongoose.connect("mongodb+srv://root:LGRJsiKbKRtKZVSx@amazon-redesign.imese.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
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
    console.log(req.body.state);
});

const PORT = 4000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Listening on port ${PORT}`);
    }
});