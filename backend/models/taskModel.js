const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your First Name"],
    },
    category: {
        type: String,
        required: [true, "Please Enter Your Last Name"],
    },
    status: {
        type: String,
        required: [true, "Please Enter Your Email"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});


module.exports = mongoose.model('Task', userSchema);