const mongoose=require("mongoose")


const jobSchema=mongoose.Schema({
   company:{type:String,require:true},
   position :{type:String,require:true},
   contract: {type:String,require:true},
   location:{type:String,require:true},
   status:{type:Boolean,require}
   
    
})

const Jobmodel=mongoose.model("jobs",jobSchema);

module.exports=Jobmodel;