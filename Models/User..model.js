const mongoose=require("mongoose");


const userSchema=mongoose.Schema({
    name:{type:String,require:false},
    age:{type:Number,require:false},
    email:{type:String,require:true},
    password:{type:String,require:true}
})

const Usermodel=mongoose.model("noteusers",userSchema)

module.exports=Usermodel;



