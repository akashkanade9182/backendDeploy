const express=require("express");

const Companymodel=require("../Models/Company.model")

const companyRoute=express.Router();

companyRoute.get("/:id",async(req,res)=>{
const Id=req.params.id;
try{
     const data=await Companymodel.find({id:Number(Id)})
     res.status(200).send(data);
}
catch{
     res.status(400).send("error in getting company")

}
})



module.exports=companyRoute;