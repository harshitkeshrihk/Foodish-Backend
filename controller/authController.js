const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../secrets');
const { sendMail } = require('../utility/nodemailer');
const { use } = require('../Routers/userRouter');

// module.exports.loginUser = async function loginUser(req,res){
//     try{
//         let data = req.body;
//     if(data.email){
//         let user = await userModel.findOne({email:data.email});
//         if(user){
//             if(user.password==data.password){

//                 let uid=user['_id'];
//                 let token = jwt.sign({payload:uid},JWT_KEY);
//                 res.cookie("login",token,{httpOnly:true});

//                 return res.json({
//                     message:"User Logged In!!",
//                     userDetails:user
//                 });
//             }else{
//                return res.json({
//                 message:"Wrong Credentials"
//                });
//             }
//         }else{
//             return res.json({
//                 message:"User Doesn't exist"
//             });
//         }
//     }else{
//         return res.json({
//             message:"User Doesn't exist"
//         });
//     }
//     }catch(err){
//         return res.status(500).json({
//             message:err.message
//         });
//     }
//     }

// module.exports.middleware1 =  function middleware1(req,res,next){
//         console.log("middleware1 encountered");
//         next();
//     }

// module.exports.getSignup = function getSignup(req,res,next){

//         console.log("getSignupCalled");
//         next();
//     }

// module.exports.middleware2 = function middleware2(req,res){
//         console.log("middleware2 encountered");
//         res.sendFile('./public/index.html',{root:__dirname});
//     }

// module.exports.postSignUp = async function postSignUp(req,res){
//         let dataObj = req.body;
//         let user = await userModel.create(dataObj);
//         res.json({
//             message:"user signed up",
//             data:user
//         });
//     }


module.exports.login = async function login(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                if (user.password == data.password) {

                    let uid = user['_id'];
                    let token = jwt.sign({ payload: uid }, JWT_KEY);
                    res.cookie("login", token, { httpOnly: true });

                    return res.json({
                        message: "User Logged In!!",
                        userDetails: user
                    });
                } else {
                    return res.json({
                        message: "Wrong Credentials"
                    });
                }
            } else {
                return res.json({
                    message: "User Doesn't exist"
                });
            }
        } else {
            return res.json({
                message: "User Doesn't exist"
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

module.exports.signup = async function signup(req, res) {
    try {
        let dataObj = req.body;
        let user = await userModel.create(dataObj);
        //mail sent
        sendMail("signup",user);                     //to send email when user signs up 
        if (user) {
            return res.json({
                message: "user signed up",
                data: user
            });
        } else {
            return res.json({
                message: "error while signing up"
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

module.exports.isAuthorised = function isAuthorised(roles) {
    return function(req,res,next){
        if (roles.includes(req.role) == true) {
            next();
        } else {
            return res.status(401).json({
                message: "operation not allowed"
            });
        }
    }
}

module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
        let token;
        if (req.cookies.login) {
            token = req.cookies.login;
            let payload = jwt.verify(token, JWT_KEY);   //finding user with the help of payload-- so that we can access req.id and req.role later in the next function call
            if (payload) {
                const user = await userModel.findById(payload.payload);   //got the user now set req.role and req.id
                req.role = user.role;
                req.id = user.id
                next();
            } else {
                return res.json({
                    message: "user not verified"
                });
            }
        } else {
            const client = req.get('User-Agent');
            if(client.includes("Mozilla")==true){
                return res.direct('/login');
            }else{
                return res.json({
                    message: "please login again"
                });
            }
        }
    } catch (err) {
        return res.json({
            message: err.message
        });
    }
}

module.exports.forgetPassword = async function forgetPassword(req,res){
    let {email} = req.body;
    try {
        const user = await userModel.findOne({email:email});
        if(user){
            const resetToken = user.createResetToken();
            let resetPasswordLink =`${req.protocol}://${req.get('host')}/user/resetPassword/${resetToken}`
            //sendEmail  when user wants to resetPassword
            let obj ={
                resetPasswordLink:resetPasswordLink,
                email:email
            }
            sendMail("resetpassword",obj);
            // await user.save();
            return res.json({
               message:"mail sent successfully"
            });
        }else{
            res.json({
                message:"please signup"
            });
        }
    } catch (err) {
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports.resetPassword = async function resetPassword(req,res){
    try {
        let token = req.params.token;
        let {password,confirmPassword} = req.body;
        console.log(password,confirmPassword);
        //fetched with the help of token saved while forgetpassword logic
        const user = await userModel.findOne({resetToken:token});
        console.log(user);
        if(user){
          //will update user in db
        user.resetPasswordHandler(password,confirmPassword);
        //save the document
        await user.save();
        res.json({
            message:"password reset successfully"
        });
        }else{
        res.json({
            message:"user not found"
        });
        }
    } catch (err) {
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports.logout = function logout(req,res){
    res.cookie('login',' ',{maxAge:1});
    res.json({
      message:"user logged out successfully"
    });
}


