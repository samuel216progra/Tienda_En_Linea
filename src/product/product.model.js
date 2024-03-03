
import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name is required"]
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
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "The category is required"],
        default: 'several' 
    },

});

export default mongoose.model('Product', ProductSchema);
