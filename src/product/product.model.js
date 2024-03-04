// src/product/product.model.js

import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name is required"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "The description is required"]
    },
    price: {
        type: Number,
        required: [true, "The price is required"]
    },
    cost: {
        type: Number,
        required: [true, "The cost is required"]
    },
    stock: {
        type: Number,
        required: [true, "The stock is required"],
        default: 1
    },
    sale: {
        type: String,
        required: ['ALTA', 'MEDIA','BAJA'],
        default: 'MEDIA' 
    },
    category: {
        type: String, // Cambiar de ObjectId a String
        ref: 'Category',
        required: [true, "The category is required"],
        default: 'several' 
    },
});

export default mongoose.model('Product', ProductSchema);
