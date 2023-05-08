const express=require("express");

const Addsmodel=require("../Models/Adds.model")

const addsRoute=express.Router();

// addsRoute.get("/:keyword",async(req,res)=>{
     
// const keyword=req.params.keyword
// console.log(keyword)
// await Addsmodel.aggregate([
    
//      {
//        $match: {
//          $or: [
//            { name: { $regex: keyword, $options: 'i' } },
//            { primaryText: { $regex: keyword, $options: 'i' } },
//            { headline: { $regex: keyword, $options: 'i' } },
//            { description: { $regex: keyword, $options: 'i' } },
//          ]
//        }
//      }], (err, result) => {
//           if (err) {
//             console.error('Error searching for ads:', err);
//             res.status(500).json({ error: 'Error searching for ads' });
//           } else {
//             res.json(result);
//           }
//      });



// })


addsRoute.get('/search/:keyword',async  (req, res) => {
     const keyword = req.params.keyword;
     const result =await  Addsmodel.aggregate([
     //   {
     //     $project: {
     //       _id: 0,
     //      name: 1,
     //       primaryText: 1,
     //       headline: 1,
     //       description: 1,
     //     }
     //   },
       {
         $match: {
           $or: [
             { name: { $regex: keyword, $options: 'i' } },
             { primaryText: { $regex: keyword, $options: 'i' } },
             { headline: { $regex: keyword, $options: 'i' } },
             { description: { $regex: keyword, $options: 'i' } },
           ]
         }
       }
     //   {
     //     $unwind: {
     //       path: '$name',
     //       preserveNullAndEmptyArrays: true
     //     }
     //   },
     //   {
     //     $unwind: {
     //       path: '$primaryText',
     //       preserveNullAndEmptyArrays: true
     //     }
     //   },
     //   {
     //     $unwind: {
     //       path: '$headline',
     //       preserveNullAndEmptyArrays: true
     //     }
     //   },
     //   {
     //     $unwind: {
     //       path: '$description',
     //       preserveNullAndEmptyArrays: true
     //     }
     //   }
     ])
     res.send(result)
   });

   addsRoute.get("/getall",async(req,res)=>{
    try{
     let result=await Addsmodel.find();
     res.status(200).send(result)
    }
    catch{
      res.status(400).send("error in getting all ads")
    }
   })


module.exports=addsRoute;