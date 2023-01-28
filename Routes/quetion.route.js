const express=require("express");
const { send } = require("process");



const Quetionmodel = require("../Models/quetion.model")

const quetionRouter = express.Router();


quetionRouter.get("/",async(req,res)=>{
    let query=req.query;
    let filter={};
    query.category && (filter.category=query.category);
    query.difficulty&&(filter.difficulty=query.difficulty);
 
    try{
        let result=await Quetionmodel.find(filter).limit(query.quetion)
res.send(result)
    }
    catch(e){
 res.status(300).send("error in getting quetions")
    }

    
})




module.exports=quetionRouter;