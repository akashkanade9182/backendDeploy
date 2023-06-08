const express = require("express");
const Projectmodel = require("../Models/Project.model");


const ProjectRoute = express.Router();

ProjectRoute.get("/getall",async(req,res)=>{
     const page = parseInt(req.query.page) || 1;
     try{
          const totalCount = await Projectmodel.countDocuments();
          const totalPages = Math.ceil(totalCount / 10); 
        const data=await Projectmodel.find().skip((page - 1) * 5)
        .limit(5);
       return res.status(200).send({data,totalCount, currentPage: page,totalPages});
      }
     catch{
          res.status(400).send("error in getting projects")
     }
})




ProjectRoute.post("/add",async(req,res)=>{
     const {title,reason,type,division,category,priority,department,location,startDate,endDate}=req.body
     try{
         
          const data=new Projectmodel({title,
               reason,type,division,
               category,priority,department,
               startDate,endDate,location,
               status:"Registered"});
       await data.save()

         return res.status(200).send("project added successfully")
     }
     catch(err){
          console.log(err)
         return res.status(400).send("error in project adding")
     }
})

ProjectRoute.patch("/update/:id",async(req,res)=>{
     const Id=req.params.id;
     const page=req.query.page ||1;
     const limit=req.query.limit || 5;
     let sortQuery={}
     req.query.sort==="deparment" && (sortQuery={department:1});
     req.query.sort==="location" && (sortQuery={location:1});
     req.query.sort==="priority" && (sortQuery={priority:1});
     req.query.sort==="title" && (sortQuery={title:1});
     req.query.sort==="category" && (sortQuery={category:1});
     req.query.sort==="reason" && (sortQuery={reason:1});
     req.query.sort==="type" && (sortQuery={type:1});
      req.query.sort==="division" && (sortQuery={division:1});
console.log(sortQuery)



     const searchQuery=req.query.searchtext || "";

     
     try{
          await Projectmodel.findByIdAndUpdate({_id:Id},req.body);
          const query = {
               $or: [
                 { title: { $regex: searchQuery, $options: 'i' } },
                 { reason: { $regex: searchQuery, $options: 'i' } },
                 { type: { $regex: searchQuery, $options: 'i' } },
                 { division: { $regex: searchQuery, $options: 'i' } },
                 { category: { $regex: searchQuery, $options: 'i' } },
                 { priority: { $regex: searchQuery, $options: 'i' } },
                 { department: { $regex: searchQuery, $options: 'i' } },
                 { location: { $regex: searchQuery, $options: 'i' } },
                 { status: { $regex: searchQuery, $options: 'i' } },
               ]
             };
             const totalCount = await Projectmodel.countDocuments(query);
             const totalPages = Math.ceil(totalCount / limit);
             
            
             const results = await Projectmodel.find(query)
             .sort(sortQuery) 
             .skip((page - 1) * limit)
             .limit(limit);
     
             res.status(200).send({data:results,totalCount, currentPage: page,totalPages})

     }
     catch(err){
          console.log(err)
          res.status(400).send("error in getting update")

     }
})

ProjectRoute.get("/search",async(req,res)=>{
     const page = parseInt(req.query.page) || 1;
     const limit = parseInt(req.query.limit) || 10; 
     let sortQuery={}
     req.query.sort==="deparment" && (sortQuery={department:1});
     req.query.sort==="location" && (sortQuery={location:1});
     req.query.sort==="priority" && (sortQuery={priority:1});
     req.query.sort==="title" && (sortQuery={title:1});
     req.query.sort==="category" && (sortQuery={category:1});
     req.query.sort==="reason" && (sortQuery={reason:1});
     req.query.sort==="type" && (sortQuery={type:1});
      req.query.sort==="division" && (sortQuery={division:1});
console.log(sortQuery)



     const searchQuery=req.query.searchtext || "";
     console.log({searchQuery,sortQuery})
     try{
  
     const query = {
          $or: [
            { title: { $regex: searchQuery, $options: 'i' } },
            { reason: { $regex: searchQuery, $options: 'i' } },
            { type: { $regex: searchQuery, $options: 'i' } },
            { division: { $regex: searchQuery, $options: 'i' } },
            { category: { $regex: searchQuery, $options: 'i' } },
            { priority: { $regex: searchQuery, $options: 'i' } },
            { department: { $regex: searchQuery, $options: 'i' } },
            { location: { $regex: searchQuery, $options: 'i' } },
            { status: { $regex: searchQuery, $options: 'i' } },
          ]
        };
        const totalCount = await Projectmodel.countDocuments(query);
        const totalPages = Math.ceil(totalCount / limit);
        
        const results = await Projectmodel.find(query)
        .sort(sortQuery) 
        .skip((page - 1) * limit)
        .limit(limit);

        res.status(200).send({data:results, currentPage: page,totalCount,totalPages})
    
   
         
      }
     catch(err){
          console.log(err);
          res.status(400).send("error in getting search result")
     }


})


ProjectRoute.get("/sorting",async(req,res)=>{
     const page = parseInt(req.query.page) || 1;
     const limit = parseInt(req.query.limit) || 10; 
     let sortQuery={}
     req.query.sort==="deparment" && (sortQuery={department:1});
     req.query.sort==="location" && (sortQuery={location:1});
     req.query.sort==="priority" && (sortQuery={priority:1});
     req.query.sort==="title" && (sortQuery={title:1});
     req.query.sort==="category" && (sortQuery={category:1});
     req.query.sort==="reason" && (sortQuery={reason:1});
console.log(sortQuery)
     try{
  
        const totalCount = await Projectmodel.countDocuments();
        const totalPages = Math.ceil(totalCount / limit);
        
       
        const results = await Projectmodel.find()
        .sort(sortQuery) 
        .skip((page - 1) * limit)
        .limit(limit);

        res.status(200).send({data:results, currentPage: page,totalCount,totalPages})
    
   
         
      }
     catch(err){
          console.log(err);
          res.status(400).send("error in sorting result")
     }


})

ProjectRoute.get("/dashboard",async(req,res)=>{
try{
let data={};
data.totalProject=await Projectmodel.countDocuments();
data.closeProject=await Projectmodel.countDocuments({status:"Close"});
data.runningProject=await Projectmodel.countDocuments({status:"Start"});
data.cancelProject=await Projectmodel.countDocuments({status:"Cancel"});
var currentDate = new Date();
data.delayProject=await Projectmodel.countDocuments({ endDate: { $lt: currentDate } });
let datasetOne=[];
datasetOne[0]=await Projectmodel.countDocuments({department:"Quality"});
datasetOne[1]=await Projectmodel.countDocuments({department:"Maintenace"});
datasetOne[2]=await Projectmodel.countDocuments({department:"Stores"});
datasetOne[3]=await Projectmodel.countDocuments({department:"Hr"});
datasetOne[4]=await Projectmodel.countDocuments({department:"Finance"});
datasetOne[5]=await Projectmodel.countDocuments({department:"Strategy"});
let datasetTwo=[];
datasetTwo[0]=await Projectmodel.countDocuments({department:"Quality",status:"Close"});
datasetTwo[1]=await Projectmodel.countDocuments({department:"Maintenace",status:"Close"});
datasetTwo[2]=await Projectmodel.countDocuments({department:"Stores",status:"Close"});
datasetTwo[3]=await Projectmodel.countDocuments({department:"Hr",status:"Close"});
datasetTwo[4]=await Projectmodel.countDocuments({department:"Finance",status:"Close"});
datasetTwo[5]=await Projectmodel.countDocuments({department:"Strategy",status:"Close"});

res.status(200).send({data,datasetOne,datasetTwo})

}
catch(err){
console.log(err)
     res.status(400).send("error in getting chat data")

}


})

 


module.exports=ProjectRoute;