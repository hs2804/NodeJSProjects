const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  console.log(`Hello from Param MW ${val}`);
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    tours,
  });
};
exports.getTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: `Received GET request for ${req.params.id}`,
  });
};
exports.createTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: `Received POST request for ${req.params.id}`,
  });
};
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: `Received PATCH request for ${req.params.id}`,
  });
};
exports.deleteTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    result: `Received DELETE request for ${req.params.id}`,
  });
};
