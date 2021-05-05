const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    category: { type:Schema.Types.ObjectId, ref: 'Category'},
    owner: { type: Schema.Types.ObjectId, ref: 'Owner'},
    title: String,
    description: String,
    photo: String,
    price: Number,
    stockQuantity: Number,
    ratings: [Number]

});

module.exports = mongoose.model(Product, productSchema);