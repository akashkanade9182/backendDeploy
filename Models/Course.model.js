const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types


const CourseSchema=mongoose.Schema({
     name: {
          type: String,
          required: true
      },
    
      lessons: {
          type: Number,
          require: true
      },
      startDate: {
          type: String,
          require: true
      },
      duration: {
          type: String,
          require: true
      }, 
       completed: {
          type: Number,
          require: true
      },
      
   
    
  })

 const Coursemodel=mongoose.model("Course",CourseSchema);
 module.exports=Coursemodel;