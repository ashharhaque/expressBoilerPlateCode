const mongoose=require("mongoose");
const bcrypt = require("bcrypt")

const RestaurantsModel=require("./../../../model/restaurant");

const addRestaurantSer=async(req)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const {name,email,password,phoneNumber}=req.body;

            const saltRounds = 10
            const salt=await bcrypt.genSalt(saltRounds)
            const hashedPassword=await bcrypt.hash(password,salt)
  
            const res={};
            res.name=name;
            res.email=email;
            res.password=hashedPassword;
            res.phoneNumber=phoneNumber;
            const restaurant=await new RestaurantsModel(res).save();
            return resolve({
                status:201,
                message:"Successfully created the restaurant",
                data:restaurant
            })

        }catch(err){
            return reject({
                status:500,
                message:err.message,
                data:err
            })
        }
    })
}

module.exports={addRestaurantSer}