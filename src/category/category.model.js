
import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name is required"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "The description is required"]
    }
});

export default mongoose.model('Category', CategorySchema);
