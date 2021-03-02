const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>', process.env.DATABASE_PASSWORD
)
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology:true
}).then(() => {
  console.log('DB Connection Successfull!');
});

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
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: String,
    required : [true, 'Price of a Tour is missing']
  }
});

const Tour = mongoose.model('Tour',tourSchema);
const testTour = new Tour({
  name: 'The Forest Hikers',
  price: '$450',
  description: 'This tour is for forest hikers',
  rating: 4.9
});
testTour.save().then((doc) => {
  console.log('Successfully Created a document in Collection')
}).catch((err) => {
  console.log("Error: ====== " + err);
})

//console.log(process.env);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server has been started!');
});
