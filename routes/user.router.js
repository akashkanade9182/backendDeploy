const express=require("express")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const bloguserRouter=express.Router()
const Usermodel=require("../models/user.model")


bloguserRouter.post("/signup",async(req,res)=>{
    const{name,avatar,email,password}=req.body;
    try{
        let presentuser=await Usermodel.findOne({email});
        if(presentuser){
            res.send("username already exist")
        }else{

            bcrypt.hash(password, 4, async function(err, hash) {
                const user=new Usermodel({email,password:hash,name,avatar})
                await user.save();
                res.status(200).send("Singup Succefully")
             
            });

        }
      

    }
    catch(err){
            console.log(err)
            res.status(400).send("error in signup")
    }

})
bloguserRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const presentuser=await Usermodel.find({email});
    if(presentuser.length===0){
        res.status(400).send("wrong email")
    }
    const hash_password=presentuser[0].password;
    const userId=presentuser[0]._id;
    const {name,avatar}=presentuser[0]
    try{
        bcrypt.compare(password, hash_password, function(err, result) {
            if(result){
                const token= jwt.sign({ "userId":userId,"name":name,"avatar":avatar }, 'shh');
                if(token){
                    res.status(200).send({"mess":"longin succefull",token:token,user:{email:presentuser[0].email,name,avatar,id:presentuser[0]._id}})
                }else{
                    res.status(400).send("error in getting token")
                }

            }else{
                res.status(400).send("password or username is wrong")
            }
        });


    }
    catch(err){
console.log(err);
res.status(400).send("error in login")

    }
})

module.exports=bloguserRouter