const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        unique:true,
        required:true
    },
    address:{
        street:{
            type:String
        },
        city:{
            type:String
        },
        state:{
            type:String
        },
        country:{
            type:String
        },
        pinCode:{
            type:String
        }
    }
  
},{
    timestamps:true
});

module.exports = mongoose.model('Restaurants', restaurantSchema);
