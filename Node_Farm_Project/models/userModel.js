const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        minlength: 8,
        select: false
    },
    passwordConfirm:{
        type: String,
        required: [true, 'Please confirm the password'],
        validate:{
            validator: function(el) {
                return el === this.password
            },
            message: "Confirm Password doesn't match with Password"
        }
    }
});

userSchema.pre('save', async function(next){

  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

//Instance Method to compare password
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
  return await bcrypt.compare(candidatePassword, userPassword);

}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
  
      return JWTTimestamp < changedTimestamp;
    }
  
    // False means NOT changed
    return false;
  };
const User = mongoose.model('User', userSchema);

module.exports= User;