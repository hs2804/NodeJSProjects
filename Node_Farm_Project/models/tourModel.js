const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required:[true, 'Name of the tour is missing'],
      trim : true
    },
    ratingsAverage: {
      type: Number,
      default: 4.5
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: String,
      required : [true, 'Price of a Tour is missing']
    },
    duration: {
      type: Number,
      required : [true, 'A Tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required : [true, 'A Tour must have a Group Size']
    },
    difficulty: {
      type: String,
      required : [true, 'A Tour must have a Difficulty']
    },
    description : {
      type: String,
      required : [true, 'A Tour must have a Description']
    },
    price: {
      type: Number,
      required : [true, 'A Tour must have a price']
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required : [true, 'A Tour must have a summary']
    },
    imageCover: {
      type: String,
      required : [true, 'A Tour must have a cover Image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date]

  });
  
const Tour = mongoose.model('Tour',tourSchema);
module.exports = Tour;