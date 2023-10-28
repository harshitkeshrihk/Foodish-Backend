const express = require("express");
const app = express();
const userModel = require('./models/userModel');
const planModel = require('./models/planModel');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());


const  userRouter = require('./Routers/userRouter');
app.use("/user",userRouter);

const planRouter = require("./Routers/planRouter");
app.use("/plans",planRouter);

const reviewRouter = require("./Routers/reviewRouter");
app.use("/review",reviewRouter);

const bookingRouter = require("./Routers/bookingRouter");
app.use("/booking",bookingRouter);

// const  authRouter = require('./Routers/authRouter');
// app.use("/auth",authRouter);

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});

