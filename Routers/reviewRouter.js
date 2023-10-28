const express = require("express");
const reviewRouter = express.Router();
const {protectRoute, isAuthorised} = require('../controller/authController');
const { top3Reviews, getPlanReviews , getAllReviews, createReview, updateReview , deleteReview} = require("../controller/reviewController");

reviewRouter
   .route('/all')
   .get(getAllReviews);

reviewRouter
  .route('/top3')
  .get(top3Reviews);

reviewRouter
  .route('/:id')
  .get(getPlanReviews);
 
reviewRouter.use(protectRoute);
reviewRouter
  .route('/crud/:plan')
  .post(createReview)
  .patch(updateReview)
  .delete(deleteReview);


// reviewRouter
//   .route('crud/:id')

 
module.exports = reviewRouter