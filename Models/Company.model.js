const mongoose = require("mongoose")


const companySchema=mongoose.Schema({
     companyId: {
          type: Number,
          required: true
      },
      name: {
          type: String,
          required: true
      },
      
      url: {
          type: String,
          require: true
      },

     
  })

 const Companymodel=mongoose.model("company",companySchema);
 module.exports=Companymodel;