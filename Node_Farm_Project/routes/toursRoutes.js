const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');

//router.param('id', tourController.checkId);
router.route('/stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router.
      route('/top-5-tour')
      .get(tourController.addReqParametersForTopFive
           , tourController.getAllTours);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
