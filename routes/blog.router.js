const express=require("express");




const Blogmodel=require("../models/blog.model")
const Authenticate=require("../Middleware/Authentication");




const blogRouter=express.Router();

blogRouter.get("/getallblogs",async(req,res)=>{
 try{
 let todos=await Blogmodel.find();
 res.status(200).send(todos)
 }
 catch{
    res.status(400).send("getting error in blogs")
 }
})

blogRouter.use(Authenticate)
blogRouter.post("/addblog",async(req,res)=>{
    const{title,content,date,category,author,avatar,name,image}=req.body
    try{
  
                const todos=new Blogmodel({title,content,date,category,author,avatar,name,image})
                await todos.save();
                res.status(200).send("post added Succefully")
                console.log(data)
             
      

    }
    catch(err){
            console.log(err)
            res.status(400).send("error in post adding")
    }

})
    



module.exports=blogRouter