const express=require("express")



var Applymodel= require("../Models/apply.model")

const applyRouter = express.Router();


applyRouter.post("/",async(req,res)=>{
    try { let data=req.body;
      let newjob=new Applymodel(data);
      await newjob.save()
      res.send(newjob)}
      catch(e){
          res.send("error in apply data save")
      }
  })

  applyRouter.get("/", async (req, res) => {
    const query=req.query;
    let filter={};
    query.location && (filter.location=query.category);
    query.company && (filter.company={$regex:query.company,$options:'i'});
    query.contract && (filter.contract=query.contract)
    try{
     let jobs=await Jobmodel.find(filter);
     res.send(jobs)
    }catch(e){
        console.log(e)
        res.send("error to serach")
    }
    
})

module.exports=applyRouter