const express=require("express");
const mongoose=require("mongoose");
const app=express();
const cors=require("cors")
var bodyParser = require('body-parser')
const productAPI=require('./api/productAPI')
const userAPI=require('./api/userAPI')
const wishlistAPI=require('./api/wishlistAPI')
const bagAPI=require('./api/bagAPI')

app.use(cors())

const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.DB)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())



app.use("/api/v1/product",productAPI);
app.use("/api/v1/user",userAPI);
app.use("/api/v1/wishlist",wishlistAPI);
app.use("/api/v1/bag",bagAPI);


const PORT=process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log("server started at port : " +PORT)
})
