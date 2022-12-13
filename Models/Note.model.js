const mongoose=require("mongoose");


const noteSchema=mongoose.Schema({
    title:{type:String,require:false},
    userId:String,
    Content:{type:String,require:false},
    Tags:{type:String,require:false}
})

const Notemodel=mongoose.model("notes",noteSchema)

module.exports=Notemodel;