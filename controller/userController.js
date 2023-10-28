const userModel = require("../models/userModel");


// module.exports.postUser = function postUser(req,res){
//     console.log(req.body);
//     users = req.body;
//     res.json({
//         message:"data received successfully",
//         user: req.body,
//     });
// }

// module.exports.getUsers = async function getUsers(req,res){
//     let allUsers = await userModel.find();
//     res.json({message:'list of all users',
//      data:allUsers});
// }

// module.exports.updateUser = async function updateUser(req,res){
// let dataToBeUpdated = req.body;
// let users = await userModel.findOneAndUpdate({email:'harsh123@gmail.com'},dataToBeUpdated);
// res.json({
//     message:"data updated successfully",
//     data:users
// });
// }

// module.exports.deleteUser = async function deleteUser(req,res){
//     let dataToBeDeleted = req.body;
//     let user = await userModel.findOneAndDelete(dataToBeDeleted);
//     res.json({
//         message:"data has been deleted",
//         data: user
//     });
// }


// module.exports.getUserById = function getUserById(req,res){
//     console.log(req.params.username);
//     console.log(req.params);
//     res.send("user id received");
// }

// function setCookies(req,res){
//     res.cookie('isLogggedIn',true,{maxAge:1000*60*60*24,secure:true,httpOnly: true});
//     res.send("Cookies has been set up");
// }

// function getCookies(req,res){
//     let cookies = req.cookies;
//     console.log(cookies);
//     res.send("cookies received");
// }

module.exports.getUser = async function getUser(req,res){
    let id=req.id;
    let user = await userModel.findById(id);
    if(user){
       return res.json(user);
    }else{
       return res.json({
            message:"user not found"
        });
    }
}

module.exports.getAllUser = async function getAllUser(req,res){
    let users = await userModel.find();
    if(users){
     return res.json({message:'list of all users',
     data:users});
    }else{
       return  res.json({
            message:"user not found"
        });
    }
}

module.exports.updateUser = async function updateUser(req,res){
try{
    let id=req.params.id;
    let user = await userModel.findById(id);
    let dataToBeUpdated = req.body;
    if(user){
        const keys = [];
        for(let key in dataToBeUpdated){
            keys.push(key);
        }

        for(i=0;i<keys.length;i++){
           user[keys[i]] = dataToBeUpdated[keys[i]];
        }

        const updatedData = await user.save();
        return res.json({
            message:"data updated successfully",
            data:updatedData
        });
    }else{
        return res.json({
            message:"user not found"
        });
    }
}catch(err){
    return res.json({
        message:err.message
    });
}
}

module.exports.deleteUser = async function deleteUser(req,res){
try{
    let id = req.params.id;
    let user = await userModel.findByIdAndDelete(id);
    return res.json({
        message:"data has been deleted",
        data: user
    });
}catch(err){
    return res.json({
            message:err.message
        });
    }
}

module.exports.updateProfileImage = function updateProfileImage(req,res){
    return res.json({
      message:'file uploaded successfully'
    });
}

