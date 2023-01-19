const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
   
   email: {type:String,require:true},
   password: {type:String,require:true},
    
})

const Usermodel=mongoose.model("users",userSchema);

module.exports=Usermodel;


