const mongoose = require("mongoose");


const db_link = "mongodb+srv://admin:dHPw9bVjdHXEKVo8@cluster0.ccbyfxs.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";
mongoose.connect(db_link).then(function(db){
  console.log('Plan db connected');
})
.catch(function(err){
  console.log(err);
});

const planSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxLength:[20,'plan name should not exceed more than 20 characters']
    },
    duration:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:[true,'price not entered']
    },
    ratingsAverage:{
        type:Number
    },
    discount:{
        type:Number,
        validate:[function(){
            return this.discount<100
        },'discount should not exceed price']
    },
    // noOfRating:{
    //     type:Number,
    //     default:0
    // }
});



// (async function createPlan(){
//    let planObj = {
//     name:'SuperFood1',
//     duration:30,
//     price:1000,
//     ratingsAverage:5,
//     discount:20
//    }
//    let data = await planModel.create(planObj);
//    console.log(data);
// })();

const planModel = mongoose.model('planModel',planSchema);
module.exports = planModel



