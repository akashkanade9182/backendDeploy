const express=require("express")
const mogoose=require("mongoose");
const bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');

const Usermodel = require("../Models/User..model");



const UserRouter=express.Router();

UserRouter.post("/signup",async(req,res)=>{
    const {email,password,name ,age}=req.body;
    const Presentuser=await Usermodel.findOne({email});
    if(Presentuser){
      res.send("username already exist,try another user name")
    }
    try{
         
            bcrypt.hash(password, 5, async function(err, hash) {
                const user=new Usermodel({email,password:hash,name,age})
                await user.save();
                res.send("signup successfully")
            });

          
    }
    catch(err){
        console.log(err)
        res.send(" error in sign up ,try again later");
    }

})


UserRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body;
    try{
        const checkusers=await Usermodel.find({email});
        if(checkusers.length>0){
           const hash_password=checkusers[0].password;
          
           bcrypt.compare(password, hash_password).then(function(result) {
            if(result){
                const token = jwt.sign({ "userId":checkusers[0]._id }, 'hush');
                res.send({"msg":"Login successfull","token" : token})
            }else{
                res.send("Login failed")
            }
        });

        }

    }
    catch(err){
        console.log(err);
        res.send("login failed ,try again later");
    }
   

});


module.exports=UserRouter



