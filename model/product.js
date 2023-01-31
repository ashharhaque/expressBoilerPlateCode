const mongoose=require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    storeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurants"
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories"
    },
    price:{
        type:Number,
        required:true
    },
    isAvaliable:{
        type:Boolean,
        default:false
    }
  
},{
    timestamps:true
});

module.exports = mongoose.model('Products', productSchema);