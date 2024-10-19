const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    pname:String,
    price:String,
    category:String,
    userId:String,
    Company:String
});

module.exports = mongoose.model('addProducts', productSchema)