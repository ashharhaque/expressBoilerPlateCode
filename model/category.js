const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    storeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurants"
    },
    isAvailable:{
        type:Boolean,
        default:false
    }
  
},{
    timestamps:true
});

module.exports = mongoose.model('Categories', categorySchema);
