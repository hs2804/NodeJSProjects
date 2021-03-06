const Tour = require('../models/tourModel')
const APIFeatures = require('../utils/APIFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour
    }
  }); 
});
exports.getAllTours = catchAsync(async (req, res,next) => {
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
});

exports.getTour = catchAsync(async (req, res,next) => {
    const tour = await Tour.findById(req.params.id);

    if(!tour){
      return next(new AppError('No Tour Find with the provided ID!', 404));
    }

    res.status(200).json({
      status: 'success',
      tour
    });  
});
exports.updateTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{runValidators: true});
    if(!tour){
      return next(new AppError('No Tour Find with the provided ID!', 404));
    }
    res.status(200).json({
      status: 'success',
      tour
    });
});
exports.deleteTour =  catchAsync(async (req, res, next) => {
  const tour =  await Tour.findByIdAndDelete(req.params.id);
  if(!tour){
    return next(new AppError('No Tour Find with the provided ID!', 404));
  }
    res.status(204).json({
      status: 'success'
    }); 
});
exports.getTourStats = catchAsync(async (req, res) =>{
    const stats = await Tour.aggregate([
       {
         $match : {ratingsAverage : {$gte : 4.5}}
       },
       {
         $group : {
           _id : {$toUpper : '$difficulty'},
           numTours : {$sum: 1 },
           numRatings: {$sum : '$ratingsQuantity'},
           avgRating: { $avg : '$ratingsAverage'},
           avgPrice: { $avg : '$price'},
           minPrice: {$min: '$price'},
           maxPrice: {$max: '$price'}
         }
       },
       {
          $sort : { avgPrice: 1}
       },
       {
        $match : {_id: { $ne : 'EASY'}}
      }
    ]);
    res.status(200).json({
     status: 'success',
     stats
   });
});

exports.getMonthlyPlan = catchAsync(async (req, res ) => {
      const year = req.params.year * 1;
     const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match : {
          startDates : {
            $gte : new Date(`${year}-01-01`),
            $lte : new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group : {
          _id : {$month: '$startDates'},
          numTours : {$sum : 1},
          tours: {$push : '$name'}
        }
      },
      {
        $addFields : {month : '$_id'}
      },
      {
        $project: {
          _id : 0 
        }
      },
      {
        $sort : { numTours : -1}
      },
      {
        $limit : 6
      }

     ]);
    res.status(200).json({
      status: 'success',
      total : plan.length,
      plan
    });
});