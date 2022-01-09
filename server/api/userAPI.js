const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
const bcrypt=require('bcrypt')
const jwt =require("jsonwebtoken");
const userModel=require('../model/user')


router.post('/signin',(req,res)=>{
    const {username,password}=req.body
    console.log(req.body)
    if(!username || !password){
        return res.status(422).json({error:"please add email or password"})
    }
    userModel.findOne({  email:username  })
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"user not found"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token =jwt.sign({data:savedUser._id},process.env.JWT_SECRET)
                res.json({status:"success",token:token,user:{email:savedUser.email,bag:savedUser.bag,_id:savedUser._id,wishlist:savedUser.wishlist,pincode:savedUser.pincode,}})
            }
            else{
                return res.status(422).json({error:"password is wrong"})
            }
        })
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post("/register",async function(req,res){
    console.log(req.body)
    let reqObject={...req.body}
    console.log(reqObject)
    try {
        bcrypt.hash(reqObject.password, 10,async function(err, hash) {
            if(err){
                res.status(500).json({status:"Encryption failed"})
            }
            reqObject.password=hash
            await userModel.create(reqObject)
            res.status(200).json({
                status:"success",
                message:"register success"
            })
            
        });
    } catch (error) {
        res.status(500).json({status:"failed"})
        console.log("error",error)
        
    }
    
    
})

module.exports=router