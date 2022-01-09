const mongoose=require("mongoose")
const Schema=mongoose.Schema

const productSchema= new Schema([{
    id : {type:Number, required:true},
    title : {type:String, required:true},
    price : {type:Number, required:true},
    description : {type:String, required:true},
    category : {type:String, required:true},
    image : {type:String, required:true},
    rating: {
        rate: {type:Number, required:true},
        count: {type:Number, required:true}
    }
}])

const productModel=mongoose.model("products",productSchema)

module.exports=productModel