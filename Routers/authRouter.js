const express = require("express");
const authRouter = express.Router();
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../secrets')
// const {middleware1,middleware2,getSignup,postSignUp,loginUser} = require('../controller/authController')


// authRouter
//    .route('/signup')
//    .get(middleware1,getSignup,middleware2)
//    .post(postSignUp);

// authRouter
//     .route('/login')
//     .post(loginUser);

//    module.exports = authRouter;
