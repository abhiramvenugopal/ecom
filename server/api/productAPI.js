const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
const productModel=require('../model/product')

/*
    API for uploading bulk amount of product details to DataBase
*/
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
/*
    API for getting all product details
*/
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

/*
    API for getting products based on filter condition
*/

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

/*
    API for getting products based on array of product ids
*/

router.post('/products/array',async function(req,res){
    console.log(req.body)
    try{
        let products=await productModel.find({ '_id': { $in: req.body.products } })
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