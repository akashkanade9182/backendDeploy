const express=require("express")



var Jobmodel= require("../Models/job.model")

const jobRouter = express.Router();



jobRouter.get("/", async (req, res) => {
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
jobRouter.post("/",async(req,res)=>{
  try { let data=req.body;
    data.status=false
    let newjob=new Jobmodel(data);
    await newjob.save()
    res.send(newjob)}
    catch(e){
        res.send("error in data save")
    }
})
jobRouter.patch("/:id",async(req,res)=>{
    let Id=req.params.id
    try { 
      await Jobmodel.findByIdAndUpdate({_id:Id},{status:true})
      
    res.send("update successfully")
     
    }catch(e){
          res.send("error in update save")
      }
  

})













module.exports = jobRouter;