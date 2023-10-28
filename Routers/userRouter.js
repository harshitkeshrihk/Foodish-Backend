const express = require("express");
const userRouter = express.Router();
// const protectRoute = require('./authHelper'); 
// const {getUsers,postUser,updateUser,deleteUser,getUserById} = require('../controller/userController'); 
const {getUser,getAllUser,updateUser,deleteUser,updateProfileImage} = require('../controller/userController')
const {signup,login,protectRoute,isAuthorised, forgetPassword, resetPassword, logout} = require('../controller/authController');
const multer = require("multer");

// userRouter
//    .route("/")
//    .get(protectRoute,getUsers)
//    .post(postUser)
//    .patch(updateUser)
//    .delete(deleteUser);

// userRouter
//    .route("/getCookies")
//    .get(getCookies);

// userRouter
//     .route("/setCookies")
//     .get(setCookies);


// userRouter.route("/:id").get(getUserById);


userRouter
   .route('/:id')
   .patch(updateUser)
   .delete(deleteUser)


userRouter
   .route('/signup')
   .post(signup)

userRouter
   .route('/login')
   .post(login)   

userRouter
   .route('/forgetPassword')
   .post(forgetPassword)  

userRouter
   .route('/logout')
   .get(logout)

userRouter
   .route('/resetPassword/:token')
   .post(resetPassword)  


const multerStorage = multer.diskStorage({
   destination: function(req,file,cb){
       cb(null,'public/images')
   },
   filename: function(req,file,cb){
      cb(null,`user-${Date.now()}.jpeg`)
   }
});

const filter = function(req,file,cb){
   if(file.mimetype.startsWith("image")){
      cb(null,true)
   }else{
      cb(new Error("Not an Image! Please upload an image"),false)
   }
}

const upload = multer({
   storage: multerStorage,
   fileFilter: filter
});

userRouter.get('/ProfileImage', (req,res)=>{
   const filePath = "C:\\Users\\Asus\\Desktop\\FoodAppBackend\\multer.html";
   res.sendFile(filePath);
});

userRouter.post('/ProfileImage', upload.single('photo') , updateProfileImage);



userRouter.use(protectRoute);
userRouter
    .route('/userProfile')
    .get(getUser)

userRouter.use(isAuthorised(['admin']));
userRouter
   .route('/')
   .get(getAllUser)
    
module.exports = userRouter;