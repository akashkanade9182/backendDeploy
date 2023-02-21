const mongoose=require("mongoose")


const blogSchema=mongoose.Schema({
   
    title: {type:String,require:true},
    image: {type:String,require:true},
    category:{type:String,require:true},
     date:{type:String,require:true},
    content:{type:String,require:true},
    author: { type: String, require:true},
   avatar: { type: String, require:true},
   name: { type: String, require:true},
 
  
  

   
   
 
})

const Blogmodel=mongoose.model("post",blogSchema);

module.exports=Blogmodel;