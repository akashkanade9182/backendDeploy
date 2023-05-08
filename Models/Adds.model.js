const mongoose = require("mongoose")


const addsSchema=mongoose.Schema({
     companyId: {
          type: Number,
          required: true
      },
      primaryText: {
          type: String,
          require: true
      },
      headline: {
          type: String,
          require: true
      },
      description: {
          type: String,
          require: true
      },
      CTA: {
          type: String,
          require: true
      },
      imageUrl: {
          type: String,
          require: true
      },

     
  })

 const Addsmodel=mongoose.model("adds",addsSchema);
 module.exports=Addsmodel;