const express = require("express")

const Coursemodel=require("../Models/Course.model")

const CourseRoute=express.Router();

CourseRoute.get("/getdata",async(req,res)=>{
     try {
          let post = await Coursemodel.find();
          res.status(200).send(post)
      }
      catch {
          res.status(400).send("error in getting posts")
      }
})

CourseRoute.post("/postdata",async(req,res)=>{
     const { name,  lessons,startDate,duration } = req.body;
     if (!name||!lessons ||!startDate ||!duration) {
         res.status(422).json({ error: "Please add all the fields" })
     }
 
     const post = new Coursemodel({
     name,lessons,startDate,duration
     })
     post.save().then((result) => {
         return res.json("post added successfully")
     }).catch(err =>{
          return res.status(400).json("post added successfully")
     })
})
module.exports=CourseRoute;