const Tour = require('../models/tourModel')
const APIFeatures = require('../utils/APIFeatures');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkId = (req, res, next, val) => {
//   console.log(`Hello from Param MW ${val}`);
//   next();
// };

exports.addReqParametersForTopFive = (req, res, next ) => {
req.query.sort = '-ratingsAverage',
req.query.limit = '5'
next();
}

exports.createTour = async (req, res) => {
 try {
   //console.log(req.body);
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour
    }
  });
} catch (err){
  res.status(400).json({
    status: 'error',
    message: err
  })
} 
};
exports.getAllTours = async (req, res) => {
  try{
  const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
      
  const tours = await features.query;
  res.status(200).json({
    status: 'success',
    result: tours.length,
    tours
  });
}catch(err) {
  res.status(400).json({
    status: 'error',
    description: err.message
  })
}
};
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      tour
    });
  }catch (err) {
    res.status(400).json({
      status: 'error',
      message: "Error occured while getting the required tour from DB"
    })
  }
  
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{runValidators: true});
    res.status(200).json({
      status: 'success',
      tour
    });
  }catch (err) {
    res.status(400).json({
      status: 'error',
      message: "Error occured while updating the required tour in DB"
    })
  }
};
exports.deleteTour =  async (req, res) => {
  try {
   await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success'
    });
  }
  catch(err) {
     res.status(400).json({
      status: 'error',
      message: "Error occured while deleting the required tour in DB"
    })
  }
  
};
