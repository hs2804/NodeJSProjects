const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        unique: true,
        required:[true, 'Name of the tour is missing']
    },
    email : {
        type: String,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail,'Enter a valid Email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please enter the password'],
        minlength: 8
    },
    passwordConfirm:{
        type: String,
        required: [true, 'Please confirm the password']
    }
});

const User = mongoose.model('User', userSchema);

module.exports= User;