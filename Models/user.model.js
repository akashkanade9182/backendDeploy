const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
   name:{type:String,require:true},
   category: {type:String,require:true},
   difficulty: {type:String,require:true},
   quetion:{type:Number,require:true},
 
    
})

const Usermodel=mongoose.model("users",userSchema);

module.exports=Usermodel;