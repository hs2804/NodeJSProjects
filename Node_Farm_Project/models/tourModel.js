const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required:[true, 'Name of the tour is missing']
    },
    description : {
      type: String,
      required : [true, 'Description of a Tour is missing!']
    },
    price: {
      type: String,
      required : [true, 'Price of a Tour is missing']
    },
    difficulty: {
      type: String
    },
    rating: {
      type: Number,
      default: 4.5
    }
  });
  
const Tour = mongoose.model('Tour',tourSchema);
module.exports = Tour;