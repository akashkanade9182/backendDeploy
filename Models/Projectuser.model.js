const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const projectuserSchema=mongoose.Schema({
     email: {
          type: String,
          required: true,
      },
     password: {
          type: String,
          required: true
      },
    
 })

 const ProjectUsermodel=mongoose.model("projectusers",projectuserSchema);
 module.exports=ProjectUsermodel;