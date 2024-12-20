const express=require("express")
const router=express.Router();
const User=require("../model/userSchema");

router.get("/register",(req,res)=>{
    console.log("register");
})

module.exports=router;