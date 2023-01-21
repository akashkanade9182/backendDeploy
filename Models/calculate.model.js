const mongoose=require("mongoose")


const calSchema=mongoose.Schema({
   amount:{type:Number,require:true},
   intrest: {type:Number,require:true},
   year: {type:Number,require:true},
    
})

const Calmodel=mongoose.model("calci",calSchema);

module.exports=Calmodel;