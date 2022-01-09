const mongoose=require("mongoose")
const Schema=mongoose.Schema

const userSchema= new Schema({
    email:{type:String, required:true,unique:true},
    pincode : {type:Number, required:true},
    password:{type :String, required:true},
    bag: [mongoose.Types.ObjectId],
    wishlist: [mongoose.Types.ObjectId]
})

const userModel=mongoose.model("users",userSchema)

module.exports=userModel


    