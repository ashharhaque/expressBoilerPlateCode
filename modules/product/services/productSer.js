const mongoose=require("mongoose");

const addProductSer=async(req)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            console.log("inside add produt servicess--->",req.body);
            return resolve({
                status:201,
                message:"Successully created the product",
                data:{
                    data:req.body
                }
            })
        }catch(err){
            console.log("inside add product error--->",err.message);
            reject({
                status:500,
                message:"Internal Server Errror",
                data:{}
            })
        }
    })
}

module.exports={addProductSer}