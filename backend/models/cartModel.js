const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('carts', CartSchema);
