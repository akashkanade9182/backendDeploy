const mongoose=require("mongoose")


const applySchema=mongoose.Schema({
   company:{type:String,require:true},
   position :{type:String,require:true},
   contract: {type:String,require:true},
   location:{type:String,require:true}
    
})

const Applymodel=mongoose.model("applys",applySchema);

module.exports=Applymodel;