const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
const productModel=require('../model/product')


router.post("/createmany",async function(req,res){
    try {
        await productModel.insertMany(req.body)
        res.status(200).json({
            status:"success",
            message:"insertion success"
        })
    } catch (error) {
        res.status(500).json({status:"failed"})
        console.log("error",error)
    }  
})

router.get('/products',async function(req,res){
    try{
        let products=await productModel.find({})
        res.status(200).json({status:"success",products})
    }
    catch(err){
        res.status(500).json({
            status:"failed",
            message:err
        })
    }
})
router.post('/filter',async function(req,res){
    console.log("hello")
    try{
        let products=await productModel.find({...req.body})
        console.log(products)
        res.status(200).json({status:"success",products})
    }
    catch(err){
        res.status(500).json({
            status:"failed",
            message:err
        })
    }
})


module.exports=router