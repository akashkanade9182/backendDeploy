const mongoose=require("mongoose");

const projectSchema=mongoose.Schema({
     title: { type: String},
     reason: { type: String},
     type: { type: String},
     division: { type: String},
     category: { type: String},
     priority: { type: String},
     department: { type: String},
     location: { type: String},
     status: { type: String},
     startDate: { type: String},
     endDate: { type: String},
})

const Projectmodel=mongoose.model("projectlist",projectSchema);


module.exports=Projectmodel;
