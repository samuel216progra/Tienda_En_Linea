import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name is required"]
    },
    userName: {
        type: String,
        required: [true, "The name is required"]
    },
    lastName: {
        type: String,
        required: [true, "The last name is required"]
    },
    email: {
        type: String,
        required: [true, "The emmail is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "The password is required"]
    },
    state: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        required: ['ROLE_CLIENT', 'ROLE_ADMIN'],
        default: 'ROLE_CLIENT' 
    }
});

export default mongoose.model('User', UserSchema);
