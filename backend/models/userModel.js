const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please Enter Your First Name"],
    },
    lastName: {
        type: String,
        required: [true, "Please Enter Your Last Name"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should have atleast 8 chars"],
        select: false,
    },
    username: {
        type: String,
        unique: true,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});


userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET || 'WFFWf15115U842UGUBWF81EE858UYBY51BGBJ5E51Q', {
        expiresIn: process.env.JWT_EXPIRE || '7d'
    });
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


module.exports = mongoose.model('User', userSchema);