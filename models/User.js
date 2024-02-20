const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['TEACHER_ROLE', 'STUDENT_ROLE'],
        required: true
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
