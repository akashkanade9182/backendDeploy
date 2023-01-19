const express=require("express")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const userRouter=express.Router()
const Usermodel=require("../Models/user.model")


userRouter.post("/signup",async(req,res)=>{
    const{email,password}=req.body;
    try{
        let presentuser=await Usermodel.findOne({email});
        if(presentuser){
            res.send("username already exist")
        }else{

            bcrypt.hash(password, 4, async function(err, hash) {
                const user=new Usermodel({email,password:hash})
                await user.save();
                res.send("Singup Succefully")
             
            });

        }
      

    }
    catch(err){
            console.log(err)
            res.send("error in signup")
    }

})
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const presentuser=await Usermodel.find({email});
    if(presentuser.length===0){
        res.send("wrong email")
    }
    const hash_password=presentuser[0].password;
    const userId=presentuser[0]._id;
    try{
        bcrypt.compare(password, hash_password, function(err, result) {
            if(result){
                const token= jwt.sign({ "userId":userId }, 'shhhhh');
                if(token){
                    res.send({"mess":"longin succefull",token:token})
                }else{
                    res.send("error in getting token")
                }

            }else{
                res.send("password or username is wrong")
            }
        });


    }
    catch(err){
console.log(err);
res.send("error in login")

    }
})

module.exports=userRouter