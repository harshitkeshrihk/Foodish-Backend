const express = require("express");
const planRouter = express.Router();
const {protectRoute, isAuthorised} = require('../controller/authController');
const {getAllPlans,getPlan,createPlan,updatePlan,deletePlan, top3Plans} = require('../controller/planController');

//all plans leke ayega
planRouter
    .route('/allPlans')
    .get(getAllPlans)


//own plan -- > logged in necessary hence protect route is used
planRouter.use(protectRoute)
planRouter
    .route('/plan/:id')
    .get(getPlan)


//here it is automatically checked whether logged in or not as because of above check
//admin and restaurnt owner can only create update and delete plans
planRouter.use(isAuthorised(['admin','restaurantowner']));
planRouter
    .route('/crudPlan')
    .post(createPlan)

planRouter
    .route('/crudPlan/:id')
    .patch(updatePlan)
    .delete(deletePlan)

planRouter
    .route('/top3')
    .get(top3Plans)


module.exports = planRouter;
