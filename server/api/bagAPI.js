const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
const userModel=require('../model/user')
const middleware=require('../util/middleware')

router.use("/",middleware)

router.post("/add",async function(req,res){
    try {
        let result=await userModel.updateOne({_id:req.user},{  $addToSet: { bag:req.body.product } })
        res.status(200).json({
            status:"success",
            message:"insertion success"
        })
    } catch (error) {
        res.status(500).json({status:"failed"})
        console.log("error",error)
    }  
})



module.exports=router