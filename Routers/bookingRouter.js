const express = require("express");
const { createSession } = require("../controller/bookingController");
const {protectRoute} = require('../controller/authController');

const bookingRouter = express.Router();


bookingRouter.post('/createSession',protectRoute,createSession)

bookingRouter.get('/createSession', function (req, res) {
    const filePath = "C:\\Users\\Asus\\Desktop\\FoodAppBackend\\booking.html";
    res.sendFile(filePath);
  });

module.exports = bookingRouter;
